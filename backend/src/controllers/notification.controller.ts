import {
  getNotifications,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from '../services/notification.service'
import { handleError } from '../utils/errorHandler'
import { idParamSchema } from '../validators/common.validator'
import { notificationQuerySchema } from '../validators/notification.validator'
import type { AuthPayload } from '../middleware/auth'

export const getNotificationsHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const query = notificationQuerySchema.parse(c.req.query())
    const notifications = await getNotifications(payload.sub, query)
    return c.json(notifications)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getUnreadCountHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const result = await getUnreadCount(payload.sub)
    return c.json(result)
  } catch (error) {
    return handleError(c, error)
  }
}

export const markNotificationReadHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const params = idParamSchema.parse({ id: c.req.param('id') })
    const notification = await markNotificationRead(params.id, payload.sub)
    return c.json(notification)
  } catch (error) {
    return handleError(c, error)
  }
}

export const markAllNotificationsReadHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const result = await markAllNotificationsRead(payload.sub)
    return c.json(result)
  } catch (error) {
    return handleError(c, error)
  }
}
