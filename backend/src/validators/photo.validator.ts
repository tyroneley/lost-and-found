import { z } from 'zod'

export const createPhotoSchema = z.object({
  storage_url: z.string().url('Invalid storage URL'),
  file_key: z.string().optional(),
  mime_type: z.string().optional(),
  size: z.number().int().positive().optional()
})
