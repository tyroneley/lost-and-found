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
      user: { select: { name: true } }
    }
  })
