import { Hono } from 'hono'
import {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  updateUserHandler
} from '../controllers/user.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const userRoutes = new Hono()

userRoutes.use('/*', authMiddleware)
userRoutes.post('/', requireRole(['ADMIN']), createUserHandler)
userRoutes.get('/', requireRole(['SECURITY', 'ADMIN']), getUsersHandler)
userRoutes.get('/:id', getUserByIdHandler)
userRoutes.patch('/:id', updateUserHandler)

export default userRoutes
