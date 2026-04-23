import { Hono } from 'hono'
import { getCategoriesHandler } from '../controllers/category.controller'

const categoryRoutes = new Hono()

categoryRoutes.get('/', getCategoriesHandler)

export default categoryRoutes