import { Hono } from 'hono'
import { createUserHandler, getUsersHandler } from '../controllers/user.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const userRoutes = new Hono()

userRoutes.use('/*', authMiddleware)
userRoutes.post('/', requireRole(['ADMIN']), createUserHandler)
userRoutes.get('/', requireRole(['SECURITY', 'ADMIN']), getUsersHandler)

export default userRoutes
