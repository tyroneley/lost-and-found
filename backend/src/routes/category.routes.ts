import { Hono } from 'hono'
import {
  createCategoryHandler,
  getCategoriesHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/category.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const categoryRoutes = new Hono()

categoryRoutes.get('/', getCategoriesHandler)
categoryRoutes.use('/*', authMiddleware)
categoryRoutes.post('/', requireRole(['STAFF', 'SUPERADMIN']), createCategoryHandler)
categoryRoutes.put('/:id', requireRole(['STAFF', 'SUPERADMIN']), updateCategoryHandler)
categoryRoutes.delete('/:id', requireRole(['SUPERADMIN']), deleteCategoryHandler)

export default categoryRoutes
