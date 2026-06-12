import { prisma } from '../lib/prisma'
import { logAudit } from './audit.service'
import { AppError } from '../utils/errorHandler'
import { sendClaimInvoiceEmail, sendClaimStatusEmail } from './email.service'
import { createClaimNotification } from './notification.service'

export const createClaim = async (data: any) => {
  const item = await prisma.item.findUnique({ where: { item_id: data.item_id } })

  if (!item || item.deleted_at) throw new AppError(404, 'Item not found')
  if (item.status !== 'ACTIVE') throw new AppError(400, `Item is not available for claiming (status: ${item.status})`)

  const duplicate = await prisma.claimRequest.findFirst({
    where: { item_id: data.item_id, claimer_id: data.claimer_id, status: 'PENDING' }
  })
  if (duplicate) throw new AppError(409, 'You already have a pending claim for this item')

  const claim = await prisma.claimRequest.create({
    data: {
      item_id: data.item_id,
      claimer_id: data.claimer_id,
      ownership_desc: data.ownership_desc
    },
    include: claimInclude
  })

  sendClaimInvoiceEmail(claim)
  await createClaimNotification(data.claimer_id, 'CLAIM_SUBMITTED', claim)
  return claim
}

const claimInclude = {
  item: {
    include: {
      category: true,
      building: true,
      room: { include: { building: true } },
      photos: true,
      recorder: { select: { name: true } }
    }
  },
  claimer: true
} as const

export const getClaims = async (query?: any) => {
  const limit: number = query?.limit ?? 20
  const offset: number = query?.offset ?? 0

  const where: any = {}
  if (query?.item_id) where.item_id = query.item_id
  if (query?.user_id) where.claimer_id = query.user_id
  if (query?.status) where.status = query.status

  if (query?.category) {
    where.item = {
      ...(where.item ?? {}),
      category: { name: { equals: query.category, mode: 'insensitive' } }
    }
  }

  if (query?.search) {
    const term = String(query.search).trim()
    if (term) {
      where.OR = [
        { claimer: { name: { contains: term, mode: 'insensitive' } } },
        { item: { name: { contains: term, mode: 'insensitive' } } }
      ]
    }
  }

  const [total, data] = await prisma.$transaction([
    prisma.claimRequest.count({ where }),
    prisma.claimRequest.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { requested_at: 'desc' },
      include: claimInclude
    })
  ])

  return { data, total, limit, offset }
}

export const getClaimById = async (id: string) => {
  const claim = await prisma.claimRequest.findUnique({
    where: { claim_id: id },
    include: claimInclude
  })
  if (!claim) throw new AppError(404, 'Claim not found')
  return claim
}

export const deleteClaim = async (id: string) => {
  return prisma.claimRequest.delete({
    where: { claim_id: id }
  })
}

export const updateClaimStatus = async (id: string, data: any, changed_by: string) => {
  const existing = await prisma.claimRequest.findUnique({
    where: { claim_id: id },
    include: { item: { select: { status: true } } }
  })

  if (!existing) throw new AppError(404, 'Claim not found')

  const now = new Date()
  const updateData: Record<string, unknown> = {
    status: data.status,
  }

  if (data.staff_notes !== undefined) {
    updateData.staff_notes = data.staff_notes
  }

  if (data.status === 'APPROVED' || data.status === 'REJECTED') {
    updateData.decision_at = now
  }

  if (data.status === 'COLLECTED') {
    updateData.resolved_at = now
    if (!existing.decision_at) {
      updateData.decision_at = now
    }
  }

  const claim = await prisma.claimRequest.update({
    where: { claim_id: id },
    data: updateData,
    include: claimInclude
  })

  if (data.status === 'APPROVED') {
    await prisma.item.update({
      where: { item_id: claim.item_id },
      data: { status: 'CLAIMED', approved_by: changed_by }
    })

    await logAudit({
      item_id: claim.item_id,
      changed_by,
      action: 'APPROVE',
      old_status: existing.item.status,
      new_status: 'CLAIMED',
      notes: data.staff_notes
    })

    sendClaimStatusEmail(claim)
    await createClaimNotification(claim.claimer_id, 'CLAIM_APPROVED', claim)
  } else if (data.status === 'REJECTED') {
    await logAudit({
      item_id: claim.item_id,
      changed_by,
      action: 'REJECT',
      old_status: existing.item.status,
      notes: data.staff_notes
    })

    sendClaimStatusEmail(claim)
    await createClaimNotification(claim.claimer_id, 'CLAIM_REJECTED', claim)
  } else if (data.status === 'COLLECTED') {
    await prisma.item.update({
      where: { item_id: claim.item_id },
      data: { status: 'COLLECTED' }
    })

    await logAudit({
      item_id: claim.item_id,
      changed_by,
      action: 'UPDATE',
      old_status: existing.item.status,
      new_status: 'COLLECTED'
    })

    await createClaimNotification(claim.claimer_id, 'CLAIM_COLLECTED', claim)
  }

  return claim
}
