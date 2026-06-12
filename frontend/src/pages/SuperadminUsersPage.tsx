import { useState, useEffect, useCallback, useRef } from 'react'
import { createUser, deactivateUser, getUsers, loadAuthSession, reactivateUser } from '../services/api'
import type { ApiUser } from '../services/api'
import { ConfirmationDialog, ConfirmRow } from '../components/ConfirmationDialog'
import { StaffBannerActionBtn, StaffPageBanner } from '../components/StaffPageBanner'
import { AFFILIATION_OPTIONS, allowedRolesForAffiliation, roleForUserAffiliation } from '../utils/affiliation'
import { clampField, FIELD_LIMITS } from '../utils/fieldLimits'

const SEARCH_DEBOUNCE_MS = 350

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

function isUserActive(user: ApiUser): boolean {
  return !user.deleted_at
}

export function SuperadminUsersPage() {
  const currentSession = loadAuthSession()
  const [users, setUsers] = useState<ApiUser[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAddConfirmDialog, setShowAddConfirmDialog] = useState(false)
  const [addForm, setAddForm] = useState(EMPTY_ADD_FORM)
  const [addError, setAddError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [pendingAction, setPendingAction] = useState<{
    user: ApiUser
    action: 'deactivate' | 'reactivate'
  } | null>(null)
  const [actionReason, setActionReason] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [search])

  const loadUsers = useCallback(() => {
    if (isFirstLoad.current) {
      setLoading(true)
    } else {
      setRefreshing(true)
    }
    setLoadError(null)

    getUsers({
      limit: 100,
      q: debouncedSearch || undefined,
      role: roleFilter || undefined,
      status: statusFilter,
    })
      .then((res) => {
        setUsers(res.data ?? [])
        setTotal(res.total ?? res.data?.length ?? 0)
      })
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : 'Failed to load users')
        if (isFirstLoad.current) setUsers([])
      })
      .finally(() => {
        setLoading(false)
        setRefreshing(false)
        isFirstLoad.current = false
      })
  }, [debouncedSearch, roleFilter, statusFilter])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const resetAddModal = () => {
    setAddForm(EMPTY_ADD_FORM)
    setAddError(null)
    setShowAddConfirmDialog(false)
    setShowAddUser(false)
  }

  const closeAddModal = () => {
    if (saving) return
    resetAddModal()
  }

  const validateAddForm = (): string | null => {
    const name = addForm.name.trim()
    const personal_email = addForm.personal_email.trim()
    const password = addForm.password

    if (!name || !personal_email || !password) {
      return 'Name, personal email, and password are required'
    }
    if (password.length < FIELD_LIMITS.PASSWORD_MIN) {
      return `Password must be at least ${FIELD_LIMITS.PASSWORD_MIN} characters`
    }
    return null
  }

  const isAddFormComplete =
    Boolean(addForm.name.trim()) &&
    Boolean(addForm.personal_email.trim()) &&
    addForm.password.length >= FIELD_LIMITS.PASSWORD_MIN

  const handleOpenAddConfirm = () => {
    const validationError = validateAddForm()
    if (validationError) {
      setAddError(validationError)
      return
    }
    setAddError(null)
    setShowAddConfirmDialog(true)
  }

  const handleCancelAddConfirm = () => {
    if (saving) return
    setShowAddConfirmDialog(false)
  }

  const handleAffiliationChange = (affiliation: string) => {
    setAddForm((f) => ({
      ...f,
      affiliation,
      role: roleForUserAffiliation(affiliation, f.role),
    }))
  }

  const roleOptions = allowedRolesForAffiliation(addForm.affiliation)

  const closeStatusDialog = () => {
    setPendingAction(null)
    setActionReason('')
    setActionError(null)
  }

  const cancelStatusDialog = () => {
    if (actionLoading) return
    closeStatusDialog()
  }

  const handleConfirmStatusChange = async () => {
    if (!pendingAction) return

    setActionLoading(true)
    setActionError(null)
    try {
      const reason = actionReason.trim() || undefined
      if (pendingAction.action === 'deactivate') {
        await deactivateUser(pendingAction.user.user_id, reason)
      } else {
        await reactivateUser(pendingAction.user.user_id, reason)
      }
      closeStatusDialog()
      loadUsers()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update account status')
    } finally {
      setActionLoading(false)
    }
  }

  const isCurrentUser = (user: ApiUser) => {
    if (currentSession?.id) return user.user_id === currentSession.id
    return user.personal_email.toLowerCase() === (currentSession?.email?.toLowerCase() ?? '')
  }

  const handleConfirmAddUser = async () => {
    const validationError = validateAddForm()
    if (validationError) {
      setAddError(validationError)
      setShowAddConfirmDialog(false)
      return
    }

    const name = addForm.name.trim()
    const personal_email = addForm.personal_email.trim()
    const password = addForm.password

    setShowAddConfirmDialog(false)
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
        <StaffPageBanner
          title="Users"
          subtitle={`${total} account${total === 1 ? '' : 's'} in the system`}
          action={
            <StaffBannerActionBtn onClick={() => setShowAddUser(true)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 1v10M1 6h10" />
              </svg>
              <span>Add user</span>
            </StaffBannerActionBtn>
          }
        />

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
            <div className="staff-items-filter-group">
              <label className="staff-items-filter-label">Status</label>
              <select
                className="staff-items-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'deactivated')}
              >
                <option value="all">All accounts</option>
                <option value="active">Active only</option>
                <option value="deactivated">Deactivated only</option>
              </select>
            </div>
          </div>

          <div className="staff-card admin-users-table-card">
            <div className="admin-users-table-header">
              <span className="admin-users-col-user">User</span>
              <span className="admin-users-col-role">Role</span>
              <span className="admin-users-col-status">Status</span>
              <span className="admin-users-col-actions">Actions</span>
              {refreshing && <span className="admin-users-refreshing">Updating…</span>}
            </div>

            {loadError && (
              <div className="staff-manage-error" style={{ margin: '1rem' }}>
                {loadError}
              </div>
            )}

            {loading ? (
              <p className="admin-users-table-message">Loading users…</p>
            ) : users.length === 0 ? (
              <p className="admin-users-table-message">No users match your filters</p>
            ) : (
              <div className="admin-users-table-body">
                {users.map((user) => {
                  const active = isUserActive(user)
                  const isSelf = isCurrentUser(user)

                  return (
                    <div key={user.user_id} className="admin-users-table-row">
                      <div className="admin-users-col-user">
                        <div className={`admin-user-avatar admin-user-avatar-${user.role === 'PUBLIC' ? 'public' : 'staff'}`}>
                          {initials(user.name)}
                        </div>
                        <div className="admin-users-user-text">
                          <div className="staff-cr-name">{user.name}</div>
                          <div className="staff-cr-meta">{userMeta(user)}</div>
                        </div>
                      </div>

                      <div className="admin-users-col-role">
                        <span
                          className={`staff-cr-badge ${roleBadgeClass(user.role)}`}
                          style={user.role === 'SUPERADMIN' ? { background: '#ede9fe', color: '#5b21b6' } : undefined}
                        >
                          {userRoleLabel(user.role)}
                        </span>
                      </div>

                      <div className="admin-users-col-status">
                        <span className={`admin-user-status-badge ${active ? 'active' : 'deactivated'}`}>
                          {active ? 'Active' : 'Deactivated'}
                        </span>
                      </div>

                      <div className="admin-users-col-actions">
                        {isSelf ? (
                          <span className="admin-users-self-label">Your account</span>
                        ) : (
                          <button
                            type="button"
                            className={`admin-user-status-btn ${active ? 'deactivate' : 'reactivate'}`}
                            onClick={() => {
                              setActionError(null)
                              setActionReason('')
                              setPendingAction({
                                user,
                                action: active ? 'deactivate' : 'reactivate',
                              })
                            }}
                          >
                            {active ? 'Deactivate' : 'Reactivate'}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showAddConfirmDialog}
        title="Confirm new account"
        sections={[
          {
            title: 'Account details',
            content: (
              <>
                <ConfirmRow label="Full name:" value={addForm.name.trim()} />
                <ConfirmRow label="Affiliation:" value={addForm.affiliation} />
                <ConfirmRow label="Role:" value={ROLE_LABELS[addForm.role]} />
              </>
            ),
          },
          {
            title: 'Contact',
            content: (
              <>
                <ConfirmRow label="Personal email:" value={addForm.personal_email.trim()} />
                {addForm.uni_email.trim() && (
                  <ConfirmRow label="University email:" value={addForm.uni_email.trim()} />
                )}
                {addForm.phone.trim() && (
                  <ConfirmRow label="Phone:" value={addForm.phone.trim()} />
                )}
              </>
            ),
          },
          {
            title: 'Security',
            content: (
              <ConfirmRow
                label="Password:"
                value={`${addForm.password.length} characters (not shown)`}
              />
            ),
          },
        ]}
        onCancel={handleCancelAddConfirm}
        onConfirm={handleConfirmAddUser}
        cancelText="Back to form"
        confirmText={saving ? 'Creating…' : 'Confirm & create account'}
        confirmVariant="primary"
        isConfirmDisabled={saving}
      />

      <ConfirmationDialog
        isOpen={pendingAction !== null}
        title={pendingAction?.action === 'deactivate' ? 'Deactivate account' : 'Reactivate account'}
        sections={[
          {
            title: 'Account',
            content: pendingAction ? (
              <p>
                <strong>{pendingAction.user.name}</strong> ({pendingAction.user.personal_email})
              </p>
            ) : null,
          },
          {
            title: pendingAction?.action === 'deactivate' ? 'What happens' : 'Restore access',
            content:
              pendingAction?.action === 'deactivate' ? (
                <p>
                  This user will be signed out and unable to log in until the account is reactivated.
                  Their claims and history are kept.
                </p>
              ) : (
                <p>This user will be able to sign in and use the system again.</p>
              ),
          },
          {
            title: 'Reason (optional)',
            content: (
              <>
                <textarea
                  className="admin-user-reason-input"
                  placeholder="e.g. Policy violation, duplicate account, requested by user…"
                  value={actionReason}
                  onChange={(e) => setActionReason(clampField(e.target.value, FIELD_LIMITS.STAFF_NOTES))}
                  maxLength={FIELD_LIMITS.STAFF_NOTES}
                  rows={3}
                />
                {actionError && <div className="staff-manage-error" style={{ marginTop: '0.75rem' }}>{actionError}</div>}
              </>
            ),
          },
        ]}
        onCancel={cancelStatusDialog}
        onConfirm={handleConfirmStatusChange}
        cancelText="Cancel"
        confirmText={
          actionLoading
            ? 'Saving…'
            : pendingAction?.action === 'deactivate'
              ? 'Deactivate account'
              : 'Reactivate account'
        }
        confirmVariant={pendingAction?.action === 'deactivate' ? 'reject' : 'approve'}
        isConfirmDisabled={actionLoading}
      />

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
                onClick={handleOpenAddConfirm}
                disabled={saving || !isAddFormComplete}
              >
                {saving ? 'Creating…' : 'Review & create →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
