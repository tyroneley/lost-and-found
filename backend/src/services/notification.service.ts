import { NotificationType } from '../../generated/prisma'
import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errorHandler'

type ClaimForNotification = {
  claim_id: string
  item?: { name?: string | null } | null
}

function notificationContent(type: NotificationType, itemName: string) {
  switch (type) {
    case 'CLAIM_SUBMITTED':
      return {
        title: 'Claim submitted',
        message: `Your claim for "${itemName}" has been submitted and is pending review.`,
      }
    case 'CLAIM_APPROVED':
      return {
        title: 'Claim approved',
        message: `Your claim for "${itemName}" was approved. Visit the Lost & Found office to collect it.`,
      }
    case 'CLAIM_REJECTED':
      return {
        title: 'Claim rejected',
        message: `Your claim for "${itemName}" was rejected. Check My Claims for staff notes.`,
      }
    case 'CLAIM_COLLECTED':
      return {
        title: 'Item collected',
        message: `Your claim for "${itemName}" is complete — the item has been marked as collected.`,
      }
  }
}

export async function createClaimNotification(
  user_id: string,
  type: NotificationType,
  claim: ClaimForNotification
) {
  const itemName = claim.item?.name ?? 'your item'
  const { title, message } = notificationContent(type, itemName)

  return prisma.notification.create({
    data: {
      user_id,
      type,
      title,
      message,
      claim_id: claim.claim_id,
    },
  })
}

export async function getNotifications(user_id: string, query?: { limit?: number; offset?: number }) {
  const limit = query?.limit ?? 20
  const offset = query?.offset ?? 0

  const where = { user_id }

  const [total, data] = await prisma.$transaction([
    prisma.notification.count({ where }),
    prisma.notification.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { created_at: 'desc' },
    }),
  ])

  return { data, total, limit, offset }
}

export async function getUnreadCount(user_id: string) {
  const count = await prisma.notification.count({
    where: { user_id, read_at: null },
  })
  return { count }
}

export async function markNotificationRead(notification_id: string, user_id: string) {
  const existing = await prisma.notification.findUnique({
    where: { notification_id },
  })

  if (!existing) throw new AppError(404, 'Notification not found')
  if (existing.user_id !== user_id) throw new AppError(403, 'Forbidden')

  if (existing.read_at) return existing

  return prisma.notification.update({
    where: { notification_id },
    data: { read_at: new Date() },
  })
}

export async function markAllNotificationsRead(user_id: string) {
  const result = await prisma.notification.updateMany({
    where: { user_id, read_at: null },
    data: { read_at: new Date() },
  })
  return { updated: result.count }
}
