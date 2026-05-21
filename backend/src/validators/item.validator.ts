import { z } from 'zod'

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color_hex: z
  .string()
  .regex(/^#([0-9A-Fa-f]{6})$/, 'Invalid hex color')
  .optional(),

  category_id: z.string().uuid('Invalid category_id'),
  building_id: z.string().uuid('Invalid building_id'),
  room_id: z.string().uuid('Invalid room_id'),
  found_at: z.string().datetime('Invalid date format'),
  found_time_known: z.boolean().optional(),
  expires_at: z.string().datetime().optional(),
  finder_name: z.string().optional(),
  finder_contact: z.string().optional(),
  finder_affiliation: z.string().optional()
})

export const updateItemStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'CLAIMED', 'COLLECTED', 'RETURNED']),
  notes: z.string().optional()
})

export const updateItemSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  color_hex: z.string().regex(/^#([0-9A-Fa-f]{6})$/, 'Invalid hex color').optional(),
  category_id: z.string().uuid().optional(),
  room_id: z.string().uuid().optional(),
  found_at: z.string().datetime().optional(),
  found_time_known: z.boolean().optional(),
  expires_at: z.string().datetime().optional(),
  finder_name: z.string().optional(),
  finder_contact: z.string().optional(),
  finder_affiliation: z.string().optional()
})