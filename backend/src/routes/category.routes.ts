import { Hono } from 'hono'
import { createCategoryHandler, getCategoriesHandler } from '../controllers/category.controller'

const categoryRoutes = new Hono()

categoryRoutes.get('/', getCategoriesHandler)
categoryRoutes.post('/', createCategoryHandler)

export default categoryRoutes