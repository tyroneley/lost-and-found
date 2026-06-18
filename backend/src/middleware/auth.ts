import type { MiddlewareHandler } from 'hono'
import { jwt, sign } from 'hono/jwt'
import { prisma } from '../lib/prisma'

export type AuthPayload = {
  sub: string
  role: 'PUBLIC' | 'STAFF' | 'SUPERADMIN'
  mcp: boolean  // must_change_password
  exp: number
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me-in-production'

export const authMiddleware = jwt({ secret: JWT_SECRET, alg: 'HS256' })

export const requireRole = (roles: AuthPayload['role'][]): MiddlewareHandler =>
  async (c, next) => {
    const payload = c.get('jwtPayload') as AuthPayload
    if (!roles.includes(payload.role)) {
      return c.json({ error: 'Forbidden' }, 403)
    }
    await next()
  }

// Blocks all authenticated requests when must_change_password is true.
// Apply after authMiddleware on any route that should be gated.
export const requirePasswordChanged: MiddlewareHandler = async (c, next) => {
  const payload = c.get('jwtPayload') as AuthPayload
  if (payload?.mcp) {
    return c.json({ error: 'You must change your password before continuing.', must_change_password: true }, 403)
  }
  await next()
}

export const requireActiveAccount: MiddlewareHandler = async (c, next) => {
  const payload = c.get('jwtPayload') as AuthPayload
  const user = await prisma.user.findUnique({
    where: { user_id: payload.sub },
    select: { deleted_at: true },
  })

  if (!user || user.deleted_at) {
    return c.json({ error: 'This account has been deactivated' }, 403)
  }

  await next()
}

export const issueToken = (user_id: string, role: AuthPayload['role'], mustChangePassword = false) =>
  sign(
    { sub: user_id, role, mcp: mustChangePassword, exp: Math.floor(Date.now() / 1000) + 86400 },
    JWT_SECRET,
    'HS256'
  )
