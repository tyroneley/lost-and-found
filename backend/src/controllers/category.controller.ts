import { createCategory, getCategories } from '../services/category.service'
import { createCategorySchema } from '../validators/category.validator'
import { handleError } from '../utils/errorHandler'

export const createCategoryHandler = async (c: any) => {
  try {
    const body = await c.req.json()
    const validated = createCategorySchema.parse(body)
    const category = await createCategory(validated)

    return c.json(category, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getCategoriesHandler = async (c: any) => {
  try {
    const categories = await getCategories()
    return c.json(categories)
  } catch (error) {
    return handleError(c, error)
  }
}