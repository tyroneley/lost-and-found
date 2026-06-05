import './App.css'
import { useState, useEffect } from 'react'
import { Routes } from 'react-router-dom'
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
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState<UserRole>('public')
  const [items, setItems] = useState<Item[]>([])
  const [, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)

  // Restore login session from localStorage (token + user)
  useEffect(() => {
    const saved = api.loadAuthSession()
    if (saved && localStorage.getItem('auth_token')) {
      setUserName(saved.name)
      setUserEmail(saved.email)
      setUserRole(saved.role)
      setIsSignedIn(true)
    }
  }, [])

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

  const handleLogout = () => {
    api.logout()
    setIsSignedIn(false)
    setUserName('')
    setUserEmail('')
    setUserRole('public')
  }

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
          onSignUpSuccess: (name) => handleLoginSuccess(name, 'public'),
        })}
      </Routes>
    </>
  )
}

export default App
