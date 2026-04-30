import { z } from 'zod'

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format')
})

export const claimQuerySchema = z.object({
  item_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional()
})

export const itemQuerySchema = z.object({
  color: z
    .enum([
      'RED',
      'ORANGE',
      'YELLOW',
      'GREEN',
      'CYAN',
      'BLUE',
      'PURPLE',
      'PINK',
      'BROWN',
      'BLACK',
      'WHITE',
      'GRAY'
    ])
    .optional()
})