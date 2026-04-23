import { prisma } from '../lib/prisma'

export const createClaim = async (data: any) => {
  return prisma.claimRequest.create({
    data: {
      item_id: data.item_id,
      claimer_id: data.claimer_id,
      ownership_desc: data.ownership_desc
    }
  })
}

export const getClaims = async () => {
  return prisma.claimRequest.findMany({
    include: {
      item: true,
      claimer: true
    }
  })
}

export const updateClaimStatus = async (id: string, data: any) => {
  const claim = await prisma.claimRequest.update({
    where: { claim_id: id },
    data: {
      status: data.status,
      resolved_at: new Date()
    }
  })

  // If approved → mark item as claimed
  if (data.status === 'APPROVED') {
    await prisma.item.update({
      where: { item_id: claim.item_id },
      data: { status: 'CLAIMED' }
    })
  }

  return claim
}