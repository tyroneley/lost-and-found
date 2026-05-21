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
userRoutes.post('/', requireRole(['SUPERADMIN']), createUserHandler)
userRoutes.get('/', requireRole(['STAFF', 'SUPERADMIN']), getUsersHandler)
userRoutes.get('/:id', getUserByIdHandler)
userRoutes.patch('/:id', updateUserHandler)

export default userRoutes
