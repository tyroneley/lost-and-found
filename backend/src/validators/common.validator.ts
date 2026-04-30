import { z } from 'zod'

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format')
})

export const claimQuerySchema = z.object({
  item_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional()
})