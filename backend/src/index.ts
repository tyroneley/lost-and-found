import 'dotenv/config'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
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
import { issueToken, authMiddleware, requireActiveAccount, requireRole, type AuthPayload } from './middleware/auth'
import { getAuditLogs, getAuditLogsByItemId } from './services/audit.service'
import { handleError } from './utils/errorHandler'
import { FIELD_LIMITS } from './validators/fieldLimits'
import { expireItems } from './services/expiration.service'
import { getClaims } from './services/claim.service'

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

// Health check endpoint
app.get('/health', (c) => c.json({ status: 'ok' }))

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

// Register endpoint - create new user account
app.post('/auth/register', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate input
    const schema = z.object({
      name: z.string().min(1, 'Name is required').max(FIELD_LIMITS.USER_NAME),
      email: z.string().email('Invalid email').max(FIELD_LIMITS.EMAIL),
      password: z.string().min(8, 'Password must be at least 8 characters').max(FIELD_LIMITS.PASSWORD_MAX),
      phone: z.string().max(FIELD_LIMITS.PHONE).optional(),
      uni_email: z.string().email('Invalid university email').max(FIELD_LIMITS.EMAIL).optional(),
      affiliation: z.string().max(FIELD_LIMITS.AFFILIATION).optional(),
    })
    
    const { name, email, password, phone, uni_email, affiliation } = schema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { personal_email: email }
    })
    
    if (existingUser) {
      return c.json({ error: 'Email already registered' }, 400)
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        personal_email: email,
        password: hashedPassword,
        phone: phone || null,
        uni_email: uni_email || null,
        affiliation: affiliation || null,
        role: 'PUBLIC',
      }
    })
    
    // Issue JWT token
    const token = await issueToken(user.user_id, user.role as 'PUBLIC' | 'STAFF' | 'SUPERADMIN')
    
    return c.json({
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.personal_email,
        role: user.role.toLowerCase(),
      }
    }, 201)
  } catch (error) {
    return handleError(c, error)
  }
})

// Login endpoint - authenticate user and issue token
app.post('/auth/login', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate input
    const schema = z.object({
      email: z.string().email('Invalid email').max(FIELD_LIMITS.EMAIL),
      password: z.string().min(1, 'Password is required').max(FIELD_LIMITS.PASSWORD_MAX),
    })
    
    const { email, password } = schema.parse(body)
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { personal_email: email }
    })
    
    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }

    if (user.deleted_at) {
      return c.json({ error: 'This account has been deactivated. Contact an administrator.' }, 403)
    }
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }
    
    // Issue JWT token
    const token = await issueToken(user.user_id, user.role as 'PUBLIC' | 'STAFF' | 'SUPERADMIN')
    
    return c.json({
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.personal_email,
        role: user.role.toLowerCase(),
      }
    })
  } catch (error) {
    return handleError(c, error)
  }
})

// Token endpoint (legacy - for getting token by user_id)
app.post('/auth/token', async (c) => {
  try {
    const body = await c.req.json()
    const { user_id } = z.object({ user_id: z.string().uuid() }).parse(body)
    const user = await prisma.user.findUnique({ where: { user_id } })
    if (!user) return c.json({ error: 'User not found' }, 404)
    const token = await issueToken(user.user_id, user.role as 'PUBLIC' | 'STAFF' | 'SUPERADMIN')
    return c.json({ token })
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
        personal_email: true,
        role: true,
        deleted_at: true,
      },
    })

    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json({
      user: {
        id: user.user_id,
        name: user.name,
        email: user.personal_email,
        role: user.role.toLowerCase(),
      },
      active: user.deleted_at === null,
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
