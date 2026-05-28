import type { ClaimStatusValue } from '../types/claims'

type BadgeKind = 'claim' | 'item'

interface StatusBadgeProps {
  status: string
  type?: BadgeKind
}

const CLAIM_CLASS: Record<ClaimStatusValue, string> = {
  pending: 'staff-claims-badge-pending',
  approved: 'staff-claims-badge-approved',
  rejected: 'staff-claims-badge-rejected',
  collected: 'staff-claims-badge-collected',
}

const CLAIM_LABEL: Record<ClaimStatusValue, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  collected: 'Collected',
}

export function StatusBadge({ status, type = 'claim' }: StatusBadgeProps) {
  if (type === 'item') {
    const normalized = status.toLowerCase().replace(/\s+/g, '-')
    return (
      <span className={`staff-items-status-badge staff-items-status-${normalized}`}>
        {status}
      </span>
    )
  }

  const key = status.toLowerCase() as ClaimStatusValue
  const className = CLAIM_CLASS[key] ?? 'staff-claims-badge-pending'
  const label = CLAIM_LABEL[key] ?? status

  return <span className={`staff-claims-badge ${className}`}>{label}</span>
}

export function claimDotClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'staff-claims-dot-approved'
    case 'rejected':
      return 'staff-claims-dot-rejected'
    case 'collected':
      return 'staff-claims-dot-collected'
    default:
      return 'staff-claims-dot-pending'
  }
}
