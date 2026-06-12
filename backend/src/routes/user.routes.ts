import { Hono } from 'hono'
import {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deactivateUserHandler,
  reactivateUserHandler,
} from '../controllers/user.controller'
import { authMiddleware, requireActiveAccount, requireRole } from '../middleware/auth'

const userRoutes = new Hono()

userRoutes.use('/*', authMiddleware)
userRoutes.use('/*', requireActiveAccount)
userRoutes.post('/', requireRole(['SUPERADMIN']), createUserHandler)
userRoutes.get('/', requireRole(['STAFF', 'SUPERADMIN']), getUsersHandler)
userRoutes.patch('/:id/deactivate', requireRole(['SUPERADMIN']), deactivateUserHandler)
userRoutes.patch('/:id/reactivate', requireRole(['SUPERADMIN']), reactivateUserHandler)
userRoutes.get('/:id', getUserByIdHandler)
userRoutes.patch('/:id', updateUserHandler)

export default userRoutes
