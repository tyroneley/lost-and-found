import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { BrowsePage } from './pages/BrowsePage'
import { ItemDetailsPage } from './pages/ItemDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'

export interface Item {
  id: number;
  name: string;
  description: string;
  color: string;
  category: string;
  location: string;
  foundAt: string;
  expiry: string;
  status: string;
  image: string;
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userName, setUserName] = useState('')

  const items: Item[] = [
    {
      id: 1,
      name: 'Black laptop bag',
      description: 'A black leather laptop bag with multiple compartments and padded shoulder straps. Found with personal documents inside.',
      color: 'Black',
      category: 'Electronics',
      location: 'Student Lounge',
      foundAt: 'April 21, 2026',
      expiry: 'May 21, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 2,
      name: 'Student ID card',
      description: 'Blue BINUS student ID card with photo. Name visible on card.',
      color: 'Blue',
      category: 'Personal Belonging',
      location: 'Auditorium',
      foundAt: 'April 20, 2026',
      expiry: 'May 20, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 3,
      name: 'Blue water bottle',
      description: 'Stainless steel water bottle with blue exterior and white logo print. Lightly used.',
      color: 'Blue',
      category: 'Personal Belonging',
      location: 'Room 622',
      foundAt: 'April 19, 2026',
      expiry: 'May 19, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 4,
      name: 'Wireless earbuds',
      description: 'White wireless earbuds with charging case. Brand name visible on case.',
      color: 'White',
      category: 'Electronics',
      location: 'Library',
      foundAt: 'April 18, 2026',
      expiry: 'May 18, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
  ]

  const handleLogout = () => {
    setIsSignedIn(false)
    setUserName('')
  }

  const handleLoginSuccess = (name: string) => {
    setUserName(name)
    setIsSignedIn(true)
  }

  return (
    <>
      <Navbar isSignedIn={isSignedIn} userName={userName} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage items={items} />} />
        <Route path="/browse" element={<BrowsePage items={items} />} />
        <Route path="/items/:id" element={<ItemDetailsPage items={items} />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUpPage onSignUpSuccess={handleLoginSuccess} />} />
      </Routes>
    </>
  )
}

export default App
