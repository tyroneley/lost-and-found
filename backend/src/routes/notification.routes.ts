import { Hono } from 'hono'
import {
  getNotificationsHandler,
  getUnreadCountHandler,
  markAllNotificationsReadHandler,
  markNotificationReadHandler,
} from '../controllers/notification.controller'
import { authMiddleware, requireActiveAccount } from '../middleware/auth'

const notificationRoutes = new Hono()

notificationRoutes.use('/*', authMiddleware)
notificationRoutes.use('/*', requireActiveAccount)
notificationRoutes.get('/unread-count', getUnreadCountHandler)
notificationRoutes.patch('/read-all', markAllNotificationsReadHandler)
notificationRoutes.get('/', getNotificationsHandler)
notificationRoutes.patch('/:id/read', markNotificationReadHandler)

export default notificationRoutes
