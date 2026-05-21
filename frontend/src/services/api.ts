
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
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}`)
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

// Log out - just clear the saved token
export function logout(): void {
  clearAuthToken()
}

// After login or signup, save the token they gave us
export function storeAuthToken(token: string): void {
  setAuthToken(token)
}

// Item stuff - browse, view, create, manage lost items

// Get all items, with optional filters (search, category, color, location, status)
export async function getItems(filters?: {
  search?: string
  category?: string
  color?: string
  location?: string
  status?: string
  limit?: number
}): Promise<PaginatedResponse<Item>> {
  const queryParams = new URLSearchParams()

  if (filters) {
    if (filters.search) queryParams.append('search', filters.search)
    if (filters.category) queryParams.append('category', filters.category)
    if (filters.color) queryParams.append('color', filters.color)
    if (filters.location) queryParams.append('location', filters.location)
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.limit) queryParams.append('limit', String(filters.limit))
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

// Get all claims in the system (staff/admin only)
export async function getAllClaims(): Promise<PaginatedResponse<Claim>> {
  return apiFetch('/claims')
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

// Get list of all available item categories
export async function getCategories(): Promise<any[]> {
  return apiFetch('/categories')
}

// Get list of all available buildings
export async function getBuildings(): Promise<any[]> {
  return apiFetch('/buildings')
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
