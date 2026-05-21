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
  deletePhotoHandler,
  uploadPhotoHandler
} from '../controllers/photo.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const itemRoutes = new Hono()

// Public GET endpoints - anyone can browse items
itemRoutes.get('/', getItemsHandler)
itemRoutes.get('/:id', getItemByIdHandler)

// Protected endpoints - require auth
itemRoutes.use('/*', authMiddleware)
itemRoutes.post('/', createItemHandler)

// Photo sub-routes registered before /:id to avoid pattern ambiguity
itemRoutes.post('/:id/photos/upload', requireRole(['STAFF', 'SUPERADMIN']), uploadPhotoHandler)
itemRoutes.get('/:id/photos', getPhotosHandler)
itemRoutes.post('/:id/photos', addPhotoHandler)
itemRoutes.delete('/:id/photos/:photoId', requireRole(['STAFF', 'SUPERADMIN']), deletePhotoHandler)

itemRoutes.get('/:id', getItemByIdHandler)
itemRoutes.patch('/:id', requireRole(['STAFF', 'SUPERADMIN']), updateItemHandler)
itemRoutes.patch('/:id/status', requireRole(['STAFF', 'SUPERADMIN']), updateItemStatusHandler)
itemRoutes.delete('/:id', requireRole(['SUPERADMIN']), deleteItemHandler)

export default itemRoutes
