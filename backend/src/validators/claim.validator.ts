import { z } from 'zod'
import { FIELD_LIMITS } from './fieldLimits'

export const createClaimSchema = z.object({
  item_id: z.string().uuid('Invalid item_id'),
  ownership_desc: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(FIELD_LIMITS.OWNERSHIP_DESC),
})

export const updateClaimSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'COLLECTED']),
  staff_notes: z.string().max(FIELD_LIMITS.STAFF_NOTES).optional(),
})