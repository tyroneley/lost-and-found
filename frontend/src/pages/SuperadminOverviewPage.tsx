import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Item } from '../App'
import { getAllClaims, getAuditLog, getItems, getUsers } from '../services/api'
import type { ApiUser, AuditLogApiEntry } from '../services/api'
import { auditActionLabel, auditDotColor, relativeTime } from '../utils/auditLog'
import { transformBackendClaims, transformBackendItems, TransformedClaim } from '../utils/transformData'

interface SuperadminOverviewPageProps {
  userName: string
}

function daysUntil(isoDate: string | null): number | null {
  if (!isoDate) return null
  const diff = new Date(isoDate).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function userRoleLabel(role: ApiUser['role']): string {
  switch (role) {
    case 'STAFF':
      return 'Staff'
    case 'SUPERADMIN':
      return 'Superadmin'
    default:
      return 'Public'
  }
}

function userMeta(user: ApiUser): string {
  const email = user.uni_email || user.personal_email
  const extra = user.affiliation ? ` · ${user.affiliation}` : ''
  return `${email}${extra}`
}

function claimActionLabel(status: TransformedClaim['status']): string {
  switch (status) {
    case 'pending':
      return 'New claim submitted'
    case 'approved':
      return 'Claim approved'
    case 'rejected':
      return 'Claim rejected'
    case 'collected':
      return 'Item marked collected'
  }
}

function claimDotColor(status: TransformedClaim['status']): string {
  switch (status) {
    case 'pending':
      return '#ca8a04'
    case 'approved':
      return '#16a34a'
    case 'rejected':
      return '#dc2626'
    case 'collected':
      return '#004a87'
  }
}

export function SuperadminOverviewPage({ userName }: SuperadminOverviewPageProps) {
  const navigate = useNavigate()
  const [items, setItems] = useState<Item[]>([])
  const [claims, setClaims] = useState<TransformedClaim[]>([])
  const [users, setUsers] = useState<ApiUser[]>([])
  const [auditEntries, setAuditEntries] = useState<AuditLogApiEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getItems({ limit: 500 }),
      getAllClaims({ limit: 100 }).catch(() => ({ data: [] as TransformedClaim[] })),
      getUsers({ limit: 8 }).catch(() => ({ data: [] as ApiUser[] })),
      getAuditLog({ limit: 5 }).catch(() => ({ data: [] as AuditLogApiEntry[] })),
    ])
      .then(([itemsResponse, claimsResponse, usersResponse, auditResponse]) => {
        const rawItems = Array.isArray(itemsResponse) ? itemsResponse : itemsResponse.data ?? []
        setItems(transformBackendItems(rawItems))

        const rawClaims = Array.isArray(claimsResponse) ? claimsResponse : claimsResponse.data ?? []
        setClaims(transformBackendClaims(rawClaims))

        const rawUsers = Array.isArray(usersResponse) ? usersResponse : usersResponse.data ?? []
        setUsers(rawUsers)

        setAuditEntries(auditResponse.data ?? [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const activeItems = items.filter((i) => i.status === 'Active').length
  const pendingClaims = claims.filter((c) => c.status === 'pending').length

  const expiringCount = items.filter((i) => {
    const d = daysUntil(i.expires_at)
    return d !== null && d <= 14 && d > 0
  }).length

  const now = new Date()
  const resolvedThisMonth = claims.filter((c) => {
    if (c.status !== 'approved' && c.status !== 'collected') return false
    const date = new Date(c.decision_at || c.requested_at)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4)

  const recentActivity =
    auditEntries.length > 0
      ? auditEntries
      : [...claims]
          .sort((a, b) => new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime())
          .slice(0, 5)

  if (loading) {
    return (
      <main className="staff-dashboard-main" style={{ padding: '3rem', textAlign: 'center', color: '#90a4ae' }}>
        Loading overview…
      </main>
    )
  }

  return (
    <main className="staff-dashboard-main">
      <div className="staff-dashboard-page">
        <div className="staff-dashboard-header">
          <h1 className="staff-dashboard-title">System overview</h1>
          <p className="staff-dashboard-subtitle">
            {now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · BINUS Lost &amp; Found · {userName || 'Superadmin'}
          </p>
        </div>

        <div className="staff-metrics">
          <div className="staff-metric">
            <div className="staff-metric-label">Total items</div>
            <div className="staff-metric-val">{items.length}</div>
            <div className="staff-metric-sub">all time</div>
          </div>
          <div className="staff-metric">
            <div className="staff-metric-label">Active listings</div>
            <div className="staff-metric-val">{activeItems}</div>
            <div className="staff-metric-sub">publicly visible</div>
          </div>
          <div className="staff-metric staff-metric-warn">
            <div className="staff-metric-label">Open claims</div>
            <div className="staff-metric-val">{pendingClaims}</div>
            <div className="staff-metric-sub">pending review</div>
          </div>
          <div className="staff-metric">
            <div className="staff-metric-label">Resolved this month</div>
            <div className="staff-metric-val" style={{ color: '#16a34a' }}>
              {resolvedThisMonth}
            </div>
            <div className="staff-metric-sub">claimed or returned</div>
          </div>
        </div>

        <div className="staff-two-col">
          <div className="staff-left-col">
            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Recent accounts</span>
                <span className="staff-card-link" onClick={() => navigate('/admin/users')} style={{ cursor: 'pointer' }}>
                  View all →
                </span>
              </div>
              {recentUsers.length === 0 ? (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>No users found</p>
              ) : (
                recentUsers.map((user) => (
                  <div key={user.user_id} className="staff-claim-row">
                    <div className={`admin-user-avatar admin-user-avatar-${user.role === 'PUBLIC' ? 'public' : 'staff'}`}>
                      {initials(user.name)}
                    </div>
                    <div className="staff-cr-info">
                      <div className="staff-cr-name">{user.name}</div>
                      <div className="staff-cr-meta">{userMeta(user)}</div>
                    </div>
                    <span className={`staff-cr-badge ${user.role === 'PUBLIC' ? 'admin-user-badge-public' : 'staff-badge-pending'}`} style={user.role !== 'PUBLIC' ? { background: '#fef9c3', color: '#854d0e' } : undefined}>
                      {userRoleLabel(user.role)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="staff-right-col">
            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Quick actions</span>
              </div>
              <div className="staff-quick-actions">
                <button type="button" className="staff-qa-btn" onClick={() => navigate('/admin/settings')}>
                  <div className="staff-qa-icon staff-qa-icon-purple">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#5b21b6" strokeWidth="1.5" aria-hidden="true">
                      <circle cx="8" cy="8" r="2.5" />
                      <path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14" />
                    </svg>
                  </div>
                  <div>
                    <div className="staff-qa-text-label">Configure settings</div>
                    <div className="staff-qa-text-sub">Categories, buildings, rooms</div>
                  </div>
                </button>
                <button type="button" className="staff-qa-btn" onClick={() => navigate('/admin/users')}>
                  <div className="staff-qa-icon staff-qa-icon-blue">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#004a87" strokeWidth="1.5" aria-hidden="true">
                      <circle cx="8" cy="5" r="2.5" />
                      <path d="M3 13c0-2.5 2-4 5-4s5 1.5 5 4" />
                    </svg>
                  </div>
                  <div>
                    <div className="staff-qa-text-label">Manage users</div>
                    <div className="staff-qa-text-sub">View staff and public accounts</div>
                  </div>
                </button>
                <button type="button" className="staff-qa-btn" onClick={() => navigate('/admin/audit')}>
                  <div className="staff-qa-icon staff-qa-icon-amber">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#854d0e" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 4h10M3 8h7M3 12h5" />
                    </svg>
                  </div>
                  <div>
                    <div className="staff-qa-text-label">View audit log</div>
                    <div className="staff-qa-text-sub">Full system activity history</div>
                  </div>
                </button>
                <button type="button" className="staff-qa-btn" onClick={() => navigate('/admin/items')}>
                  <div className="staff-qa-icon staff-qa-icon-green" style={{ background: '#ffebee', borderColor: '#ffcdd2' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#c62828" strokeWidth="1.5" aria-hidden="true">
                      <path d="M8 2l6 11H2L8 2z" />
                      <path d="M8 6v3M8 11.5v.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="staff-qa-text-label">Items expiring soon</div>
                    <div className="staff-qa-text-sub">
                      {expiringCount} item{expiringCount === 1 ? '' : 's'} within 14 days
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="staff-dashboard-section">
          <div className="staff-card">
            <div className="staff-card-head">
              <span className="staff-card-title">Recent system activity</span>
              <span className="staff-card-link" onClick={() => navigate('/admin/audit')} style={{ cursor: 'pointer' }}>
                View full log →
              </span>
            </div>
            <div className="staff-activity-list">
              {recentActivity.length === 0 ? (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>No recent activity</p>
              ) : auditEntries.length > 0 ? (
                auditEntries.map((entry) => (
                  <div key={entry.log_id} className="staff-activity-row">
                    <div className="staff-activity-dot" style={{ backgroundColor: auditDotColor(entry.action) }} />
                    <div className="staff-cr-info">
                      <div className="staff-cr-name staff-activity-text">{auditActionLabel(entry)}</div>
                      <div className="staff-cr-meta">
                        {entry.user?.name ? `by ${entry.user.name} · ` : ''}
                        {relativeTime(entry.created_at)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                (recentActivity as TransformedClaim[]).map((claim) => (
                  <div key={claim.claim_id} className="staff-activity-row">
                    <div className="staff-activity-dot" style={{ backgroundColor: claimDotColor(claim.status) }} />
                    <div className="staff-cr-info">
                      <div className="staff-cr-name staff-activity-text">
                        {claimActionLabel(claim.status)}: {claim.item_name}
                      </div>
                      <div className="staff-cr-meta">{relativeTime(claim.requested_at)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
