import { prisma } from '../lib/prisma'
import type { AuditAction, ItemStatus } from '../../generated/prisma'

export const logAudit = (params: {
  item_id: string
  changed_by: string
  action: AuditAction
  old_status?: ItemStatus
  new_status?: ItemStatus
  notes?: string
}) =>
  prisma.auditLog.create({ data: params })

export const getAuditLogsByItemId = async (item_id: string) =>
  prisma.auditLog.findMany({
    where: { item_id },
    orderBy: { created_at: 'desc' },
    include: {
      user: { select: { name: true } },
      item: { select: { name: true } },
    },
  })

export const getAuditLogs = async (query?: { limit?: number; offset?: number }) => {
  const limit = query?.limit ?? 100
  const offset = query?.offset ?? 0

  const [total, data] = await prisma.$transaction([
    prisma.auditLog.count(),
    prisma.auditLog.findMany({
      take: limit,
      skip: offset,
      orderBy: { created_at: 'desc' },
      include: {
        user: { select: { name: true } },
        item: { select: { name: true } },
      },
    }),
  ])

  return { data, total, limit, offset }
}
