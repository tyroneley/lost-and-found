import { Hono } from 'hono'
import { createItemHandler, getItemsHandler } from '../controllers/item.controller'

const itemRoutes = new Hono()

itemRoutes.post('/', createItemHandler)
itemRoutes.get('/', getItemsHandler)

export default itemRoutes