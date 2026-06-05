import { createCategory, getCategories, updateCategory, deleteCategory } from '../services/category.service'
import { getCategoryUsage } from '../services/reference-usage.service'
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

export const updateCategoryHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const category = await updateCategory(id, body)
    return c.json(category)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getCategoryUsageHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    const usage = await getCategoryUsage(id)
    return c.json(usage)
  } catch (error) {
    return handleError(c, error)
  }
}

export const deleteCategoryHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    await deleteCategory(id)
    return c.json({ success: true })
  } catch (error) {
    return handleError(c, error)
  }
}