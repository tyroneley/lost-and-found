import { prisma } from '../lib/prisma'
import type { Prisma } from '../../generated/prisma'
import { getColorBucket } from '../utils/color'
import { logAudit } from './audit.service'

export const createItem = async (data: any, changed_by: string) => {
  const colorBucket = data.color_hex ? getColorBucket(data.color_hex) : null

  const item = await prisma.item.create({
    data: {
      name: data.name,
      description: data.description,
      color_hex: data.color_hex || null,
      color_bucket: colorBucket,
      category_id: data.category_id,
      building_id: data.building_id,
      room_id: data.room_id ?? null,
      found_at: new Date(data.found_at),
      found_time_known: data.found_time_known ?? true,
      expires_at: data.expires_at ? new Date(data.expires_at) : null,
      finder_name: data.finder_name,
      finder_contact: data.finder_contact,
      finder_affiliation: data.finder_affiliation,
      recorded_by: changed_by
    }
  })

  await logAudit({ item_id: item.item_id, changed_by, action: 'CREATE', new_status: 'ACTIVE' })

  return item
}

export const updateItem = async (id: string, data: any, changed_by: string) => {
  const item = await prisma.item.update({
    where: { item_id: id },
    data: {
      name: data.name,
      description: data.description,
      color_hex: data.color_hex,
      color_bucket: data.color_hex !== undefined
        ? (data.color_hex ? getColorBucket(data.color_hex) : null)
        : undefined,
      category_id: data.category_id,
      room_id: data.room_id ?? null,
      found_at: data.found_at !== undefined ? new Date(data.found_at) : undefined,
      found_time_known: data.found_time_known,
      expires_at: data.expires_at !== undefined ? new Date(data.expires_at) : undefined,
      finder_name: data.finder_name,
      finder_contact: data.finder_contact,
      finder_affiliation: data.finder_affiliation
    }
  })

  await logAudit({ item_id: id, changed_by, action: 'UPDATE' })

  return item
}

export const deleteItem = async (id: string, changed_by: string) => {
  const item = await prisma.item.update({
    where: { item_id: id },
    data: { deleted_at: new Date() }
  })

  await logAudit({ item_id: id, changed_by, action: 'DELETE', old_status: item.status })

  return item
}

export const getItems = async (query?: any) => {
  const limit: number = query?.limit ?? 20
  const offset: number = query?.offset ?? 0

  const where: Prisma.ItemWhereInput = {
    deleted_at: null,
    color_bucket: query?.color,
    status: query?.status ?? 'ACTIVE', // Default to ACTIVE for public browsing
    category_id: query?.category_id,
    OR: query?.q
      ? [
          { name: { contains: query.q, mode: 'insensitive' } },
          { description: { contains: query.q, mode: 'insensitive' } }
        ]
      : undefined
  }

  const [total, data] = await prisma.$transaction([
    prisma.item.count({ where }),
    prisma.item.findMany({
      where,
      take: limit,
      skip: offset,
      include: { 
        category: true, 
        building: true, 
        room: { include: { building: true } },
        recorder: true, 
        photos: true 
      }
    })
  ])

  return { data, total, limit, offset }
}

export const getItemById = async (id: string) => {
  return prisma.item.findFirst({
    where: { item_id: id, deleted_at: null },
    include: {
      category: true,
      building: true,
      room: { include: { building: true } },
      recorder: true,
      photos: true
    }
  })
}

export const updateItemStatus = async (id: string, data: any, changed_by: string) => {
  const current = await prisma.item.findUnique({ where: { item_id: id } })

  const item = await prisma.item.update({
    where: { item_id: id },
    data: { status: data.status }
  })

  const action = data.status === 'CLAIMED' ? 'CLAIM'
    : data.status === 'COLLECTED' ? 'APPROVE'
    : 'UPDATE'

  await logAudit({
    item_id: id,
    changed_by,
    action,
    old_status: current?.status,
    new_status: item.status
  })

  return item
}
