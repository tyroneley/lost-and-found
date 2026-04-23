import {
  createItem,
  getItems,
  getItemById,
  updateItemStatus
} from '../services/item.service'

export const createItemHandler = async (c: any) => {
  try {
    const body = await c.req.json()
    const item = await createItem(body)
    return c.json(item, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create item' }, 500)
  }
}

export const getItemsHandler = async (c: any) => {
  try {
    const items = await getItems()
    return c.json(items)
  } catch {
    return c.json({ error: 'Failed to fetch items' }, 500)
  }
}

export const getItemByIdHandler = async (c: any) => {
  const id = c.req.param('id')
  const item = await getItemById(id)

  if (!item) return c.json({ error: 'Item not found' }, 404)
  return c.json(item)
}

export const updateItemStatusHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const item = await updateItemStatus(id, body)
    return c.json(item)
  } catch {
    return c.json({ error: 'Failed to update item' }, 500)
  }
}