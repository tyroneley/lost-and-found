import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errorHandler'

export const getBuildings = async () => {
  return prisma.building.findMany({
    include: { rooms: { orderBy: [{ room_number: 'asc' }, { room_name: 'asc' }] } },
    orderBy: { name: 'asc' },
  })
}

export const getBuildingByName = async (name: string) => {
  return prisma.building.findUnique({ where: { name } })
}

export const getCategoryByName = async (name: string) => {
  return prisma.category.findUnique({ where: { name } })
}

export const createBuilding = async (data: { name: string; address?: string }) => {
  return prisma.building.create({ data })
}

export const updateBuilding = async (id: string, data: { name?: string; address?: string }) => {
  const existing = await prisma.building.findUnique({ where: { building_id: id } })
  if (!existing) throw new AppError(404, 'Building not found')
  return prisma.building.update({ where: { building_id: id }, data })
}

export const deleteBuilding = async (id: string) => {
  const existing = await prisma.building.findUnique({ where: { building_id: id } })
  if (!existing) throw new AppError(404, 'Building not found')
  const itemCount = await prisma.item.count({ where: { building_id: id, deleted_at: null } })
  if (itemCount > 0) throw new AppError(400, `Cannot delete: ${itemCount} active item(s) are in this building`)
  return prisma.building.delete({ where: { building_id: id } })
}

export const createRoom = async (building_id: string, data: { room_number?: number; room_name: string }) => {
  const building = await prisma.building.findUnique({ where: { building_id } })
  if (!building) throw new AppError(404, 'Building not found')
  return prisma.room.create({ data: { ...data, building_id } })
}

export const updateRoom = async (id: string, data: { room_number?: number | null; room_name?: string }) => {
  const existing = await prisma.room.findUnique({ where: { room_id: id } })
  if (!existing) throw new AppError(404, 'Room not found')
  return prisma.room.update({ where: { room_id: id }, data })
}

export const deleteRoom = async (id: string) => {
  const existing = await prisma.room.findUnique({ where: { room_id: id } })
  if (!existing) throw new AppError(404, 'Room not found')
  const itemCount = await prisma.item.count({ where: { room_id: id, deleted_at: null } })
  if (itemCount > 0) throw new AppError(400, `Cannot delete: ${itemCount} active item(s) are in this room`)
  return prisma.room.delete({ where: { room_id: id } })
}
