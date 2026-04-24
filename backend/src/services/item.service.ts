import { prisma } from '../lib/prisma'

export const createItem = async (data: any) => {
  return prisma.item.create({
    data: {
      name: data.name,
      description: data.description,
      color: data.color,
      category_id: data.category_id,
      found_location: data.found_location,
      found_at: new Date(data.found_at),
      recorded_by: data.recorded_by
    }
  })
}

export const updateItem = async (id: string, data: any) => {
  return prisma.item.update({
    where: { item_id: id },
    data
  })
}

export const deleteItem = async (id: string) => {
  return prisma.item.delete({
    where: { item_id: id }
  })
}

export const getItems = async () => {
  return prisma.item.findMany({
    include: {
      category: true,
      recorder: true,
      photos: true
    }
  })
}

export const getItemById = async (id: string) => {
  return prisma.item.findUnique({
    where: { item_id: id },
    include: {
      category: true,
      recorder: true,
      photos: true
    }
  })
}

export const updateItemStatus = async (id: string, data: any) => {
  return prisma.item.update({
    where: { item_id: id },
    data: {
      status: data.status,
      approved_by: data.approved_by || null
    }
  })
}