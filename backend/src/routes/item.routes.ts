import { Hono } from 'hono'
import {
  createItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItemsHandler,
  getItemByIdHandler,
  updateItemStatusHandler
} from '../controllers/item.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const itemRoutes = new Hono()

itemRoutes.use('/*', authMiddleware)
itemRoutes.post('/', createItemHandler)
itemRoutes.get('/', getItemsHandler)
itemRoutes.get('/:id', getItemByIdHandler)
itemRoutes.patch('/:id', requireRole(['SECURITY', 'ADMIN']), updateItemHandler)
itemRoutes.patch('/:id/status', requireRole(['SECURITY', 'ADMIN']), updateItemStatusHandler)
itemRoutes.delete('/:id', requireRole(['ADMIN']), deleteItemHandler)

export default itemRoutes
