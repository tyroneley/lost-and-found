import type { StaffClaimObject } from '../types/claims'
import { StatusBadge, claimDotClass } from './StatusBadge'

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

function formatClaimRef(claimId: string): string {
  return `CLM-${claimId.slice(0, 8).toUpperCase()}`
}

interface StaffClaimRowProps {
  claim: StaffClaimObject
  onReview: () => void
}

export function StaffClaimRow({ claim, onReview }: StaffClaimRowProps) {
  const affiliation = claim.claimer_affiliation ? ` · ${claim.claimer_affiliation}` : ''

  return (
    <div
      className="staff-claims-row"
      onClick={onReview}
      onKeyDown={(e) => e.key === 'Enter' && onReview()}
      role="button"
      tabIndex={0}
    >
      <div className={`staff-claims-dot ${claimDotClass(claim.status)}`} />
      <div className="staff-claims-row-body">
        <div className="staff-claims-row-top">
          <div className="staff-claims-row-name">{claim.item_name}</div>
          <StatusBadge status={claim.status} type="claim" />
        </div>
        <div className="staff-claims-row-claimer">
          Claimed by <strong>{claim.claimer_name}</strong> · {claim.claimer_email}
          {affiliation}
        </div>
        <div className="staff-claims-row-desc">{claim.ownership_desc}</div>
        <div className="staff-claims-row-foot">
          <span className="staff-claims-row-ref">{formatClaimRef(claim.claim_id)}</span>
          <span className="staff-claims-row-time">{relativeTime(claim.requested_at)}</span>
          <button
            type="button"
            className="staff-claims-review-btn"
            onClick={(e) => {
              e.stopPropagation()
              onReview()
            }}
          >
            Review →
          </button>
        </div>
      </div>
    </div>
  )
}
