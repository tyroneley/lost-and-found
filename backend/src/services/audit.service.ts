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
