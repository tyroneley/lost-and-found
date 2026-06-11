import { z } from 'zod'
import { FIELD_LIMITS } from './fieldLimits'

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(FIELD_LIMITS.USER_NAME),

  phone: z.string().max(FIELD_LIMITS.PHONE).optional(),

  personal_email: z
    .string()
    .email('Invalid personal email')
    .max(FIELD_LIMITS.EMAIL)
    .optional(),

  uni_email: z
    .string()
    .email('Invalid university email')
    .max(FIELD_LIMITS.EMAIL)
    .optional(),

  role: z.enum(['PUBLIC', 'STAFF', 'SUPERADMIN']).optional(),

  affiliation: z.string().max(FIELD_LIMITS.AFFILIATION).optional(),
})

export const updateUserSchema = z.object({
  name: z.string().min(1).max(FIELD_LIMITS.USER_NAME).optional(),
  phone: z.string().max(FIELD_LIMITS.PHONE).optional(),
  personal_email: z.string().email().max(FIELD_LIMITS.EMAIL).optional(),
  uni_email: z.string().email().max(FIELD_LIMITS.EMAIL).optional(),
  affiliation: z.string().max(FIELD_LIMITS.AFFILIATION).optional(),
  role: z.enum(['PUBLIC', 'STAFF', 'SUPERADMIN']).optional()
})