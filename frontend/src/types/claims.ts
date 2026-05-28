export type ClaimStatusValue = 'pending' | 'approved' | 'rejected' | 'collected'

export interface StaffClaimObject {
  claim_id: string
  item_id: string
  item_name: string
  item_category: string
  item_building: string
  item_room: string
  claimer_id: string
  claimer_name: string
  claimer_email: string
  claimer_phone: string | null
  claimer_affiliation: string | null
  status: ClaimStatusValue
  ownership_desc: string
  staff_notes: string | null
  requested_at: string
  decision_at: string | null
  resolved_at: string | null
  item_image: string
}

export interface AuditLogEntry {
  log_id: string
  action: string
  performed_by: string
  timestamp: string
  notes?: string | null
}

export interface StaffClaimsNavState {
  claimIds: string[]
}
