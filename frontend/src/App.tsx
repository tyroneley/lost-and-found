import './App.css'
import { useState, useEffect, useCallback } from 'react'
import { Routes, useNavigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import * as api from './services/api'
import { transformBackendItems } from './utils/transformData'
import { getProtectedRoutes } from './routes/ProtectedRoutes'

export type UserRole = 'public' | 'staff' | 'superadmin';

export interface Finder {
  name: string;
  contact: string;
  affiliation?: string | null;
}

export interface Item {
  item_id: string;
  name: string;
  description: string;
  color: string;
  color_hex: string;
  color_bucket: string;
  category: string;
  found_location: string;
  found_at: string;
  expires_at: string | null;
  building: string;
  foundAt: string;
  expiry: string;
  status: string;
  image: string;
  notes?: string;
  finder: Finder;
  photos: string[];
}

function App() {
  const navigate = useNavigate()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState<UserRole>('public')
  const [items, setItems] = useState<Item[]>([])
  const [, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)

  const handleLogout = useCallback(() => {
    api.logout()
    setIsSignedIn(false)
    setUserName('')
    setUserEmail('')
    setUserRole('public')
  }, [])

  const forceLogoutDeactivated = useCallback(() => {
    handleLogout()
    navigate('/login?deactivated=1', { replace: true })
  }, [handleLogout, navigate])

  const verifySession = useCallback(async () => {
    if (!localStorage.getItem('auth_token')) return

    try {
      const session = await api.getSession()
      if (!session.active) {
        forceLogoutDeactivated()
        return
      }
      setUserName(session.user.name)
      setUserEmail(session.user.email)
      setUserRole(session.user.role)
      setIsSignedIn(true)
      api.storeAuthSession(localStorage.getItem('auth_token')!, {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      })
    } catch {
      handleLogout()
    }
  }, [forceLogoutDeactivated, handleLogout])

  useEffect(() => {
    api.setSessionInvalidatedHandler(forceLogoutDeactivated)
    return () => api.setSessionInvalidatedHandler(null)
  }, [forceLogoutDeactivated])

  // Restore and verify session from backend (not just localStorage)
  useEffect(() => {
    const saved = api.loadAuthSession()
    if (saved && localStorage.getItem('auth_token')) {
      setUserName(saved.name)
      setUserEmail(saved.email)
      setUserRole(saved.role)
      setIsSignedIn(true)
      verifySession()
    }
  }, [verifySession])

  useEffect(() => {
    if (!isSignedIn) return
    const interval = window.setInterval(verifySession, 30_000)
    const onFocus = () => verifySession()
    window.addEventListener('focus', onFocus)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', onFocus)
    }
  }, [isSignedIn, verifySession])

  // Fetch items from backend on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.getItems({ status: 'ACTIVE' })
        // Backend returns { data, total, limit, offset }, extract the data array
        const items = Array.isArray(response) ? response : response.data || []
        // Transform backend format to frontend format
        const transformedItems = transformBackendItems(items)
        setItems(transformedItems)
      } catch (err) {
        console.error('Failed to fetch items:', err)
        setError(err instanceof Error ? err.message : 'Failed to load items')
        // Fall back to empty array - you could also use mock data here
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const handleLoginSuccess = (name: string, email: string, role: UserRole = 'public') => {
    setUserName(name)
    setUserEmail(email)
    setUserRole(role)
    setIsSignedIn(true)
  }

  return (
    <>
      <Navbar isSignedIn={isSignedIn} userName={userName} userRole={userRole} onLogout={handleLogout} />
      <Routes>
        {getProtectedRoutes({
          isSignedIn,
          userRole,
          items,
          userName,
          userEmail,
          isSignedInProp: isSignedIn,
          onLoginSuccess: handleLoginSuccess,
          onSignUpSuccess: handleLoginSuccess,
        })}
      </Routes>
    </>
  )
}

export default App
