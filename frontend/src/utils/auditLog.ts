import type { AuditLogAction, AuditLogApiEntry } from '../services/api'

export const AUDIT_ACTION_FILTER_OPTIONS: { value: '' | AuditLogAction; label: string }[] = [
  { value: '', label: 'All actions' },
  { value: 'CREATE', label: 'Item recorded' },
  { value: 'UPDATE', label: 'Item updated' },
  { value: 'DELETE', label: 'Item removed' },
  { value: 'CLAIM', label: 'Claim submitted' },
  { value: 'APPROVE', label: 'Claim approved' },
  { value: 'REJECT', label: 'Claim rejected' },
  { value: 'DEACTIVATE', label: 'Account deactivated' },
  { value: 'REACTIVATE', label: 'Account reactivated' },
]

export function auditActionLabel(entry: AuditLogApiEntry): string {
  const itemName = entry.item?.name ?? 'Item'
  switch (entry.action) {
    case 'CREATE':
      return `New item recorded — ${itemName}`
    case 'UPDATE':
      return `Item updated — ${itemName}`
    case 'DELETE':
      return `Item removed — ${itemName}`
    case 'APPROVE':
      return `Claim approved — ${itemName}`
    case 'REJECT':
      return `Claim rejected — ${itemName}`
    case 'CLAIM':
      return `Claim submitted — ${itemName}`
    case 'DEACTIVATE': {
      const account = entry.target_user?.name ?? 'User'
      return `Account deactivated — ${account}`
    }
    case 'REACTIVATE': {
      const account = entry.target_user?.name ?? 'User'
      return `Account reactivated — ${account}`
    }
    default:
      return `${entry.action} — ${itemName}`
  }
}

export function auditDotColor(action: string): string {
  switch (action) {
    case 'CREATE':
      return '#004a87'
    case 'APPROVE':
    case 'COLLECTED':
      return '#16a34a'
    case 'REJECT':
      return '#dc2626'
    case 'DELETE':
    case 'DEACTIVATE':
      return '#dc2626'
    case 'UPDATE':
      return '#ca8a04'
    case 'REACTIVATE':
      return '#16a34a'
    default:
      return '#5b21b6'
  }
}

export function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return days === 1 ? 'yesterday' : `${days} days ago`
}
