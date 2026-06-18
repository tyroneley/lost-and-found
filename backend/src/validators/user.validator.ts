import { z } from 'zod'
import { FIELD_LIMITS } from './fieldLimits'

const BINUS_DOMAINS = ['binus.ac.id', 'binus.edu']

const binusEmailSchema = z
  .string()
  .email('Invalid university email')
  .max(FIELD_LIMITS.EMAIL)
  .refine(
    (email) => BINUS_DOMAINS.some((d) => email.toLowerCase().endsWith(`@${d}`)),
    { message: 'Must be a BINUS university email (@binus.ac.id or @binus.edu)' }
  )

// Used by admin/staff when creating a user — no password (system generates it)
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(FIELD_LIMITS.USER_NAME),

  uni_email: binusEmailSchema,

  phone: z.string().max(FIELD_LIMITS.PHONE).optional(),
  personal_email: z.string().email('Invalid personal email').max(FIELD_LIMITS.EMAIL).optional(),
  role: z.enum(['PUBLIC', 'STAFF', 'SUPERADMIN']).optional(),
  affiliation: z.string().max(FIELD_LIMITS.AFFILIATION).optional(),
})

export const setUserActiveSchema = z.object({
  reason: z.string().max(FIELD_LIMITS.STAFF_NOTES).optional(),
})

export const updateUserSchema = z.object({
  name: z.string().min(1).max(FIELD_LIMITS.USER_NAME).optional(),
  phone: z.string().max(FIELD_LIMITS.PHONE).optional(),
  personal_email: z.string().email().max(FIELD_LIMITS.EMAIL).optional(),
  uni_email: binusEmailSchema.optional(),
  affiliation: z.string().max(FIELD_LIMITS.AFFILIATION).optional(),
  role: z.enum(['PUBLIC', 'STAFF', 'SUPERADMIN']).optional(),
})
