import { Item } from '../App'
import { API_URL, Claim } from '../services/api'
import type { StaffClaimObject } from '../types/claims'

export type TransformedClaim = Claim & { item_name: string }

/**
 * Format room display based on room_number and room_name
 * Logic: if room_number exists and room_name adds context → show both (e.g. '601 — Auditorium')
 *        if room_number only → show number
 *        if no room_number → show room_name only (e.g. 'Student Lounge')
 */
export function formatRoomDisplay(room: any): string {
  if (!room) return 'Unknown'
  
  if (room.room_number && room.room_name) {
    return `${room.room_number} — ${room.room_name}`
  } else if (room.room_number) {
    return String(room.room_number)
  } else if (room.room_name) {
    return room.room_name
  }
  return 'Unknown'
}

/**
 * Transform backend Item response to frontend Item format
 * Backend uses UUID strings for IDs, frontend uses strings (no conversion needed)
 */
export function transformBackendItem(backendItem: any): Item {
  const photos: string[] = backendItem.photos?.map((p: any) =>
    p.storage_url.startsWith('http') ? p.storage_url : `${API_URL}${p.storage_url}`
  ) ?? []

  return {
    item_id: backendItem.item_id || '',
    name: backendItem.name,
    description: backendItem.description || '',
    color: backendItem.color_bucket || 'Unknown',
    color_hex: backendItem.color_hex || '#000000',
    color_bucket: backendItem.color_bucket || 'Unknown',
    category: backendItem.category?.name || 'Other',
    found_location: formatRoomDisplay(backendItem.room),
    found_at: backendItem.found_at || new Date().toISOString(),
    expires_at: backendItem.expires_at || null,
    building: backendItem.building?.name || 'Unknown',
    foundAt: formatDate(backendItem.found_at),
    expiry: backendItem.expires_at ? formatDate(backendItem.expires_at) : 'N/A',
    status: mapItemStatus(backendItem.status),
    image: photos[0] || '',
    notes: backendItem.description || '',
    finder: {
      name: backendItem.finder_name || backendItem.recorder?.name || 'Unknown',
      contact: backendItem.finder_contact || backendItem.recorder?.personal_email || 'N/A',
      affiliation: backendItem.finder_affiliation || backendItem.recorder?.affiliation || null,
    },
    photos,
  }
}

/**
 * Map backend ItemStatus enum to frontend status display
 */
function mapItemStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'ACTIVE': 'Active',
    'CLAIMED': 'Claimed',
    'COLLECTED': 'Collected',
    'PENDING': 'Pending',
    'RETURNED': 'Returned',
  }
  return statusMap[status] || status
}

/**
 * Format ISO datetime to readable date
 */
function formatDate(isoDate: string | Date): string {
  if (!isoDate) return 'N/A'
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Transform multiple backend items to frontend format
 */
export function transformBackendItems(items: any[]): Item[] {
  return items.map((item) => transformBackendItem(item))
}

/**
 * Transform backend claim (includes nested item) to frontend format
 */
export function transformBackendClaim(backendClaim: any): TransformedClaim {
  return {
    claim_id: backendClaim.claim_id,
    item_id: backendClaim.item_id,
    item_name: backendClaim.item?.name || 'Unknown item',
    status: backendClaim.status.toLowerCase() as Claim['status'],
    ownership_desc: backendClaim.ownership_desc,
    staff_notes: backendClaim.staff_notes,
    requested_at: backendClaim.requested_at,
    decision_at: backendClaim.decision_at,
    resolved_at: backendClaim.resolved_at,
  }
}

export function transformBackendClaims(claims: any[]): TransformedClaim[] {
  return claims.map((claim) => transformBackendClaim(claim))
}

function itemPhotosFromBackend(item: any): string[] {
  return item?.photos?.map((p: any) =>
    p.storage_url.startsWith('http') ? p.storage_url : `${API_URL}${p.storage_url}`
  ) ?? []
}

export function transformBackendStaffClaim(backendClaim: any): StaffClaimObject {
  const item = backendClaim.item
  const claimer = backendClaim.claimer
  const photos = itemPhotosFromBackend(item)

  return {
    claim_id: backendClaim.claim_id,
    item_id: backendClaim.item_id,
    item_name: item?.name ?? 'Unknown item',
    item_category: item?.category?.name ?? 'Other',
    item_building: item?.building?.name ?? 'Unknown',
    item_room: formatRoomDisplay(item?.room),
    claimer_id: backendClaim.claimer_id,
    claimer_name: claimer?.name ?? 'Unknown',
    claimer_email: claimer?.personal_email ?? claimer?.uni_email ?? 'N/A',
    claimer_phone: claimer?.phone ?? null,
    claimer_affiliation: claimer?.affiliation ?? null,
    status: backendClaim.status.toLowerCase() as StaffClaimObject['status'],
    ownership_desc: backendClaim.ownership_desc ?? '',
    staff_notes: backendClaim.staff_notes ?? null,
    requested_at: backendClaim.requested_at,
    decision_at: backendClaim.decision_at ?? null,
    resolved_at: backendClaim.resolved_at ?? null,
    item_image: photos[0] ?? '',
  }
}

export function transformBackendStaffClaims(claims: any[]): StaffClaimObject[] {
  return claims.map((claim) => transformBackendStaffClaim(claim))
}
