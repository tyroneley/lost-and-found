import { getCategories } from '../services/category.service'

export const getCategoriesHandler = async (c: any) => {
  const categories = await getCategories()
  return c.json(categories)
}