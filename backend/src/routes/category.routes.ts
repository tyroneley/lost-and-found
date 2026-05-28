import { Hono } from 'hono'
import { createCategoryHandler, getCategoriesHandler } from '../controllers/category.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const categoryRoutes = new Hono()

categoryRoutes.get('/', getCategoriesHandler)
categoryRoutes.use('/*', authMiddleware)
categoryRoutes.post('/', requireRole(['SUPERADMIN']), createCategoryHandler)

export default categoryRoutes
