import {
  createItem,
  getItems,
  getItemById,
  updateItemStatus,
  updateItem,
  deleteItem
} from '../services/item.service'

import {
  createItemSchema,
  updateItemStatusSchema
} from '../validators/item.validator'

import { handleError } from '../utils/errorHandler'
import { idParamSchema } from '../validators/common.validator'

export const createItemHandler = async (c: any) => {
  try {
    const body = await c.req.json()
    const validated = createItemSchema.parse(body)
    const item = await createItem(validated)

    return c.json(item, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getItemsHandler = async (c: any) => {
  try {
    const items = await getItems()
    return c.json(items)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getItemByIdHandler = async (c: any) => {
  try {
    const params = idParamSchema.parse({
      id: c.req.param('id')
    })

    const item = await getItemById(params.id)

    if (!item) {
      return c.json({ error: 'Item not found' }, 404)
    }

    return c.json(item)
  } catch (error) {
    return handleError(c, error)
  }
}

export const updateItemStatusHandler = async (c: any) => {
  try {
    const params = idParamSchema.parse({
      id: c.req.param('id')
    })

    const body = await c.req.json()
    const validated = updateItemStatusSchema.parse(body)
    const item = await updateItemStatus(params.id, validated)

    return c.json(item)
  } catch (error) {
    return handleError(c, error)
  }
}

export const updateItemHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const item = await updateItem(id, body)
    
    return c.json(item)
  } catch (error) {
    return handleError(c, error)
  }
}

export const deleteItemHandler = async (c: any) => {
  try {
    const params = idParamSchema.parse({
      id: c.req.param('id')
    })

    await deleteItem(params.id)

    return c.json({ message: 'Item deleted' })
  } catch (error) {
    return handleError(c, error)
  }
}