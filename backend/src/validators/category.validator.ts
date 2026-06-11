import { z } from 'zod'
import { FIELD_LIMITS } from './fieldLimits'

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(FIELD_LIMITS.CATEGORY_NAME),
  description: z.string().max(FIELD_LIMITS.CATEGORY_DESCRIPTION).optional(),
})