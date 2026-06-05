import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errorHandler'
import { getBuildingUsage, getRoomUsage } from './reference-usage.service'

const normalizeRoomName = (name: string) => name.trim().toLowerCase()

const assertUniqueRoomNameInBuilding = async (
  building_id: string,
  room_name: string,
  excludeRoomId?: string
) => {
  const normalized = normalizeRoomName(room_name)
  if (!normalized) throw new AppError(400, 'Room name is required')

  const rooms = await prisma.room.findMany({
    where: { building_id },
    select: { room_id: true, room_name: true },
  })

  const duplicate = rooms.find(
    (r) => r.room_id !== excludeRoomId && normalizeRoomName(r.room_name) === normalized
  )
  if (duplicate) {
    throw new AppError(
      400,
      `A room named "${room_name.trim()}" already exists in this building. Use a different name.`
    )
  }
}

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

  const { canDelete, blockReason } = await getBuildingUsage(id)
  if (!canDelete) throw new AppError(400, blockReason ?? 'Cannot delete: building is still in use')

  return prisma.$transaction(async (tx) => {
    await tx.room.deleteMany({ where: { building_id: id } })
    return tx.building.delete({ where: { building_id: id } })
  })
}

export const createRoom = async (building_id: string, data: { room_number?: number; room_name: string }) => {
  const building = await prisma.building.findUnique({ where: { building_id } })
  if (!building) throw new AppError(404, 'Building not found')
  await assertUniqueRoomNameInBuilding(building_id, data.room_name)
  return prisma.room.create({ data: { ...data, room_name: data.room_name.trim(), building_id } })
}

export const updateRoom = async (id: string, data: { room_number?: number | null; room_name?: string }) => {
  const existing = await prisma.room.findUnique({ where: { room_id: id } })
  if (!existing) throw new AppError(404, 'Room not found')

  const nextName = data.room_name !== undefined ? data.room_name.trim() : existing.room_name
  if (!nextName) throw new AppError(400, 'Room name is required')

  await assertUniqueRoomNameInBuilding(existing.building_id, nextName, id)

  return prisma.room.update({
    where: { room_id: id },
    data: {
      ...data,
      ...(data.room_name !== undefined ? { room_name: nextName } : {}),
    },
  })
}

export const deleteRoom = async (id: string) => {
  const existing = await prisma.room.findUnique({ where: { room_id: id } })
  if (!existing) throw new AppError(404, 'Room not found')

  const { canDelete, blockReason } = await getRoomUsage(id)
  if (!canDelete) throw new AppError(400, blockReason ?? 'Cannot delete: room is still in use')

  return prisma.room.delete({ where: { room_id: id } })
}
