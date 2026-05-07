import { prisma } from '../lib/prisma'
import { logAudit } from './audit.service'
import { AppError } from '../utils/errorHandler'

export const createClaim = async (data: any) => {
  const item = await prisma.item.findUnique({ where: { item_id: data.item_id } })

  if (!item || item.deleted_at) throw new AppError(404, 'Item not found')
  if (item.status !== 'APPROVED') throw new AppError(400, `Item is not available for claiming (status: ${item.status})`)

  const duplicate = await prisma.claimRequest.findFirst({
    where: { item_id: data.item_id, claimer_id: data.claimer_id, status: 'PENDING' }
  })
  if (duplicate) throw new AppError(409, 'You already have a pending claim for this item')

  return prisma.claimRequest.create({
    data: {
      item_id: data.item_id,
      claimer_id: data.claimer_id,
      ownership_desc: data.ownership_desc
    }
  })
}

export const getClaims = async (query?: any) => {
  const limit: number = query?.limit ?? 20
  const offset: number = query?.offset ?? 0

  const where = {
    item_id: query?.item_id,
    claimer_id: query?.user_id,
    status: query?.status
  }

  const [total, data] = await prisma.$transaction([
    prisma.claimRequest.count({ where }),
    prisma.claimRequest.findMany({
      where,
      take: limit,
      skip: offset,
      include: { item: true, claimer: true }
    })
  ])

  return { data, total, limit, offset }
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

  const claim = await prisma.claimRequest.update({
    where: { claim_id: id },
    data: {
      status: data.status,
      resolved_at: new Date()
    }
  })

  if (data.status === 'APPROVED') {
    await prisma.item.update({
      where: { item_id: claim.item_id },
      data: { status: 'CLAIMED' }
    })

    if (existing) {
      await logAudit({
        item_id: claim.item_id,
        changed_by,
        action: 'CLAIM',
        old_status: existing.item.status,
        new_status: 'CLAIMED'
      })
    }
  } else if (data.status === 'REJECTED' && existing) {
    await logAudit({
      item_id: claim.item_id,
      changed_by,
      action: 'REJECT',
      old_status: existing.item.status
    })
  }

  return claim
}
