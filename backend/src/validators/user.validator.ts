import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),

  phone: z.string().optional(),

  personal_email: z
    .string()
    .email('Invalid personal email')
    .optional(),

  uni_email: z
    .string()
    .email('Invalid university email')
    .optional(),

  role: z.enum(['PUBLIC', 'SECURITY', 'ADMIN']).optional(),

  affiliation: z.string().optional()
})