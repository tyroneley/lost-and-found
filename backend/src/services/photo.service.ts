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
