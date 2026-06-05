import { prisma } from '../lib/prisma'

export interface ReferenceUsage {
  totalItems: number
  activeItems: number
  roomCount?: number
  canDelete: boolean
  blockReason?: string
}

export const getCategoryUsage = async (category_id: string): Promise<ReferenceUsage> => {
  const [totalItems, activeItems] = await Promise.all([
    prisma.item.count({ where: { category_id } }),
    prisma.item.count({ where: { category_id, deleted_at: null } }),
  ])

  const canDelete = totalItems === 0
  return {
    totalItems,
    activeItems,
    canDelete,
    blockReason: canDelete
      ? undefined
      : `This category is used by ${totalItems} item(s)${activeItems !== totalItems ? ` (${activeItems} active)` : ''}. Remove or reassign those items first.`,
  }
}

export const getBuildingUsage = async (building_id: string): Promise<ReferenceUsage> => {
  const building = await prisma.building.findUnique({
    where: { building_id },
    include: { rooms: { select: { room_id: true } } },
  })

  if (!building) {
    return { totalItems: 0, activeItems: 0, roomCount: 0, canDelete: false, blockReason: 'Building not found' }
  }

  const roomIds = building.rooms.map((r) => r.room_id)
  const [buildingItems, buildingActive, roomItems, roomActive] = await Promise.all([
    prisma.item.count({ where: { building_id } }),
    prisma.item.count({ where: { building_id, deleted_at: null } }),
    roomIds.length > 0
      ? prisma.item.count({ where: { room_id: { in: roomIds } } })
      : Promise.resolve(0),
    roomIds.length > 0
      ? prisma.item.count({ where: { room_id: { in: roomIds }, deleted_at: null } })
      : Promise.resolve(0),
  ])

  const totalItems = buildingItems + roomItems
  const activeItems = buildingActive + roomActive
  const canDelete = totalItems === 0

  let blockReason: string | undefined
  if (!canDelete) {
    const parts: string[] = []
    if (buildingItems > 0) parts.push(`${buildingItems} item(s) at this building`)
    if (roomItems > 0) parts.push(`${roomItems} item(s) in its rooms`)
    blockReason = `Cannot delete: ${parts.join(' and ')}. Reassign or remove those items first.`
  }

  return {
    totalItems,
    activeItems,
    roomCount: building.rooms.length,
    canDelete,
    blockReason,
  }
}

export const getRoomUsage = async (room_id: string): Promise<ReferenceUsage> => {
  const [totalItems, activeItems] = await Promise.all([
    prisma.item.count({ where: { room_id } }),
    prisma.item.count({ where: { room_id, deleted_at: null } }),
  ])

  const canDelete = totalItems === 0
  return {
    totalItems,
    activeItems,
    canDelete,
    blockReason: canDelete
      ? undefined
      : `This room is used by ${totalItems} item(s)${activeItems !== totalItems ? ` (${activeItems} active)` : ''}. Reassign or remove those items first.`,
  }
}
