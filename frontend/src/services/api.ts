
import { Item } from '../App'

// TYPES & INTERFACES

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: 'public' | 'staff' | 'superadmin'
  }
}

export interface Claim {
  claim_id: string
  item_id: string
  status: 'pending' | 'approved' | 'rejected' | 'collected'
  ownership_desc: string
  staff_notes?: string
  requested_at: string
  decision_at?: string
  resolved_at?: string
}

// Config: get the API URL from .env or use localhost for development
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'


// Utils for managing auth tokens

// Get the token we saved after login
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token')
}

// Save the token after user logs in
function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token)
}

// Clear the token when user logs out
function clearAuthToken(): void {
  localStorage.removeItem('auth_token')
}

// Main fetch function - handles headers, auth token, errors, and responses
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`
  
  // Build headers as a proper object
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  // Merge any existing headers from options
  if (options.headers) {
    const existingHeaders = options.headers as Record<string, string>
    Object.assign(headers, existingHeaders)
  }
  
  // If user is logged in, add their token
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })
    
    // If something went wrong, throw an error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as { error?: string; message?: string }
      const msg =
        errorData.error ||
        errorData.message ||
        (typeof errorData === 'object' && errorData !== null && 'issues' in errorData
          ? 'Validation failed — check your input'
          : null) ||
        `HTTP ${response.status}`
      throw new Error(msg)
    }
    
    // All good, return the data
    return await response.json()
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error)
    throw error
  }
}

// Auth stuff - login, signup, tokens

// User tries to log in with email and password
export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

// New user creates an account
export async function register(
  name: string,
  email: string,
  password: string,
  phone?: string,
  uni_email?: string,
  affiliation?: string
): Promise<AuthResponse> {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ 
      name, 
      email, 
      password,
      phone,
      uni_email,
      affiliation,
    }),
  })
}

const AUTH_USER_KEY = 'auth_user'

export interface StoredAuthUser {
  name: string
  email: string
  role: 'public' | 'staff' | 'superadmin'
}

// Log out - clear token and saved user
export function logout(): void {
  clearAuthToken()
  localStorage.removeItem(AUTH_USER_KEY)
}

// After login or signup, save the token and user for session restore
export function storeAuthToken(token: string): void {
  setAuthToken(token)
}

export function storeAuthSession(token: string, user: StoredAuthUser): void {
  setAuthToken(token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function loadAuthSession(): StoredAuthUser | null {
  const raw = localStorage.getItem(AUTH_USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredAuthUser
  } catch {
    return null
  }
}

// Item stuff - browse, view, create, manage lost items

const COLOR_API_VALUES: Record<string, string> = {
  Gray: 'GRAY',
  Grey: 'GRAY',
  Black: 'BLACK',
  White: 'WHITE',
  Red: 'RED',
  Orange: 'ORANGE',
  Yellow: 'YELLOW',
  Green: 'GREEN',
  Cyan: 'CYAN',
  Blue: 'BLUE',
  Purple: 'PURPLE',
  Pink: 'PINK',
  Brown: 'BROWN',
}

function normalizeColorFilter(color: string): string {
  return COLOR_API_VALUES[color] ?? color.toUpperCase()
}

// Get all items, with optional filters (q, category, color, status)
export async function getItems(filters?: {
  q?: string
  category?: string
  color?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<PaginatedResponse<Item>> {
  const queryParams = new URLSearchParams()

  if (filters) {
    if (filters.q) queryParams.append('q', filters.q)
    if (filters.category) queryParams.append('category', filters.category)
    if (filters.color) queryParams.append('color', normalizeColorFilter(filters.color))
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.limit) queryParams.append('limit', String(filters.limit))
    if (filters.offset) queryParams.append('offset', String(filters.offset))
  }
  
  const endpoint = `/items${queryParams.toString() ? '?' + queryParams.toString() : ''}`
  return apiFetch(endpoint)
}

// Get details for one specific item
export async function getItemById(id: string): Promise<Item> {
  return apiFetch(`/items/${id}`)
}

// Report a new lost item
export async function createItem(itemData: Partial<Item>): Promise<Item> {
  return apiFetch('/items', {
    method: 'POST',
    body: JSON.stringify(itemData),
  })
}

// Update item info (description, location, etc.)
export async function updateItem(
  id: string,
  updates: Partial<Item>
): Promise<Item> {
  return apiFetch(`/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })
}

// Change item status (active, claimed, returned, expired, etc.)
export async function updateItemStatus(
  id: string,
  status: string
): Promise<Item> {
  return apiFetch(`/items/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

// Remove an item from the system
export async function deleteItem(id: string): Promise<void> {
  return apiFetch(`/items/${id}`, { method: 'DELETE' })
}

// Claim stuff - submit, view, and manage claims

// User says "this item is mine!" and submits proof
export async function claimItem(
  itemId: string,
  ownershipDesc: string
): Promise<Claim> {
  return apiFetch('/claims', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
      ownership_desc: ownershipDesc,
    }),
  })
}

// Get all the claims the logged-in user submitted
export async function getUserClaims(): Promise<PaginatedResponse<Claim>> {
  return apiFetch('/user/claims')
}

export interface Notification {
  notification_id: string
  type: 'CLAIM_SUBMITTED' | 'CLAIM_APPROVED' | 'CLAIM_REJECTED' | 'CLAIM_COLLECTED'
  title: string
  message: string
  claim_id?: string | null
  read_at?: string | null
  created_at: string
}

export async function getNotifications(filters?: {
  limit?: number
  offset?: number
}): Promise<PaginatedResponse<Notification>> {
  const queryParams = new URLSearchParams()
  if (filters?.limit) queryParams.append('limit', String(filters.limit))
  if (filters?.offset) queryParams.append('offset', String(filters.offset))
  const qs = queryParams.toString()
  return apiFetch(`/notifications${qs ? `?${qs}` : ''}`)
}

export async function getUnreadNotificationCount(): Promise<{ count: number }> {
  return apiFetch('/notifications/unread-count')
}

export async function markNotificationRead(notificationId: string): Promise<Notification> {
  return apiFetch(`/notifications/${notificationId}/read`, { method: 'PATCH' })
}

export async function markAllNotificationsRead(): Promise<{ updated: number }> {
  return apiFetch('/notifications/read-all', { method: 'PATCH' })
}

// Get all claims in the system (staff/admin only)
export async function getAllClaims(filters?: {
  limit?: number
  status?: string
  category?: string
  search?: string
  item_id?: string
}): Promise<PaginatedResponse<Claim>> {
  const queryParams = new URLSearchParams()
  if (filters?.limit) queryParams.append('limit', String(filters.limit))
  if (filters?.status) queryParams.append('status', filters.status.toUpperCase())
  if (filters?.category) queryParams.append('category', filters.category)
  if (filters?.search) queryParams.append('search', filters.search)
  if (filters?.item_id) queryParams.append('item_id', filters.item_id)
  const qs = queryParams.toString()
  return apiFetch(`/claims${qs ? `?${qs}` : ''}`)
}

export async function getClaimById(claimId: string): Promise<unknown> {
  return apiFetch(`/claims/${claimId}`)
}

export async function patchClaimStatus(
  claimId: string,
  status: 'APPROVED' | 'REJECTED' | 'COLLECTED',
  staffNotes?: string
): Promise<unknown> {
  return apiFetch(`/claims/${claimId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
      ...(staffNotes !== undefined ? { staff_notes: staffNotes } : {}),
    }),
  })
}

export interface AuditLogApiEntry {
  log_id: string
  action: string
  created_at: string
  notes?: string | null
  old_status?: string | null
  new_status?: string | null
  user?: { name: string }
  item?: { name: string }
}

export type AuditLogAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'APPROVE'
  | 'REJECT'
  | 'CLAIM'

export type AuditLogSort = 'newest' | 'oldest'

export async function getAuditLog(filters?: {
  item_id?: string
  limit?: number
  offset?: number
  action?: AuditLogAction
  q?: string
  sort?: AuditLogSort
  from?: string
  to?: string
}): Promise<{ data: AuditLogApiEntry[]; total?: number }> {
  const queryParams = new URLSearchParams()
  if (filters?.item_id) queryParams.append('item_id', filters.item_id)
  if (filters?.limit) queryParams.append('limit', String(filters.limit))
  if (filters?.offset) queryParams.append('offset', String(filters.offset))
  if (filters?.action) queryParams.append('action', filters.action)
  if (filters?.q) queryParams.append('q', filters.q)
  if (filters?.sort) queryParams.append('sort', filters.sort)
  if (filters?.from) queryParams.append('from', filters.from)
  if (filters?.to) queryParams.append('to', filters.to)
  const qs = queryParams.toString()
  return apiFetch(`/audit-log${qs ? `?${qs}` : ''}`)
}

// Staff approves a user's claim - they can now collect the item
export async function approveClaim(claimId: string): Promise<Claim> {
  return apiFetch(`/claims/${claimId}/approve`, {
    method: 'POST',
  })
}

// Staff denies a claim - user loses it or needs to provide more proof
export async function rejectClaim(
  claimId: string,
  reason?: string
): Promise<Claim> {
  return apiFetch(`/claims/${claimId}/reject`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  })
}

// Upload a photo file for an item (multipart)
export async function uploadItemPhoto(itemId: string, file: File): Promise<void> {
  const token = getAuthToken()
  const headers: Record<string, string> = {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/items/${itemId}/photos/upload`, {
    method: 'POST',
    headers,
    body: formData,
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || `Photo upload failed: HTTP ${response.status}`)
  }
}

// Category stuff - get available item categories for filtering

export async function getCategories(): Promise<any[]> {
  return apiFetch('/categories')
}

export async function createCategory(data: { name: string; description?: string }): Promise<any> {
  return apiFetch('/categories', { method: 'POST', body: JSON.stringify(data) })
}

export async function updateCategory(id: string, data: { name?: string; description?: string }): Promise<any> {
  return apiFetch(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteCategory(id: string): Promise<void> {
  return apiFetch(`/categories/${id}`, { method: 'DELETE' })
}

export interface ReferenceUsage {
  totalItems: number
  activeItems: number
  roomCount?: number
  canDelete: boolean
  blockReason?: string
}

export async function getCategoryUsage(id: string): Promise<ReferenceUsage> {
  return apiFetch(`/categories/${id}/usage`)
}

// Building & room management

export async function getBuildings(): Promise<any[]> {
  return apiFetch('/buildings')
}

export async function createBuilding(data: { name: string; address?: string }): Promise<any> {
  return apiFetch('/buildings', { method: 'POST', body: JSON.stringify(data) })
}

export async function updateBuilding(id: string, data: { name?: string; address?: string }): Promise<any> {
  return apiFetch(`/buildings/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteBuilding(id: string): Promise<void> {
  return apiFetch(`/buildings/${id}`, { method: 'DELETE' })
}

export async function getBuildingUsage(id: string): Promise<ReferenceUsage> {
  return apiFetch(`/buildings/${id}/usage`)
}

export async function createRoom(buildingId: string, data: { room_name: string; room_number?: number }): Promise<any> {
  return apiFetch(`/buildings/${buildingId}/rooms`, { method: 'POST', body: JSON.stringify(data) })
}

export async function updateRoom(roomId: string, data: { room_name?: string; room_number?: number | null }): Promise<any> {
  return apiFetch(`/buildings/rooms/${roomId}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteRoom(roomId: string): Promise<void> {
  return apiFetch(`/buildings/rooms/${roomId}`, { method: 'DELETE' })
}

export async function getRoomUsage(roomId: string): Promise<ReferenceUsage> {
  return apiFetch(`/buildings/rooms/${roomId}/usage`)
}

// User management (staff / superadmin)

export interface ApiUser {
  user_id: string
  name: string
  phone?: string | null
  personal_email: string
  uni_email?: string | null
  role: 'PUBLIC' | 'STAFF' | 'SUPERADMIN'
  affiliation?: string | null
  created_at: string
}

export async function getUsers(filters?: {
  limit?: number
  offset?: number
  role?: string
  q?: string
}): Promise<PaginatedResponse<ApiUser>> {
  const queryParams = new URLSearchParams()
  if (filters?.limit) queryParams.append('limit', String(filters.limit))
  if (filters?.offset) queryParams.append('offset', String(filters.offset))
  if (filters?.role) queryParams.append('role', filters.role.toUpperCase())
  if (filters?.q) queryParams.append('q', filters.q)
  const qs = queryParams.toString()
  return apiFetch(`/users${qs ? `?${qs}` : ''}`)
}

export async function createUser(data: {
  name: string
  personal_email: string
  password: string
  phone?: string
  uni_email?: string
  role?: ApiUser['role']
  affiliation?: string
}): Promise<ApiUser> {
  return apiFetch('/users', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      role: data.role ?? 'PUBLIC',
    }),
  })
}

// Error handling - deal with problems gracefully

// Check if the backend server is even running
export async function isApiAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, { method: 'GET' })
    return response.ok
  } catch {
    return false
  }
}

// Convert error objects into messages we can show to users
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
