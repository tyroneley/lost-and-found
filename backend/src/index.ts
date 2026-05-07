import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { z } from 'zod'

import itemRoutes from './routes/item.routes'
import claimRoutes from './routes/claim.routes'
import categoryRoutes from './routes/category.routes'
import userRoutes from './routes/user.routes'
import { prisma } from './lib/prisma'
import { issueToken } from './middleware/auth'
import { handleError } from './utils/errorHandler'
import { expireItems } from './services/expiration.service'

const app = new Hono()

app.use('/*', cors({
  origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (c) => c.text('running'))

app.post('/auth/token', async (c) => {
  try {
    const body = await c.req.json()
    const { user_id } = z.object({ user_id: z.string().uuid() }).parse(body)
    const user = await prisma.user.findUnique({ where: { user_id } })
    if (!user) return c.json({ error: 'User not found' }, 404)
    const token = await issueToken(user.user_id, user.role as 'PUBLIC' | 'SECURITY' | 'ADMIN')
    return c.json({ token })
  } catch (error) {
    return handleError(c, error)
  }
})

app.route('/items', itemRoutes)
app.route('/claims', claimRoutes)
app.route('/categories', categoryRoutes)
app.route('/users', userRoutes)

serve({
  fetch: app.fetch,
  port: 3001
})

expireItems().then(n => { if (n > 0) console.log(`Expired ${n} items on startup`) })
setInterval(async () => {
  const n = await expireItems()
  if (n > 0) console.log(`Expired ${n} items`)
}, 60 * 60 * 1000)
