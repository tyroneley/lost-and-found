import { useState, useEffect, useCallback } from 'react'
import { createUser, getUsers } from '../services/api'
import type { ApiUser } from '../services/api'
import { AFFILIATION_OPTIONS, allowedRolesForAffiliation, roleForUserAffiliation } from '../utils/affiliation'
import { clampField, FIELD_LIMITS } from '../utils/fieldLimits'

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

const EMPTY_ADD_FORM = {
  name: '',
  personal_email: '',
  password: '',
  phone: '',
  uni_email: '',
  role: 'PUBLIC' as ApiUser['role'],
  affiliation: 'Student',
}

const ROLE_LABELS: Record<ApiUser['role'], string> = {
  PUBLIC: 'Public',
  STAFF: 'Staff',
  SUPERADMIN: 'Superadmin',
}

export function SuperadminUsersPage() {
  const [users, setUsers] = useState<ApiUser[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddUser, setShowAddUser] = useState(false)
  const [addForm, setAddForm] = useState(EMPTY_ADD_FORM)
  const [addError, setAddError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const loadUsers = useCallback(() => {
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

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const resetAddModal = () => {
    setAddForm(EMPTY_ADD_FORM)
    setAddError(null)
    setShowAddUser(false)
  }

  const closeAddModal = () => {
    if (saving) return
    resetAddModal()
  }

  const handleAffiliationChange = (affiliation: string) => {
    setAddForm((f) => ({
      ...f,
      affiliation,
      role: roleForUserAffiliation(affiliation, f.role),
    }))
  }

  const roleOptions = allowedRolesForAffiliation(addForm.affiliation)

  const handleAddUser = async () => {
    const name = addForm.name.trim()
    const personal_email = addForm.personal_email.trim()
    const password = addForm.password

    if (!name || !personal_email || !password) {
      setAddError('Name, personal email, and password are required')
      return
    }
    if (password.length < FIELD_LIMITS.PASSWORD_MIN) {
      setAddError(`Password must be at least ${FIELD_LIMITS.PASSWORD_MIN} characters`)
      return
    }

    setSaving(true)
    setAddError(null)
    try {
      await createUser({
        name,
        personal_email,
        password,
        role: addForm.role,
        phone: addForm.phone.trim() || undefined,
        uni_email: addForm.uni_email.trim() || undefined,
        affiliation: addForm.affiliation.trim() || undefined,
      })
      resetAddModal()
      loadUsers()
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Failed to create user')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="staff-dashboard-main">
      <div className="staff-dashboard-page admin-users-page">
        <div className="staff-items-header">
          <div>
            <h1 className="staff-items-title">Users</h1>
            <p className="staff-items-subtitle">
              {total} account{total === 1 ? '' : 's'} in the system
            </p>
          </div>
          <button type="button" className="staff-items-record-btn" onClick={() => setShowAddUser(true)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 1v10M1 6h10" />
            </svg>
            <span>Add user</span>
          </button>
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
                  onChange={(e) => setSearch(clampField(e.target.value, FIELD_LIMITS.SEARCH))}
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

      {showAddUser && (
        <div
          className="staff-report-modal-overlay"
          onClick={closeAddModal}
          role="presentation"
        >
          <div
            className="admin-form-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-user-modal-title"
          >
            <div className="admin-form-modal-banner">
              <div>
                <h2 id="add-user-modal-title">Add user</h2>
                <p>Create a new staff or public account for the lost &amp; found system.</p>
              </div>
              <button
                type="button"
                className="admin-form-modal-close"
                onClick={closeAddModal}
                aria-label="Close"
                disabled={saving}
              >
                ×
              </button>
            </div>

            <div className="admin-form-modal-body">
              {addError && <div className="staff-manage-error admin-form-modal-error">{addError}</div>}

              <div className="staff-report-section">
                <h3 className="staff-report-section-title">Account details</h3>

                <div className="staff-report-field">
                  <label htmlFor="add-user-name">
                    Full name <span className="staff-report-required">*</span>
                  </label>
                  <input
                    id="add-user-name"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={addForm.name}
                    onChange={(e) => setAddForm((f) => ({ ...f, name: clampField(e.target.value, FIELD_LIMITS.USER_NAME) }))}
                    maxLength={FIELD_LIMITS.USER_NAME}
                  />
                </div>

                <div className="staff-report-field-row">
                  <div className="staff-report-field">
                    <label htmlFor="add-user-affiliation">
                      Affiliation <span className="staff-report-required">*</span>
                    </label>
                    <select
                      id="add-user-affiliation"
                      value={addForm.affiliation}
                      onChange={(e) => handleAffiliationChange(e.target.value)}
                    >
                      {AFFILIATION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="staff-report-field">
                    <label htmlFor="add-user-role">
                      Role <span className="staff-report-required">*</span>
                    </label>
                    <select
                      id="add-user-role"
                      value={addForm.role}
                      onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value as ApiUser['role'] }))}
                      disabled={roleOptions.length === 1}
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {ROLE_LABELS[role]}
                        </option>
                      ))}
                    </select>
                    {addForm.affiliation === 'Staff' && (
                      <p className="staff-report-hint">Staff affiliation: Staff or Superadmin.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="staff-report-section">
                <h3 className="staff-report-section-title">Contact</h3>

                <div className="staff-report-field-row">
                  <div className="staff-report-field">
                    <label htmlFor="add-user-personal-email">
                      Personal email <span className="staff-report-required">*</span>
                    </label>
                    <input
                      id="add-user-personal-email"
                      type="email"
                      placeholder="name@email.com"
                      value={addForm.personal_email}
                      onChange={(e) => setAddForm((f) => ({ ...f, personal_email: clampField(e.target.value, FIELD_LIMITS.EMAIL) }))}
                      maxLength={FIELD_LIMITS.EMAIL}
                    />
                  </div>
                  <div className="staff-report-field">
                    <label htmlFor="add-user-uni-email">
                      University email <span className="staff-report-optional">(optional)</span>
                    </label>
                    <input
                      id="add-user-uni-email"
                      type="email"
                      placeholder="name@binus.ac.id"
                      value={addForm.uni_email}
                      onChange={(e) => setAddForm((f) => ({ ...f, uni_email: clampField(e.target.value, FIELD_LIMITS.EMAIL) }))}
                      maxLength={FIELD_LIMITS.EMAIL}
                    />
                  </div>
                </div>

                <div className="staff-report-field">
                  <label htmlFor="add-user-phone">
                    Phone <span className="staff-report-optional">(optional)</span>
                  </label>
                  <input
                    id="add-user-phone"
                    type="tel"
                    placeholder="Phone number"
                    value={addForm.phone}
                    onChange={(e) => setAddForm((f) => ({ ...f, phone: clampField(e.target.value, FIELD_LIMITS.PHONE) }))}
                    maxLength={FIELD_LIMITS.PHONE}
                  />
                </div>
              </div>

              <div className="staff-report-section">
                <h3 className="staff-report-section-title">Security</h3>

                <div className="staff-report-field">
                  <label htmlFor="add-user-password">
                    Password <span className="staff-report-required">*</span>
                  </label>
                  <input
                    id="add-user-password"
                    type="password"
                    placeholder={`At least ${FIELD_LIMITS.PASSWORD_MIN} characters`}
                    value={addForm.password}
                    onChange={(e) => setAddForm((f) => ({ ...f, password: clampField(e.target.value, FIELD_LIMITS.PASSWORD_MAX) }))}
                    maxLength={FIELD_LIMITS.PASSWORD_MAX}
                  />
                  <p className="staff-report-hint">The user can sign in with their personal email and this password.</p>
                </div>
              </div>
            </div>

            <div className="admin-form-modal-footer">
              <button type="button" className="staff-report-modal-cancel" onClick={closeAddModal} disabled={saving}>
                Cancel
              </button>
              <button
                type="button"
                className="admin-form-modal-submit"
                onClick={handleAddUser}
                disabled={saving || !addForm.name.trim() || !addForm.personal_email.trim() || !addForm.password}
              >
                {saving ? 'Creating…' : 'Create account →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
