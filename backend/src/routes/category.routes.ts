import { Hono } from 'hono'
import { createCategoryHandler, getCategoriesHandler } from '../controllers/category.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const categoryRoutes = new Hono()

categoryRoutes.use('/*', authMiddleware)
categoryRoutes.get('/', getCategoriesHandler)
categoryRoutes.post('/', requireRole(['SUPERADMIN']), createCategoryHandler)

export default categoryRoutes
