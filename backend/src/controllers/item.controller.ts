import { createItem, getAllItems } from '../services/item.service'

export const createItemHandler = async (c: any) => {
  const body = await c.req.json()

  const item = await createItem(body)

  return c.json(item, 201)
}

export const getItemsHandler = async (c: any) => {
  const items = await getAllItems()
  return c.json(items)
}