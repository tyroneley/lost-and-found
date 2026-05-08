import { useState } from 'react'

interface Claim {
  claim_id: string
  item_id: number
  item_name: string
  item_location: string
  item_found_at: string
  item_category: string
  item_image?: string
  status: 'pending' | 'approved' | 'rejected' | 'collected'
  ownership_desc: string
  staff_notes?: string
  requested_at: string
  approved_at?: string
  rejected_at?: string
  resolved_at?: string
}

interface ClaimCardProps {
  claim: Claim
}

export function ClaimCard({ claim }: ClaimCardProps) {
  const [timelineExpanded, setTimelineExpanded] = useState(false)

  const getStatusColor = (status: Claim['status']): { bg: string; text: string; dot: string } => {
    const colors = {
      pending: { bg: '#fef3c7', text: '#92400e', dot: '#90a4ae' },
      approved: { bg: '#dcfce7', text: '#166534', dot: '#16a34a' },
      rejected: { bg: '#fee2e2', text: '#991b1b', dot: '#c62828' },
      collected: { bg: '#dbeafe', text: '#0c4a6e', dot: '#004a87' },
    }
    return colors[status]
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getStatusLabel = (status: Claim['status']): string => {
    const labels = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      collected: 'Collected',
    }
    return labels[status]
  }

  const getStatusMessage = (claim: Claim): string => {
    switch (claim.status) {
      case 'pending':
        return 'Awaiting review by security staff.'
      case 'approved':
        return 'Approved. Visit security to collect.'
      case 'rejected':
        return 'Claim was rejected. Contact security for details.'
      case 'collected':
        return 'Item collected. Claim closed.'
      default:
        return ''
    }
  }

  const timelineEventCount = [
    claim.approved_at,
    claim.rejected_at,
    claim.resolved_at,
  ].filter(Boolean).length + 1

  const statusColor = getStatusColor(claim.status)

  return (
    <div className="claim-card">
      <div className="claim-card-image">
        {claim.item_image ? (
          <img src={claim.item_image} alt={claim.item_name} />
        ) : (
          <div className="claim-card-image-placeholder"></div>
        )}
      </div>

      <div className="claim-card-header">
        <div className="claim-card-left">
          <h3 className="claim-card-name">{claim.item_name}</h3>
          <p className="claim-card-meta">{claim.item_location} · {claim.item_category}</p>
        </div>
        <span
          className="claim-card-status-badge"
          style={{ background: statusColor.bg, color: statusColor.text }}
        >
          {getStatusLabel(claim.status)}
        </span>
      </div>

      <p className="claim-card-desc">{claim.ownership_desc}</p>

      <div className="claim-card-footer">
        <div className="claim-card-info">
          <span className="claim-card-id">{claim.claim_id}</span>
          <span className="claim-card-date">Submitted {formatDate(claim.requested_at)}</span>
        </div>
        <button
          className="claim-card-expand-btn"
          onClick={() => setTimelineExpanded(!timelineExpanded)}
          title={`View timeline (${timelineEventCount} event${timelineEventCount !== 1 ? 's' : ''})`}
        >
          {timelineExpanded ? '▼' : '▶'} Timeline
        </button>
      </div>

      <div className="claim-card-status-message">{getStatusMessage(claim)}</div>

      {timelineExpanded && (
        <div className="claim-card-timeline">
          <div className="timeline-event">
            <div className="timeline-dot" style={{ background: '#90a4ae' }}></div>
            <div className="timeline-entry">
              <span className="timeline-label">Submitted</span>
              <span className="timeline-date">{formatDate(claim.requested_at)}</span>
            </div>
          </div>
          {claim.approved_at && (
            <div className="timeline-event">
              <div className="timeline-dot" style={{ background: '#16a34a' }}></div>
              <div className="timeline-entry">
                <span className="timeline-label">Approved</span>
                <span className="timeline-date">{formatDate(claim.approved_at)}</span>
              </div>
            </div>
          )}
          {claim.rejected_at && (
            <div className="timeline-event">
              <div className="timeline-dot" style={{ background: '#c62828' }}></div>
              <div className="timeline-entry">
                <span className="timeline-label">Rejected</span>
                <span className="timeline-date">{formatDate(claim.rejected_at)}</span>
              </div>
            </div>
          )}
          {claim.resolved_at && (
            <div className="timeline-event">
              <div className="timeline-dot" style={{ background: '#004a87' }}></div>
              <div className="timeline-entry">
                <span className="timeline-label">Collected</span>
                <span className="timeline-date">{formatDate(claim.resolved_at)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
