import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../services/api'

interface NotificationBellProps {
  isSignedIn: boolean
  userRole: 'public' | 'staff' | 'superadmin'
}

export function NotificationBell({ isSignedIn, userRole }: NotificationBellProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<api.Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const showBell = isSignedIn && userRole === 'public'

  const refreshUnreadCount = useCallback(async () => {
    if (!showBell) return
    try {
      const { count } = await api.getUnreadNotificationCount()
      setUnreadCount(count)
    } catch {
      // Ignore polling errors
    }
  }, [showBell])

  const loadNotifications = useCallback(async () => {
    if (!showBell) return
    setLoading(true)
    try {
      const response = await api.getNotifications({ limit: 15 })
      setNotifications(response.data)
      await refreshUnreadCount()
    } catch {
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }, [showBell, refreshUnreadCount])

  useEffect(() => {
    if (!showBell) return
    refreshUnreadCount()
    const interval = window.setInterval(refreshUnreadCount, 60_000)
    return () => window.clearInterval(interval)
  }, [showBell, refreshUnreadCount])

  useEffect(() => {
    if (!open || !showBell) return
    loadNotifications()
  }, [open, showBell, loadNotifications])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    setOpen((prev) => !prev)
  }

  const handleNotificationClick = async (notification: api.Notification) => {
    if (!notification.read_at) {
      try {
        await api.markNotificationRead(notification.notification_id)
        setNotifications((prev) =>
          prev.map((n) =>
            n.notification_id === notification.notification_id
              ? { ...n, read_at: new Date().toISOString() }
              : n
          )
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      } catch {
        // Still navigate even if mark-read fails
      }
    }
    setOpen(false)
    navigate('/my-claims')
  }

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead()
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() }))
      )
      setUnreadCount(0)
    } catch {
      // Ignore
    }
  }

  if (!showBell) return null

  return (
    <div className="notification-bell-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="notification-bell-btn"
        onClick={handleToggle}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        title="Notifications"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button type="button" className="notification-mark-all" onClick={handleMarkAllRead}>
                Mark all read
              </button>
            )}
          </div>

          {loading ? (
            <div className="notification-empty">Loading…</div>
          ) : notifications.length === 0 ? (
            <div className="notification-empty">No notifications yet</div>
          ) : (
            <ul className="notification-list">
              {notifications.map((notification) => (
                <li key={notification.notification_id}>
                  <button
                    type="button"
                    className={`notification-item${notification.read_at ? '' : ' unread'}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <span className="notification-item-title">{notification.title}</span>
                    <span className="notification-item-message">{notification.message}</span>
                    <span className="notification-item-time">
                      {formatRelativeTime(notification.created_at)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

function formatRelativeTime(iso: string): string {
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}
