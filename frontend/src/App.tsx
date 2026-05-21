import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { BrowsePage } from './pages/BrowsePage'
import { ItemDetailsPage } from './pages/ItemDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { StaffReportPage } from './pages/StaffReportPage'
import { StaffDashboardPage } from './pages/StaffDashboardPage'
import { StaffItemsPage } from './pages/StaffItemsPage'
import { ClaimPage } from './pages/ClaimPage'
import { MyClaimsPage } from './pages/MyClaimsPage'
import * as api from './services/api'
import { transformBackendItems } from './utils/transformData'

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

  // Fetch items from backend on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.getItems()
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
        <Route path="/" element={<HomePage items={items} />} />
        <Route path="/browse" element={<BrowsePage items={items} />} />
        <Route path="/items/:id" element={<ItemDetailsPage items={items} isSignedIn={isSignedIn} />} />
        <Route path="/items/:itemId/claim" element={<ClaimPage items={items} userName={userName} userEmail={userEmail} />} />
        <Route path="/my-claims" element={<MyClaimsPage items={items} isSignedIn={isSignedIn} />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUpPage onSignUpSuccess={(name) => handleLoginSuccess(name, 'public')} />} />
        <Route path="/staff" element={<StaffDashboardPage items={items} userName={userName} />} />
        <Route path="/staff/items" element={<StaffItemsPage items={items} />} />
        <Route path="/staff/report" element={<StaffReportPage />} />
      </Routes>
    </>
  )
}

export default App
