import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errorHandler'

export const addPhoto = async (item_id: string, data: any) => {
  const item = await prisma.item.findFirst({ where: { item_id, deleted_at: null } })
  if (!item) throw new AppError(404, 'Item not found')

  return prisma.itemPhoto.create({
    data: {
      item_id,
      storage_url: data.storage_url,
      file_key: data.file_key,
      mime_type: data.mime_type,
      size: data.size
    }
  })
}

export const getPhotos = async (item_id: string) => {
  return prisma.itemPhoto.findMany({ where: { item_id } })
}

export const deletePhoto = async (item_id: string, photo_id: string) => {
  const photo = await prisma.itemPhoto.findFirst({ where: { photo_id, item_id } })
  if (!photo) throw new AppError(404, 'Photo not found')

  return prisma.itemPhoto.delete({ where: { photo_id } })
}

export const savePhotoFile = async (item_id: string, file: File) => {
  const item = await prisma.item.findFirst({ where: { item_id, deleted_at: null } })
  if (!item) throw new AppError(404, 'Item not found')

  const uploadsDir = path.resolve('./uploads')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

  const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase()
  const filename = `${crypto.randomUUID()}.${ext}`
  fs.writeFileSync(path.join(uploadsDir, filename), Buffer.from(await file.arrayBuffer()))

  return prisma.itemPhoto.create({
    data: {
      item_id,
      storage_url: `/uploads/${filename}`,
      file_key: filename,
      mime_type: file.type || `image/${ext}`,
      size: file.size,
    }
  })
}
