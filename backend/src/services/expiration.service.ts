import { prisma } from '../lib/prisma'
import { sendItemExpiredFinderEmail } from './email.service'

// AuditLog requires a changed_by FK so automated expiry is not logged there.
// Counts are printed to stdout instead.
export const expireItems = async (): Promise<number> => {
  const now = new Date()

  const expiring = await prisma.item.findMany({
    where: {
      expires_at: { lte: now },
      status: { in: ['ACTIVE', 'CLAIMED'] },
      deleted_at: null
    },
    select: { item_id: true, name: true, finder_name: true, finder_contact: true }
  })

  if (expiring.length === 0) return 0

  const result = await prisma.item.updateMany({
    where: { item_id: { in: expiring.map(i => i.item_id) } },
    data: { status: 'RETURNED' }
  })

  for (const item of expiring) {
    sendItemExpiredFinderEmail(item)
  }

  return result.count
}
