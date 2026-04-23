import { Hono } from 'hono'
import {
  createItemHandler,
  getItemsHandler,
  getItemByIdHandler,
  updateItemStatusHandler
} from '../controllers/item.controller'

const itemRoutes = new Hono()

itemRoutes.post('/', createItemHandler)
itemRoutes.get('/', getItemsHandler)
itemRoutes.get('/:id', getItemByIdHandler)
itemRoutes.patch('/:id/status', updateItemStatusHandler)

export default itemRoutes