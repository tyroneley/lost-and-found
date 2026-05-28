import { z } from 'zod'

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format')
})

export const claimQuerySchema = z.object({
  item_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'COLLECTED']).optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0)
})

export const itemQuerySchema = z.object({
  color: z
    .enum([
      'RED','ORANGE','YELLOW','GREEN','CYAN',
      'BLUE','PURPLE','PINK','BROWN',
      'BLACK','WHITE','GRAY'
    ])
    .optional(),

  status: z
    .enum(['ACTIVE', 'CLAIMED', 'COLLECTED', 'RETURNED'])
    .optional(),

  category_id: z.string().uuid().optional(),

  q: z.string().optional(), // search
  limit: z.coerce.number().int().min(1).max(500).default(20),
  offset: z.coerce.number().int().min(0).default(0)
})

export const userQuerySchema = z.object({
  role: z.enum(['PUBLIC','STAFF','SUPERADMIN']).optional(),
  q: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0)
})