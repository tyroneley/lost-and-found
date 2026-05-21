import type { MiddlewareHandler } from 'hono'
import { jwt, sign } from 'hono/jwt'

export type AuthPayload = {
  sub: string
  role: 'PUBLIC' | 'STAFF' | 'SUPERADMIN'
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

export const issueToken = (user_id: string, role: AuthPayload['role']) =>
  sign(
    { sub: user_id, role, exp: Math.floor(Date.now() / 1000) + 86400 },
    JWT_SECRET,
    'HS256'
  )
