import { Hono } from 'hono'
import {
  createItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItemsHandler,
  getItemByIdHandler,
  updateItemStatusHandler
} from '../controllers/item.controller'

const itemRoutes = new Hono()

itemRoutes.post('/', createItemHandler)
itemRoutes.get('/', getItemsHandler)
itemRoutes.get('/:id', getItemByIdHandler)
itemRoutes.patch('/:id', updateItemHandler)          
itemRoutes.patch('/:id/status', updateItemStatusHandler)
itemRoutes.delete('/:id', deleteItemHandler)

export default itemRoutes