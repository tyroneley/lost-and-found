import { prisma } from '../lib/prisma'

// AuditLog requires a changed_by FK so automated expiry is not logged there.
// Counts are printed to stdout instead.
export const expireItems = async (): Promise<number> => {
  const result = await prisma.item.updateMany({
    where: {
      expires_at: { lte: new Date() },
      status: { in: ['ACTIVE', 'CLAIMED'] },
      deleted_at: null
    },
    data: { status: 'RETURNED' }
  })
  return result.count
}
