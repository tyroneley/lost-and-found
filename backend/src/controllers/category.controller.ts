import { createCategory, getCategories } from '../services/category.service'

export const createCategoryHandler = async (c: any) => {
  try {
    const body = await c.req.json()
    const category = await createCategory(body)
    return c.json(category, 201)
  } catch {
    return c.json({ error: 'Failed to create category' }, 500)
  }
}

export const getCategoriesHandler = async (c: any) => {
  const categories = await getCategories()
  return c.json(categories)
}