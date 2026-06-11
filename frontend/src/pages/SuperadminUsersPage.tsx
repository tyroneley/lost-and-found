import { useState, useEffect } from 'react'
import { getUsers } from '../services/api'
import type { ApiUser } from '../services/api'
import { FIELD_LIMITS } from '../utils/fieldLimits'

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

function roleBadgeClass(role: ApiUser['role']): string {
  if (role === 'PUBLIC') return 'staff-badge-approved'
  if (role === 'SUPERADMIN') return 'admin-user-badge-superadmin'
  return 'staff-badge-pending'
}

export function SuperadminUsersPage() {
  const [users, setUsers] = useState<ApiUser[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getUsers({
      limit: 100,
      q: search.trim() || undefined,
      role: roleFilter || undefined,
    })
      .then((res) => {
        setUsers(res.data ?? [])
        setTotal(res.total ?? res.data?.length ?? 0)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [search, roleFilter])

  return (
    <main className="staff-dashboard-main">
      <div className="staff-dashboard-page">
        <div className="staff-dashboard-header">
          <h1 className="staff-dashboard-title">Users</h1>
          <p className="staff-dashboard-subtitle">
            {total} account{total === 1 ? '' : 's'} in the system
          </p>
        </div>

        <div className="staff-dashboard-section">
          <div className="staff-items-toolbar" style={{ marginBottom: '1.25rem' }}>
            <div className="staff-items-search-group" style={{ flex: 1, minWidth: '220px' }}>
              <label className="staff-items-filter-label">Search</label>
              <div className="staff-items-search">
                <input
                  type="text"
                  placeholder="Name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  maxLength={FIELD_LIMITS.SEARCH}
                />
              </div>
            </div>
            <div className="staff-items-filter-group">
              <label className="staff-items-filter-label">Role</label>
              <select className="staff-items-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="">All roles</option>
                <option value="STAFF">Staff</option>
                <option value="PUBLIC">Public</option>
                <option value="SUPERADMIN">Superadmin</option>
              </select>
            </div>
          </div>

          <div className="staff-card">
            {loading ? (
              <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>Loading users…</p>
            ) : users.length === 0 ? (
              <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>No users match your filters</p>
            ) : (
              users.map((user) => (
                <div key={user.user_id} className="staff-claim-row">
                  <div className={`admin-user-avatar admin-user-avatar-${user.role === 'PUBLIC' ? 'public' : 'staff'}`}>
                    {initials(user.name)}
                  </div>
                  <div className="staff-cr-info">
                    <div className="staff-cr-name">{user.name}</div>
                    <div className="staff-cr-meta">{userMeta(user)}</div>
                  </div>
                  <span className={`staff-cr-badge ${roleBadgeClass(user.role)}`} style={user.role === 'SUPERADMIN' ? { background: '#ede9fe', color: '#5b21b6' } : undefined}>
                    {userRoleLabel(user.role)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
