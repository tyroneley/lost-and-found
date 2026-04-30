import { z } from 'zod'

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color_hex: z
  .string()
  .regex(/^#([0-9A-Fa-f]{6})$/, 'Invalid hex color')
  .optional(),

  category_id: z.string().uuid('Invalid category_id'),
  found_location: z.string().min(1, 'Location is required'),
  found_at: z.string().datetime('Invalid date format'),
  recorded_by: z.string().uuid('Invalid user_id')
})

export const updateItemStatusSchema = z.object({
  status: z.enum(['REPORTED', 'UNDER_REVIEW', 'APPROVED', 'CLAIMED', 'EXPIRED']),
  approved_by: z.string().uuid().optional()
})