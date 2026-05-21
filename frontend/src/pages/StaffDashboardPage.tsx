import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Item } from '../App'
import { getAllClaims, Claim } from '../services/api'

interface StaffDashboardPageProps {
  items: Item[];
  userName: string;
}

function daysUntil(isoDate: string | null): number | null {
  if (!isoDate) return null
  const diff = new Date(isoDate).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return days === 1 ? 'yesterday' : `${days} days ago`
}

function claimActionLabel(status: Claim['status']): string {
  switch (status) {
    case 'pending': return 'New claim submitted'
    case 'approved': return 'Claim approved'
    case 'rejected': return 'Claim rejected'
    case 'collected': return 'Item collected'
  }
}

function claimDotColor(status: Claim['status']): string {
  switch (status) {
    case 'pending': return '#ca8a04'
    case 'approved': return '#16a34a'
    case 'rejected': return '#dc2626'
    case 'collected': return '#004a87'
  }
}

export function StaffDashboardPage({ items, userName }: StaffDashboardPageProps) {
  const navigate = useNavigate()
  const [claims, setClaims] = useState<Claim[]>([])

  useEffect(() => {
    getAllClaims().then(setClaims).catch(console.error)
  }, [])

  const activeItems = items.filter(i => i.status === 'Active').length

  const pendingClaims = claims.filter(c => c.status === 'pending').length

  const expiringItemsList = items
    .filter(i => { const d = daysUntil(i.expires_at); return d !== null && d <= 14 && d > 0 })
    .slice(0, 3)

  const expiringCount = items.filter(i => {
    const d = daysUntil(i.expires_at)
    return d !== null && d <= 14 && d > 0
  }).length

  const now = new Date()
  const resolvedThisMonth = claims.filter(c => {
    if (c.status !== 'approved' && c.status !== 'collected') return false
    const date = new Date(c.decision_at || c.requested_at)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  const recentClaims = [...claims]
    .sort((a, b) => new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime())
    .slice(0, 4)

  const pendingList = claims
    .filter(c => c.status === 'pending')
    .sort((a, b) => new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime())
    .slice(0, 4)

  const getItemName = (itemId: string) =>
    items.find(i => i.item_id === itemId)?.name ?? itemId.slice(0, 8).toUpperCase()

  return (
    <main className="staff-dashboard-main">
      <div className="staff-dashboard-page">
        <div className="staff-dashboard-header">
          <h1 className="staff-dashboard-title">Good morning, {userName || 'Staff'}.</h1>
          <p className="staff-dashboard-subtitle">
            {now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · Security Desk
          </p>
        </div>

        <div className="staff-metrics">
          <div className="staff-metric">
            <div className="staff-metric-label">Active items</div>
            <div className="staff-metric-val">{activeItems}</div>
            <div className="staff-metric-sub">currently listed</div>
          </div>
          <div className="staff-metric staff-metric-warn">
            <div className="staff-metric-label">Pending claims</div>
            <div className="staff-metric-val">{pendingClaims}</div>
            <div className="staff-metric-sub">awaiting review</div>
          </div>
          <div className="staff-metric staff-metric-alert">
            <div className="staff-metric-label">Expiring soon</div>
            <div className="staff-metric-val">{expiringCount}</div>
            <div className="staff-metric-sub">within 14 days</div>
          </div>
          <div className="staff-metric">
            <div className="staff-metric-label">Resolved this month</div>
            <div className="staff-metric-val">{resolvedThisMonth}</div>
            <div className="staff-metric-sub">claimed or returned</div>
          </div>
        </div>

        <div className="staff-two-col">
          <div className="staff-left-col">
            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Pending claims</span>
                <span className="staff-card-link" onClick={() => navigate('/staff/claims')} style={{ cursor: 'pointer' }}>View all →</span>
              </div>
              {pendingList.length === 0 ? (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '0.5rem 0' }}>No pending claims</p>
              ) : (
                pendingList.map(claim => (
                  <div key={claim.claim_id} className="staff-claim-row">
                    <div className="staff-cr-dot staff-dot-pending" />
                    <div className="staff-cr-info">
                      <div className="staff-cr-name">{getItemName(claim.item_id)}</div>
                      <div className="staff-cr-meta">{relativeTime(claim.requested_at)}</div>
                    </div>
                    <span className="staff-cr-badge staff-badge-pending">Pending</span>
                  </div>
                ))
              )}
            </div>

            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Items expiring soon</span>
                <span className="staff-card-link" onClick={() => navigate('/staff/items')} style={{ cursor: 'pointer' }}>View all →</span>
              </div>
              {expiringItemsList.length === 0 ? (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '0.5rem 0' }}>No items expiring soon</p>
              ) : (
                expiringItemsList.map(item => {
                  const days = daysUntil(item.expires_at)!
                  const urgencyClass = days <= 7 ? 'staff-days-urgent' : 'staff-days-warn'
                  return (
                    <div key={item.item_id} className="staff-expiry-row">
                      <div className="staff-er-info">
                        <div className="staff-er-name">{item.name}</div>
                        <div className="staff-er-meta">Found {item.foundAt} · {item.found_location}</div>
                      </div>
                      <span className={`staff-er-days ${urgencyClass}`}>{days} days left</span>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="staff-right-col">
            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Quick actions</span>
              </div>
              <div className="staff-quick-actions">
                <button className="staff-qa-btn" onClick={() => navigate('/staff/report')}>
                  <div className="staff-qa-icon staff-qa-icon-blue">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#004a87" strokeWidth="1.5">
                      <rect x="2" y="2" width="12" height="12" rx="2"/>
                      <path d="M8 5v6M5 8h6"/>
                    </svg>
                  </div>
                  <div>
                    <div className="staff-qa-text-label">Record found item</div>
                    <div className="staff-qa-text-sub">Add a new item to the system</div>
                  </div>
                </button>
                <button className="staff-qa-btn" onClick={() => navigate('/staff/claims')}>
                  <div className="staff-qa-icon staff-qa-icon-amber">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#ca8a04" strokeWidth="1.5">
                      <path d="M2 4h12M2 8h8M2 12h6"/>
                    </svg>
                  </div>
                  <div>
                    <div className="staff-qa-text-label">Review claims</div>
                    <div className="staff-qa-text-sub">{pendingClaims} pending your review</div>
                  </div>
                </button>
                <button className="staff-qa-btn" onClick={() => navigate('/staff/items')}>
                  <div className="staff-qa-icon staff-qa-icon-green">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#16a34a" strokeWidth="1.5">
                      <circle cx="8" cy="8" r="6"/>
                      <path d="M5.5 8l2 2 3-3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="staff-qa-text-label">Manage items</div>
                    <div className="staff-qa-text-sub">View and update found items</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Recent claim activity</span>
              </div>
              <div className="staff-activity-list">
                {recentClaims.length === 0 ? (
                  <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '0.5rem 0' }}>No recent activity</p>
                ) : (
                  recentClaims.map(claim => (
                    <div key={claim.claim_id} className="staff-activity-row">
                      <div
                        className="staff-activity-dot"
                        style={{ backgroundColor: claimDotColor(claim.status) }}
                      />
                      <div className="staff-cr-info">
                        <div className="staff-cr-name staff-activity-text">
                          {claimActionLabel(claim.status)}: {getItemName(claim.item_id)}
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
      </div>
    </main>
  )
}
