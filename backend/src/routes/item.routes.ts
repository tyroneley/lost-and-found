import { Hono } from 'hono'
import {
  createItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItemsHandler,
  getItemByIdHandler,
  updateItemStatusHandler
} from '../controllers/item.controller'
import {
  addPhotoHandler,
  getPhotosHandler,
  deletePhotoHandler
} from '../controllers/photo.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const itemRoutes = new Hono()

itemRoutes.use('/*', authMiddleware)
itemRoutes.post('/', createItemHandler)
itemRoutes.get('/', getItemsHandler)

// Photo sub-routes registered before /:id to avoid pattern ambiguity
itemRoutes.get('/:id/photos', getPhotosHandler)
itemRoutes.post('/:id/photos', addPhotoHandler)
itemRoutes.delete('/:id/photos/:photoId', requireRole(['SECURITY', 'ADMIN']), deletePhotoHandler)

itemRoutes.get('/:id', getItemByIdHandler)
itemRoutes.patch('/:id', requireRole(['SECURITY', 'ADMIN']), updateItemHandler)
itemRoutes.patch('/:id/status', requireRole(['SECURITY', 'ADMIN']), updateItemStatusHandler)
itemRoutes.delete('/:id', requireRole(['ADMIN']), deleteItemHandler)

export default itemRoutes
