import { prisma } from '../lib/prisma'
import type { Prisma } from '../../generated/prisma'
import type { AuditAction, ItemStatus } from '../../generated/prisma'

export type AuditLogSort = 'newest' | 'oldest'

export type AuditLogQuery = {
  limit?: number
  offset?: number
  action?: AuditAction
  q?: string
  sort?: AuditLogSort
  from?: string
  to?: string
}

export const logAudit = (params: {
  item_id: string
  changed_by: string
  action: AuditAction
  old_status?: ItemStatus
  new_status?: ItemStatus
  notes?: string
}) =>
  prisma.auditLog.create({ data: params })

export const logUserAudit = (params: {
  target_user_id: string
  changed_by: string
  action: Extract<AuditAction, 'DEACTIVATE' | 'REACTIVATE'>
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
      target_user: { select: { name: true, personal_email: true } },
    },
  })

function endOfDay(dateStr: string): Date {
  const d = new Date(dateStr)
  d.setHours(23, 59, 59, 999)
  return d
}

function buildAuditLogWhere(query?: AuditLogQuery): Prisma.AuditLogWhereInput {
  const where: Prisma.AuditLogWhereInput = {}

  if (query?.action) {
    where.action = query.action
  }

  if (query?.from || query?.to) {
    where.created_at = {}
    if (query.from) {
      const from = new Date(query.from)
      if (!Number.isNaN(from.getTime())) {
        where.created_at.gte = from
      }
    }
    if (query.to) {
      const to = endOfDay(query.to)
      if (!Number.isNaN(to.getTime())) {
        where.created_at.lte = to
      }
    }
  }

  const term = query?.q?.trim()
  if (term) {
    where.OR = [
      { notes: { contains: term, mode: 'insensitive' } },
      { item: { name: { contains: term, mode: 'insensitive' } } },
      { user: { name: { contains: term, mode: 'insensitive' } } },
      { target_user: { name: { contains: term, mode: 'insensitive' } } },
      { target_user: { personal_email: { contains: term, mode: 'insensitive' } } },
    ]
  }

  return where
}

export const getAuditLogs = async (query?: AuditLogQuery) => {
  const limit = query?.limit ?? 100
  const offset = query?.offset ?? 0
  const where = buildAuditLogWhere(query)
  const orderBy = { created_at: query?.sort === 'oldest' ? 'asc' : 'desc' } as const

  const [total, data] = await prisma.$transaction([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy,
      include: {
        user: { select: { name: true } },
        item: { select: { name: true } },
        target_user: { select: { name: true, personal_email: true } },
      },
    }),
  ])

  return { data, total, limit, offset }
}
