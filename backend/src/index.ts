import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { z } from 'zod'
import * as bcrypt from 'bcryptjs'

import itemRoutes from './routes/item.routes'
import claimRoutes from './routes/claim.routes'
import categoryRoutes from './routes/category.routes'
import userRoutes from './routes/user.routes'
import { getBuildingsHandler } from './controllers/building.controller'
import { prisma } from './lib/prisma'
import { issueToken, authMiddleware, type AuthPayload } from './middleware/auth'
import { handleError } from './utils/errorHandler'
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
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (c) => c.text('running'))

// Health check endpoint
app.get('/health', (c) => c.json({ status: 'ok' }))

// Register endpoint - create new user account
app.post('/auth/register', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate input
    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      phone: z.string().optional(),
      uni_email: z.string().optional(),
      affiliation: z.string().optional(),
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
      email: z.string().email('Invalid email'),
      password: z.string().min(1, 'Password is required'),
    })
    
    const { email, password } = schema.parse(body)
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { personal_email: email }
    })
    
    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401)
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

// Get current user's claims
app.get('/user/claims', authMiddleware, async (c) => {
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

app.route('/items', itemRoutes)
app.route('/claims', claimRoutes)
app.route('/categories', categoryRoutes)
app.get('/buildings', getBuildingsHandler)
app.route('/users', userRoutes)

serve({
  fetch: app.fetch,
  port: 3000
})

expireItems().then(n => { if (n > 0) console.log(`Expired ${n} items on startup`) })
setInterval(async () => {
  const n = await expireItems()
  if (n > 0) console.log(`Expired ${n} items`)
}, 60 * 60 * 1000)
