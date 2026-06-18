import 'dotenv/config'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { randomBytes } from 'crypto'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { z } from 'zod'
import * as bcrypt from 'bcryptjs'

import itemRoutes from './routes/item.routes'
import claimRoutes from './routes/claim.routes'
import categoryRoutes from './routes/category.routes'
import buildingRoutes from './routes/building.routes'
import userRoutes from './routes/user.routes'
import notificationRoutes from './routes/notification.routes'
import { prisma } from './lib/prisma'
import { issueToken, authMiddleware, requireActiveAccount, requirePasswordChanged, requireRole, type AuthPayload } from './middleware/auth'
import { getAuditLogs, getAuditLogsByItemId } from './services/audit.service'
import { handleError } from './utils/errorHandler'
import { FIELD_LIMITS } from './validators/fieldLimits'
import { expireItems } from './services/expiration.service'
import { getClaims } from './services/claim.service'
import { sendVerificationEmail } from './services/email.service'

// ── Startup validation ─────────────────────────────────────────────────────
const JWT_SECRET_ENV = process.env.JWT_SECRET ?? ''
if (!JWT_SECRET_ENV || JWT_SECRET_ENV === 'change-this-to-a-random-secret' || JWT_SECRET_ENV.length < 32) {
  console.error('[FATAL] JWT_SECRET is missing, default, or too short. Set a random 32+ character secret in .env')
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error('[FATAL] DATABASE_URL is not set.')
  process.exit(1)
}
if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-gmail@gmail.com') {
  console.warn('[WARN] SMTP_USER is not configured — emails will not be sent.')
}

// ── Rate limiting (in-memory, per IP) ─────────────────────────────────────
const _rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now()
  const record = _rateLimitStore.get(key)
  if (!record || now > record.resetAt) {
    _rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }
  if (record.count >= maxAttempts) return true
  record.count++
  return false
}

function clientIp(c: any): string {
  return (
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ??
    c.req.header('x-real-ip') ??
    'unknown'
  )
}

// ── BINUS domain check ─────────────────────────────────────────────────────
const BINUS_DOMAINS = ['binus.ac.id', 'binus.edu']
const isBinusEmail = (email: string) => BINUS_DOMAINS.some(d => email.toLowerCase().endsWith(`@${d}`))

const app = new Hono()

app.use('/*', cors({
  origin: (origin) => {
    // Allow any localhost origin (5173, 5174, etc)
    if (origin && origin.startsWith('http://localhost:')) {
      return origin
    }
    return process.env.CORS_ORIGIN ?? 'http://localhost:5173'
  },
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (c) => c.text('running'))
app.get('/health', (c) => c.json({ status: 'ok' }))

// Block all authenticated requests where must_change_password is true,
// except the change-password endpoint itself.
app.use('/*', async (c, next) => {
  if (new URL(c.req.url).pathname === '/auth/change-password') return next()
  const payload = c.get('jwtPayload') as AuthPayload | undefined
  if (payload?.mcp) {
    return c.json({ error: 'You must change your password before continuing.', must_change_password: true }, 403)
  }
  return next()
})

// Serve uploaded item photos
app.get('/uploads/:filename', (c) => {
  const filename = c.req.param('filename')
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return c.json({ error: 'Invalid path' }, 400)
  }
  const filepath = resolve('./uploads', filename)
  if (!existsSync(filepath)) return c.json({ error: 'Not found' }, 404)
  const data = readFileSync(filepath)
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  const mime: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg',
    png: 'image/png', gif: 'image/gif', webp: 'image/webp',
  }
  return new Response(data, { headers: { 'Content-Type': mime[ext] ?? 'image/octet-stream' } })
})

// Register — self-service, requires BINUS email, sends verification link
app.post('/auth/register', async (c) => {
  if (isRateLimited(`reg:${clientIp(c)}`, 10, 15 * 60 * 1000)) {
    return c.json({ error: 'Too many attempts. Please try again later.' }, 429)
  }
  try {
    const body = await c.req.json()
    const schema = z.object({
      name: z.string().min(1, 'Name is required').max(FIELD_LIMITS.USER_NAME),
      uni_email: z.string().email('Invalid email').max(FIELD_LIMITS.EMAIL),
      password: z.string().min(8, 'Password must be at least 8 characters').max(FIELD_LIMITS.PASSWORD_MAX),
      phone: z.string().max(FIELD_LIMITS.PHONE).optional(),
      personal_email: z.string().email().max(FIELD_LIMITS.EMAIL).optional(),
      affiliation: z.string().max(FIELD_LIMITS.AFFILIATION).optional(),
    })
    const { name, uni_email, password, phone, personal_email, affiliation } = schema.parse(body)

    if (!isBinusEmail(uni_email)) {
      return c.json({ error: 'Registration requires a BINUS university email (@binus.ac.id or @binus.edu)' }, 400)
    }

    const existing = await prisma.user.findUnique({ where: { uni_email } })
    if (existing) {
      // Allow re-registration if the previous attempt was never verified and the token has expired
      const tokenExpired = existing.email_verification_expires && existing.email_verification_expires < new Date()
      if (!existing.email_verified && tokenExpired) {
        await prisma.user.delete({ where: { user_id: existing.user_id } })
      } else {
        return c.json({ error: 'This university email is already registered' }, 409)
      }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const verificationToken = randomBytes(32).toString('hex')
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 h

    const user = await prisma.user.create({
      data: {
        name,
        uni_email,
        personal_email: personal_email ?? null,
        phone: phone ?? null,
        affiliation: affiliation ?? null,
        role: 'PUBLIC',
        password: hashedPassword,
        email_verified: false,
        email_verification_token: verificationToken,
        email_verification_expires: verificationExpires,
      },
    })

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173'
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`
    sendVerificationEmail({ name: user.name, uni_email: user.uni_email! }, verificationUrl)

    return c.json({ message: 'Account created. Please check your BINUS email to verify your account.' }, 201)
  } catch (error) {
    return handleError(c, error)
  }
})

// Verify email — called after user clicks the link in the verification email
app.get('/auth/verify-email', async (c) => {
  try {
    const token = c.req.query('token')
    if (!token) return c.json({ error: 'Verification token is required' }, 400)

    const user = await prisma.user.findUnique({ where: { email_verification_token: token } })
    if (!user) return c.json({ error: 'Invalid or expired verification token' }, 400)

    if (user.email_verification_expires && user.email_verification_expires < new Date()) {
      return c.json({ error: 'Verification token has expired. Please register again.' }, 400)
    }

    await prisma.user.update({
      where: { user_id: user.user_id },
      data: {
        email_verified: true,
        email_verification_token: null,
        email_verification_expires: null,
      },
    })

    const jwtToken = await issueToken(user.user_id, user.role as 'PUBLIC' | 'STAFF' | 'SUPERADMIN', false)
    return c.json({
      message: 'Email verified successfully.',
      token: jwtToken,
      user: { id: user.user_id, name: user.name, email: user.uni_email, role: user.role.toLowerCase() },
    })
  } catch (error) {
    return handleError(c, error)
  }
})

// Login — must use BINUS uni_email
app.post('/auth/login', async (c) => {
  if (isRateLimited(`login:${clientIp(c)}`, 10, 15 * 60 * 1000)) {
    return c.json({ error: 'Too many login attempts. Please try again later.' }, 429)
  }
  try {
    const body = await c.req.json()
    const schema = z.object({
      email: z.string().email('Invalid email').max(FIELD_LIMITS.EMAIL),
      password: z.string().min(1, 'Password is required').max(FIELD_LIMITS.PASSWORD_MAX),
    })
    const { email, password } = schema.parse(body)

    if (!isBinusEmail(email)) {
      return c.json({ error: 'Please log in with your BINUS university email (@binus.ac.id or @binus.edu)' }, 400)
    }

    const user = await prisma.user.findUnique({ where: { uni_email: email } })
    if (!user) return c.json({ error: 'Invalid email or password' }, 401)

    if (user.deleted_at) {
      return c.json({ error: 'This account has been deactivated. Contact an administrator.' }, 403)
    }

    if (!user.email_verified) {
      return c.json({ error: 'Please verify your email before logging in. Check your BINUS inbox.' }, 403)
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return c.json({ error: 'Invalid email or password' }, 401)

    const token = await issueToken(user.user_id, user.role as 'PUBLIC' | 'STAFF' | 'SUPERADMIN', user.must_change_password)
    return c.json({
      token,
      must_change_password: user.must_change_password,
      user: { id: user.user_id, name: user.name, email: user.uni_email, role: user.role.toLowerCase() },
    })
  } catch (error) {
    return handleError(c, error)
  }
})

// Change password — required on first login for admin-created accounts
app.post('/auth/change-password', authMiddleware, requireActiveAccount, async (c) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const body = await c.req.json()
    const schema = z.object({
      current_password: z.string().min(1, 'Current password is required'),
      new_password: z.string().min(8, 'New password must be at least 8 characters').max(FIELD_LIMITS.PASSWORD_MAX),
    })
    const { current_password, new_password } = schema.parse(body)

    const user = await prisma.user.findUnique({ where: { user_id: payload.sub } })
    if (!user) return c.json({ error: 'User not found' }, 404)

    const match = await bcrypt.compare(current_password, user.password)
    if (!match) return c.json({ error: 'Current password is incorrect' }, 400)

    if (current_password === new_password) {
      return c.json({ error: 'New password must be different from the current password' }, 400)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(new_password, salt)

    await prisma.user.update({
      where: { user_id: payload.sub },
      data: { password: hashedPassword, must_change_password: false },
    })

    const newToken = await issueToken(user.user_id, user.role as 'PUBLIC' | 'STAFF' | 'SUPERADMIN', false)
    return c.json({ message: 'Password changed successfully.', token: newToken })
  } catch (error) {
    return handleError(c, error)
  }
})

// Resend verification email (rate-limited to 3 per hour per IP)
app.post('/auth/resend-verification', async (c) => {
  if (isRateLimited(`resend:${clientIp(c)}`, 3, 60 * 60 * 1000)) {
    return c.json({ error: 'Too many requests. Please wait before requesting another verification email.' }, 429)
  }
  try {
    const body = await c.req.json()
    const { uni_email } = z.object({ uni_email: z.string().email().max(FIELD_LIMITS.EMAIL) }).parse(body)

    const user = await prisma.user.findUnique({ where: { uni_email } })

    // Always return the same message — don't reveal whether the email exists
    const genericResponse = c.json({ message: 'If that email is registered and unverified, a new link has been sent.' })

    if (!user || user.email_verified) return genericResponse

    const verificationToken = randomBytes(32).toString('hex')
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await prisma.user.update({
      where: { user_id: user.user_id },
      data: { email_verification_token: verificationToken, email_verification_expires: verificationExpires },
    })

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173'
    sendVerificationEmail({ name: user.name, uni_email: user.uni_email! }, `${frontendUrl}/verify-email?token=${verificationToken}`)

    return genericResponse
  } catch (error) {
    return handleError(c, error)
  }
})

// Session check — works even for deactivated accounts (returns active: false)
app.get('/auth/session', authMiddleware, async (c) => {
  try {
    const jwtPayload = c.get('jwtPayload') as AuthPayload
    const user = await prisma.user.findUnique({
      where: { user_id: jwtPayload.sub },
      select: {
        user_id: true,
        name: true,
        uni_email: true,
        role: true,
        deleted_at: true,
        must_change_password: true,
      },
    })

    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json({
      user: {
        id: user.user_id,
        name: user.name,
        email: user.uni_email,
        role: user.role.toLowerCase(),
      },
      active: user.deleted_at === null,
      must_change_password: user.must_change_password,
    })
  } catch (error) {
    return handleError(c, error)
  }
})

// Get current user's claims
app.get('/user/claims', authMiddleware, requireActiveAccount, async (c) => {
  try {
    const jwtPayload = c.get('jwtPayload') as AuthPayload
    if (!jwtPayload) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const claims = await getClaims({ user_id: jwtPayload.sub })
    return c.json(claims)
  } catch (error) {
    return handleError(c, error)
  }
})

app.get('/audit-log', authMiddleware, requireActiveAccount, requireRole(['STAFF', 'SUPERADMIN']), async (c) => {
  try {
    const item_id = c.req.query('item_id')
    if (item_id) {
      const logs = await getAuditLogsByItemId(item_id)
      return c.json({ data: logs })
    }
    const limit = Math.min(parseInt(c.req.query('limit') || '100', 10) || 100, 500)
    const offset = parseInt(c.req.query('offset') || '0', 10) || 0
    const actionRaw = c.req.query('action')
    const action =
      actionRaw && ['CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REJECT', 'CLAIM', 'DEACTIVATE', 'REACTIVATE'].includes(actionRaw)
        ? (actionRaw as 'CREATE' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'REJECT' | 'CLAIM' | 'DEACTIVATE' | 'REACTIVATE')
        : undefined
    const sortRaw = c.req.query('sort')
    const sort = sortRaw === 'oldest' ? 'oldest' : 'newest'
    const q = c.req.query('q')?.trim().slice(0, FIELD_LIMITS.SEARCH) || undefined
    const from = c.req.query('from') || undefined
    const to = c.req.query('to') || undefined
    const logs = await getAuditLogs({ limit, offset, action, sort, q, from, to })
    return c.json(logs)
  } catch (error) {
    return handleError(c, error)
  }
})

app.route('/items', itemRoutes)
app.route('/claims', claimRoutes)
app.route('/categories', categoryRoutes)
app.route('/buildings', buildingRoutes)
app.route('/users', userRoutes)
app.route('/notifications', notificationRoutes)

serve({
  fetch: app.fetch,
  port: 3000
})

expireItems().then(n => { if (n > 0) console.log(`Expired ${n} items on startup`) })
setInterval(async () => {
  const n = await expireItems()
  if (n > 0) console.log(`Expired ${n} items`)
}, 60 * 60 * 1000)
