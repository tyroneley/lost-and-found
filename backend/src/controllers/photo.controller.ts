import { addPhoto, getPhotos, deletePhoto, savePhotoFile } from '../services/photo.service'
import { createPhotoSchema } from '../validators/photo.validator'
import { handleError } from '../utils/errorHandler'
import { idParamSchema } from '../validators/common.validator'

export const addPhotoHandler = async (c: any) => {
  try {
    const { id: item_id } = idParamSchema.parse({ id: c.req.param('id') })
    const body = await c.req.json()
    const validated = createPhotoSchema.parse(body)
    const photo = await addPhoto(item_id, validated)
    return c.json(photo, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getPhotosHandler = async (c: any) => {
  try {
    const { id: item_id } = idParamSchema.parse({ id: c.req.param('id') })
    const photos = await getPhotos(item_id)
    return c.json(photos)
  } catch (error) {
    return handleError(c, error)
  }
}

export const uploadPhotoHandler = async (c: any) => {
  try {
    const { id: item_id } = idParamSchema.parse({ id: c.req.param('id') })
    const body = await c.req.parseBody()
    const file = body['file']
    if (!file || typeof file === 'string') {
      return c.json({ error: 'No file provided' }, 400)
    }
    const photo = await savePhotoFile(item_id, file as File)
    return c.json(photo, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const deletePhotoHandler = async (c: any) => {
  try {
    const { id: item_id } = idParamSchema.parse({ id: c.req.param('id') })
    const { id: photo_id } = idParamSchema.parse({ id: c.req.param('photoId') })
    await deletePhoto(item_id, photo_id)
    return c.json({ message: 'Photo deleted' })
  } catch (error) {
    return handleError(c, error)
  }
}
