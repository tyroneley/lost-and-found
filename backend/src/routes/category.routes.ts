import { Hono } from 'hono'
import {
  createCategoryHandler,
  getCategoriesHandler,
  getCategoryUsageHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/category.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const categoryRoutes = new Hono()

categoryRoutes.get('/', getCategoriesHandler)
categoryRoutes.use('/*', authMiddleware)
categoryRoutes.get('/:id/usage', requireRole(['STAFF', 'SUPERADMIN']), getCategoryUsageHandler)
categoryRoutes.post('/', requireRole(['STAFF', 'SUPERADMIN']), createCategoryHandler)
categoryRoutes.put('/:id', requireRole(['STAFF', 'SUPERADMIN']), updateCategoryHandler)
categoryRoutes.delete('/:id', requireRole(['SUPERADMIN']), deleteCategoryHandler)

export default categoryRoutes
