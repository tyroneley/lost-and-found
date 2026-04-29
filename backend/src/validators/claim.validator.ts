import { z } from 'zod'

export const createClaimSchema = z.object({
  item_id: z.string().uuid('Invalid item_id'),
  claimer_id: z.string().uuid('Invalid user_id'),
  ownership_desc: z.string().min(10, 'Description must be at least 10 characters')
})

export const updateClaimSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED'])
})