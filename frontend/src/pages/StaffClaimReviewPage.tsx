import { useState, useEffect, useMemo, type ReactNode } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  getClaimById,
  getItemById,
  getAllClaims,
  patchClaimStatus,
  getAuditLog,
} from '../services/api'
import {
  transformBackendStaffClaim,
  transformBackendStaffClaims,
  transformBackendItem,
} from '../utils/transformData'
import type { StaffClaimObject, StaffClaimsNavState, AuditLogEntry } from '../types/claims'
import { Item } from '../App'
import { StatusBadge } from '../components/StatusBadge'
import { useStaffToast } from '../components/StaffToast'

function formatClaimRef(claimId: string): string {
  return `CLM-${claimId.slice(0, 8).toUpperCase()}`
}

function formatDateTime(isoDate: string): string {
  const d = new Date(isoDate)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function auditActionLabel(action: string): string {
  const labels: Record<string, string> = {
    CREATE: 'Item recorded',
    UPDATE: 'Item updated',
    DELETE: 'Item deleted',
    APPROVE: 'Claim approved',
    REJECT: 'Claim rejected',
    CLAIM: 'Claim submitted',
  }
  return labels[action] ?? action
}

function KeyValueCard({
  title,
  badge,
  rows,
}: {
  title: string
  badge?: React.ReactNode
  rows: { label: string; value: ReactNode }[]
}) {
  return (
    <div className="staff-claims-detail-card">
      <div className="staff-claims-detail-card-head">
        <span className="staff-claims-detail-card-title">{title}</span>
        {badge}
      </div>
      {rows.map((row) => (
        <div key={row.label} className="staff-claims-kv-row">
          <span className="staff-claims-kv-key">{row.label}</span>
          <span className="staff-claims-kv-val">{row.value}</span>
        </div>
      ))}
    </div>
  )
}

export function StaffClaimReviewPage() {
  const { claim_id } = useParams<{ claim_id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const navState = location.state as StaffClaimsNavState | null
  const { showSuccess, showError, Toast } = useStaffToast()

  const [claim, setClaim] = useState<StaffClaimObject | null>(null)
  const [item, setItem] = useState<Item | null>(null)
  const [history, setHistory] = useState<AuditLogEntry[]>([])
  const [otherClaims, setOtherClaims] = useState<StaffClaimObject[]>([])
  const [loading, setLoading] = useState(true)
  const [staffNotes, setStaffNotes] = useState('')
  const [rejectError, setRejectError] = useState('')
  const [actionLoading, setActionLoading] = useState<'approve' | 'collect' | 'reject' | null>(null)

  useEffect(() => {
    if (!claim_id) return
    setLoading(true)
    setRejectError('')

    getClaimById(claim_id)
      .then(async (raw) => {
        const transformed = transformBackendStaffClaim(raw)
        setClaim(transformed)
        setStaffNotes(transformed.staff_notes ?? '')

        const [itemRaw, auditRes, otherRes] = await Promise.all([
          getItemById(transformed.item_id),
          getAuditLog(transformed.item_id).catch(() => ({ data: [] })),
          getAllClaims({ item_id: transformed.item_id, limit: 100 }).catch(() => ({ data: [] })),
        ])

        setItem(transformBackendItem(itemRaw))

        const auditEntries: AuditLogEntry[] = (auditRes.data ?? []).map((log) => ({
          log_id: log.log_id,
          action: log.action,
          performed_by: log.user?.name ?? 'System',
          timestamp: log.created_at,
          notes: log.notes,
        }))

        const claimSubmitted: AuditLogEntry = {
          log_id: `claim-${transformed.claim_id}`,
          action: 'CLAIM',
          performed_by: transformed.claimer_name,
          timestamp: transformed.requested_at,
        }

        setHistory(
          [claimSubmitted, ...auditEntries].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        )

        const others = Array.isArray(otherRes) ? otherRes : otherRes.data ?? []
        setOtherClaims(
          transformBackendStaffClaims(others).filter((c) => c.claim_id !== claim_id)
        )
      })
      .catch(() => setClaim(null))
      .finally(() => setLoading(false))
  }, [claim_id])

  const claimIds = navState?.claimIds ?? []
  const currentIndex = claim_id ? claimIds.indexOf(claim_id) : -1
  const prevId = currentIndex > 0 ? claimIds[currentIndex - 1] : null
  const nextId = currentIndex >= 0 && currentIndex < claimIds.length - 1 ? claimIds[currentIndex + 1] : null

  const goToClaim = (id: string) => {
    navigate(`/staff/claims/${id}`, { state: navState, replace: true })
  }

  const runAction = async (
    status: 'APPROVED' | 'REJECTED' | 'COLLECTED',
    actionKey: 'approve' | 'collect' | 'reject'
  ) => {
    if (!claim_id || !claim) return

    if (actionKey === 'reject' && !staffNotes.trim()) {
      setRejectError('Please add a rejection reason.')
      return
    }
    setRejectError('')
    setActionLoading(actionKey)

    try {
      const raw = await patchClaimStatus(
        claim_id,
        status,
        actionKey === 'reject' ? staffNotes.trim() : staffNotes.trim() || undefined
      )
      const updated = transformBackendStaffClaim(raw)
      setClaim(updated)

      const label =
        status === 'APPROVED' ? 'approved' : status === 'REJECTED' ? 'rejected' : 'collected'
      showSuccess(`Claim ${label}`)

      if (actionKey === 'collect' || actionKey === 'reject') {
        window.setTimeout(() => navigate('/staff/claims'), 1500)
      }
    } catch {
      showError('Something went wrong — please try again')
    } finally {
      setActionLoading(null)
    }
  }

  const approveDisabled = useMemo(() => {
    if (!claim) return true
    return claim.status !== 'pending' || actionLoading !== null
  }, [claim, actionLoading])

  const collectDisabled = useMemo(() => {
    if (!claim) return true
    return claim.status !== 'approved' || actionLoading !== null
  }, [claim, actionLoading])

  const rejectDisabled = useMemo(() => {
    if (!claim) return true
    return claim.status !== 'pending' || actionLoading !== null
  }, [claim, actionLoading])

  if (loading) {
    return (
      <main className="item-detail-main staff-claims-review-main">
        <div className="item-detail-wrapper">
          <p className="staff-claims-loading-text">Loading claim…</p>
        </div>
      </main>
    )
  }

  if (!claim) {
    return (
      <main className="item-detail-main staff-claims-review-main">
        <div className="item-detail-wrapper staff-claims-empty">
          <p>Claim not found</p>
          <button type="button" className="btn btn-primary-dark" onClick={() => navigate('/staff/claims')}>
            Back to claims
          </button>
        </div>
      </main>
    )
  }

  const itemLocation = `${claim.item_building}, ${claim.item_room}`
  const itemFoundDate = item ? item.foundAt : 'N/A'

  return (
    <main className="item-detail-main staff-claims-review-main">
      <Toast />
      <div className="item-detail-wrapper">
        <div className="staff-report-breadcrumb staff-claims-breadcrumb">
          <button type="button" onClick={() => navigate('/staff/claims')} className="staff-report-breadcrumb-link">
            Claims
          </button>
          <span> / {formatClaimRef(claim.claim_id)}</span>
        </div>

        <div className="item-detail-layout staff-claims-review-layout">
          <div className="staff-claims-review-left">
            <KeyValueCard
              title="Claim details"
              badge={<StatusBadge status={claim.status} type="claim" />}
              rows={[
                { label: 'Claim ID', value: <span className="staff-claims-mono">{formatClaimRef(claim.claim_id)}</span> },
                { label: 'Submitted', value: formatDateTime(claim.requested_at) },
                { label: 'Name', value: claim.claimer_name },
                { label: 'Email', value: claim.claimer_email },
                { label: 'Phone', value: claim.claimer_phone ?? '—' },
                { label: 'Affiliation', value: claim.claimer_affiliation ?? '—' },
              ]}
            />

            <div className="staff-claims-detail-card">
              <div className="staff-claims-detail-card-head">
                <span className="staff-claims-detail-card-title">Item being claimed</span>
              </div>
              <div className="staff-claims-item-strip">
                <div className="staff-claims-item-thumb">
                  {claim.item_image ? (
                    <img src={claim.item_image} alt="" />
                  ) : null}
                </div>
                <div>
                  <div className="staff-claims-item-name">{claim.item_name}</div>
                  <div className="staff-claims-item-meta">
                    {itemLocation} · Found {itemFoundDate} · {claim.item_category}
                  </div>
                  <button
                    type="button"
                    className="staff-claims-item-link"
                    onClick={() => navigate(`/staff/items/${claim.item_id}`)}
                  >
                    View item listing →
                  </button>
                </div>
              </div>
            </div>

            <div className="staff-claims-detail-card">
              <div className="staff-claims-detail-card-head">
                <span className="staff-claims-detail-card-title">Ownership description</span>
              </div>
              <div className="staff-claims-desc-box">
                <div className="staff-claims-desc-text">{claim.ownership_desc}</div>
              </div>
            </div>

            <div className="staff-claims-detail-card">
              <div className="staff-claims-detail-card-head">
                <span className="staff-claims-detail-card-title">Claim history</span>
              </div>
              {history.length === 0 ? (
                <p className="staff-claims-history-empty">No history recorded</p>
              ) : (
                history.map((entry) => (
                  <div key={entry.log_id} className="staff-claims-history-row">
                    <div className="staff-claims-history-dot" />
                    <div>
                      <div className="staff-claims-history-action">
                        {auditActionLabel(entry.action)}
                        {entry.performed_by ? ` · ${entry.performed_by}` : ''}
                      </div>
                      <div className="staff-claims-history-time">{formatDateTime(entry.timestamp)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="item-detail-sidebar staff-claims-review-sidebar">
            <div className="item-detail-card staff-claims-action-card">
              <div className="item-detail-card-title">Take action</div>
              <div className="staff-claims-action-body">
                <button
                  type="button"
                  className="btn btn-primary-dark staff-claims-action-btn"
                  disabled={approveDisabled}
                  onClick={() => runAction('APPROVED', 'approve')}
                >
                  {actionLoading === 'approve' ? 'Updating…' : 'Approve claim'}
                </button>

                <button
                  type="button"
                  className="btn staff-claims-action-btn staff-claims-btn-collect"
                  disabled={collectDisabled}
                  onClick={() => runAction('COLLECTED', 'collect')}
                >
                  {actionLoading === 'collect' ? 'Updating…' : 'Mark as collected'}
                </button>

                <label className="staff-claims-notes-label" htmlFor="staff-notes">
                  Staff notes
                </label>
                <textarea
                  id="staff-notes"
                  className="form-input staff-claims-notes"
                  placeholder="Notes are sent to the claimant when rejecting."
                  value={staffNotes}
                  onChange={(e) => {
                    setStaffNotes(e.target.value)
                    if (rejectError) setRejectError('')
                  }}
                />
                {rejectError && <p className="staff-claims-reject-error">{rejectError}</p>}

                <button
                  type="button"
                  className="btn staff-claims-action-btn staff-claims-btn-reject"
                  disabled={rejectDisabled}
                  onClick={() => runAction('REJECTED', 'reject')}
                >
                  {actionLoading === 'reject' ? 'Updating…' : 'Reject claim'}
                </button>
              </div>
            </div>

            <div className="item-detail-card">
              <div className="item-detail-card-title">Other claims on this item</div>
              <div className="staff-claims-other-body">
                {otherClaims.length === 0 ? (
                  <p className="staff-claims-muted">No other claims on this item.</p>
                ) : (
                  <>
                    <p className="staff-claims-other-count">
                      {otherClaims.length} other claim{otherClaims.length !== 1 ? 's' : ''}
                    </p>
                    <ul className="staff-claims-other-list">
                      {otherClaims.map((oc) => (
                        <li key={oc.claim_id}>
                          <span>{oc.claimer_name}</span>
                          <StatusBadge status={oc.status} type="claim" />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {claimIds.length > 1 && (
              <div className="item-detail-card">
                <div className="item-detail-card-title">Navigate claims</div>
                <div className="staff-claims-nav-pair">
                  <button
                    type="button"
                    className="staff-claims-nav-btn"
                    disabled={!prevId}
                    onClick={() => prevId && goToClaim(prevId)}
                  >
                    ‹ Previous
                  </button>
                  <button
                    type="button"
                    className="staff-claims-nav-btn"
                    disabled={!nextId}
                    onClick={() => nextId && goToClaim(nextId)}
                  >
                    Next ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
