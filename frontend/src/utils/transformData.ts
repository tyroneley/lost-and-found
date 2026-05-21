import { Item } from '../App'
import { API_URL } from '../services/api'

/**
 * Format room display based on room_number and room_name
 * Logic: if room_number exists and room_name adds context → show both (e.g. '601 — Auditorium')
 *        if room_number only → show number
 *        if no room_number → show room_name only (e.g. 'Student Lounge')
 */
function formatRoomDisplay(room: any): string {
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
    image: photos[0] || '/placeholder.png',
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
    'CLAIMED': 'Pending Verification',
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
