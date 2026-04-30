import { useNavigate } from 'react-router-dom'
import { Item } from '../App'

interface StaffDashboardPageProps {
  items: Item[];
  userName: string;
}

export function StaffDashboardPage({ items, userName }: StaffDashboardPageProps) {
  const navigate = useNavigate()
  
  // Mock data for dashboard metrics and recent activity
  const activeItems = items.filter(item => item.status === 'Active Ticket').length
  const pendingClaims = 7
  const expiringItems = items.filter(item => {
    const expiry = new Date(item.expiry)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 14 && daysUntilExpiry > 0
  }).length
  const resolvedThisMonth = 18

  const recentActivity = [
    { id: 1, action: 'Laptop bag marked collected', actor: 'you', time: '10 min ago', type: 'collected' },
    { id: 2, action: 'New item recorded: Power bank', actor: 'Security', time: '1 hour ago', type: 'recorded' },
    { id: 3, action: 'Claim rejected: Grey hoodie', actor: 'you', time: '3 hours ago', type: 'rejected' },
    { id: 4, action: 'Item expired: Blue umbrella', actor: 'system', time: 'yesterday', type: 'expired' },
  ]

  const expiringItems_ = items
    .filter(item => {
      const expiry = new Date(item.expiry)
      const today = new Date()
      const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return daysUntilExpiry <= 14 && daysUntilExpiry > 0
    })
    .slice(0, 3)

  return (
    <main className="staff-dashboard-main">
      <div className="staff-dashboard-page">
        <div className="staff-dashboard-header">
          <h1 className="staff-dashboard-title">Good morning, {userName || 'Staff'}.</h1>
          <p className="staff-dashboard-subtitle">Wednesday, 30 April 2026 · Security Desk, FX Campus</p>
        </div>

        {/* Metrics */}
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
            <div className="staff-metric-val">{expiringItems}</div>
            <div className="staff-metric-sub">within 14 days</div>
          </div>
          <div className="staff-metric">
            <div className="staff-metric-label">Resolved this month</div>
            <div className="staff-metric-val">{resolvedThisMonth}</div>
            <div className="staff-metric-sub">claimed or returned</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="staff-two-col">
          <div className="staff-left-col">
            {/* Pending Claims Card */}
            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Pending claims</span>
                <span className="staff-card-link">View all →</span>
              </div>
              <div className="staff-claim-row">
                <div className="staff-cr-dot staff-dot-pending"></div>
                <div className="staff-cr-info">
                  <div className="staff-cr-name">White wireless earbuds</div>
                  <div className="staff-cr-meta">Claimed by Tyrone Vargas · 2 hours ago</div>
                </div>
                <span className="staff-cr-badge staff-badge-pending">Pending</span>
              </div>
              <div className="staff-claim-row">
                <div className="staff-cr-dot staff-dot-pending"></div>
                <div className="staff-cr-info">
                  <div className="staff-cr-name">Black laptop bag</div>
                  <div className="staff-cr-meta">Claimed by Orlando Jonathan · 5 hours ago</div>
                </div>
                <span className="staff-cr-badge staff-badge-pending">Pending</span>
              </div>
              <div className="staff-claim-row">
                <div className="staff-cr-dot staff-dot-approved"></div>
                <div className="staff-cr-info">
                  <div className="staff-cr-name">Student ID card</div>
                  <div className="staff-cr-meta">Claimed by Tyrone Vargas · yesterday</div>
                </div>
                <span className="staff-cr-badge staff-badge-approved">Approved</span>
              </div>
              <div className="staff-claim-row">
                <div className="staff-cr-dot staff-dot-pending"></div>
                <div className="staff-cr-info">
                  <div className="staff-cr-name">Samsung Galaxy Buds</div>
                  <div className="staff-cr-meta">Claimed by Orlando Padiman · yesterday</div>
                </div>
                <span className="staff-cr-badge staff-badge-pending">Pending</span>
              </div>
            </div>

            {/* Expiring Items Card */}
            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Items expiring soon</span>
                <span className="staff-card-link">View all →</span>
              </div>
              {expiringItems_.map((item) => {
                const expiry = new Date(item.expiry)
                const today = new Date()
                const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                const urgencyClass = daysLeft <= 7 ? 'staff-days-urgent' : 'staff-days-warn'
                return (
                  <div key={item.id} className="staff-expiry-row">
                    <div className="staff-er-info">
                      <div className="staff-er-name">{item.name}</div>
                      <div className="staff-er-meta">Found {item.foundAt} · {item.location}</div>
                    </div>
                    <span className={`staff-er-days ${urgencyClass}`}>{daysLeft} days left</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="staff-right-col">
            {/* Quick Actions Card */}
            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Quick actions</span>
              </div>
              <div className="staff-quick-actions">
                <button 
                  className="staff-qa-btn"
                  onClick={() => navigate('/staff/report')}
                >
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
                <button className="staff-qa-btn">
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
                <button className="staff-qa-btn">
                  <div className="staff-qa-icon staff-qa-icon-green">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#16a34a" strokeWidth="1.5">
                      <circle cx="8" cy="8" r="6"/>
                      <path d="M5.5 8l2 2 3-3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="staff-qa-text-label">Mark item collected</div>
                    <div className="staff-qa-text-sub">Close out a verified claim</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="staff-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Recent activity</span>
              </div>
              <div className="staff-activity-list">
                {recentActivity.map((activity) => {
                  const dotColor = 
                    activity.type === 'collected' ? '#16a34a' :
                    activity.type === 'recorded' ? '#004a87' :
                    activity.type === 'rejected' ? '#ca8a04' :
                    '#dc2626'
                  
                  return (
                    <div key={activity.id} className="staff-activity-row">
                      <div 
                        className="staff-activity-dot"
                        style={{ backgroundColor: dotColor }}
                      ></div>
                      <div className="staff-cr-info">
                        <div className="staff-cr-name staff-activity-text">{activity.action}</div>
                        <div className="staff-cr-meta">by {activity.actor} · {activity.time}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
