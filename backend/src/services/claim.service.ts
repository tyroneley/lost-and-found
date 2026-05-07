import { prisma } from '../lib/prisma'
import { logAudit } from './audit.service'

export const createClaim = async (data: any) => {
  return prisma.claimRequest.create({
    data: {
      item_id: data.item_id,
      claimer_id: data.claimer_id,
      ownership_desc: data.ownership_desc
    }
  })
}

export const getClaims = async (query?: any) => {
  return prisma.claimRequest.findMany({
    where: {
      item_id: query?.item_id,
      claimer_id: query?.user_id,
      status: query?.status
    },
    include: {
      item: true,
      claimer: true
    }
  })
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