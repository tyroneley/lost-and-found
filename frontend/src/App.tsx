import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { BrowsePage } from './pages/BrowsePage'
import { ItemDetailsPage } from './pages/ItemDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { StaffReportPage } from './pages/StaffReportPage'

export type UserRole = 'public' | 'staff' | 'superadmin';

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
  const [userRole, setUserRole] = useState<UserRole>('public')

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
      location: 'Room 205',
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
    {
      id: 5,
      name: 'Red backpack',
      description: 'Red canvas backpack with multiple pockets and adjustable straps.',
      color: 'Red',
      category: 'Other',
      location: 'Lobby',
      foundAt: 'April 17, 2026',
      expiry: 'May 17, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 6,
      name: 'Gray jacket',
      description: 'Winter gray jacket size M. Has BINUS logo on sleeve.',
      color: 'Gray',
      category: 'Clothing',
      location: 'Student Lounge',
      foundAt: 'April 16, 2026',
      expiry: 'May 16, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 7,
      name: 'Green sports bag',
      description: 'Green duffel bag with sports equipment inside including tennis racket.',
      color: 'Green',
      category: 'Sports Equipment',
      location: 'Room 612',
      foundAt: 'April 15, 2026',
      expiry: 'May 15, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 8,
      name: 'Black glasses case',
      description: 'Hard black case for eyeglasses with cleaning cloth inside.',
      color: 'Black',
      category: 'Personal Belonging',
      location: 'Photography Room',
      foundAt: 'April 14, 2026',
      expiry: 'May 14, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 9,
      name: 'Blue phone charger',
      description: 'USB-C phone charger with blue cable. Looks relatively new.',
      color: 'Blue',
      category: 'Electronics',
      location: 'Library',
      foundAt: 'April 13, 2026',
      expiry: 'May 13, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 10,
      name: 'White sneakers',
      description: 'White canvas sneakers size 9. Good condition, only lightly worn.',
      color: 'White',
      category: 'Clothing',
      location: 'Room 102',
      foundAt: 'April 12, 2026',
      expiry: 'May 12, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 11,
      name: 'Red notebook',
      description: 'Red hardcover notebook with lined pages. Contains lecture notes inside.',
      color: 'Red',
      category: 'Personal Belonging',
      location: 'Meeting Room',
      foundAt: 'April 11, 2026',
      expiry: 'May 11, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 12,
      name: 'Black tennis racket',
      description: 'Professional black tennis racket with strings intact. Excellent condition.',
      color: 'Black',
      category: 'Sports Equipment',
      location: 'Room 620',
      foundAt: 'April 10, 2026',
      expiry: 'May 10, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 13,
      name: 'Gray laptop stand',
      description: 'Adjustable gray aluminum laptop stand for desk setup.',
      color: 'Gray',
      category: 'Electronics',
      location: 'Library',
      foundAt: 'April 9, 2026',
      expiry: 'May 9, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 14,
      name: 'Green umbrella',
      description: 'Compact green umbrella with auto-open feature.',
      color: 'Green',
      category: 'Other',
      location: 'Sleeping Pods',
      foundAt: 'April 8, 2026',
      expiry: 'May 8, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 15,
      name: 'Blue headphones',
      description: 'Over-ear blue headphones with noise cancellation. Still has warranty sticker.',
      color: 'Blue',
      category: 'Electronics',
      location: 'Auditorium',
      foundAt: 'April 7, 2026',
      expiry: 'May 7, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 16,
      name: 'Black wallet',
      description: 'Leather bifold wallet with multiple card slots. Contains student discount card.',
      color: 'Black',
      category: 'Personal Belonging',
      location: 'Student Lounge',
      foundAt: 'April 6, 2026',
      expiry: 'May 6, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 17,
      name: 'Red sports shoe',
      description: 'Red athletic shoe size 10 with white trim. Nike brand.',
      color: 'Red',
      category: 'Clothing',
      location: 'Room 312',
      foundAt: 'April 5, 2026',
      expiry: 'May 5, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 18,
      name: 'White phone case',
      description: 'Protective white phone case for iPhone 15. Barely used.',
      color: 'White',
      category: 'Electronics',
      location: 'Library',
      foundAt: 'April 4, 2026',
      expiry: 'May 4, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 19,
      name: 'Gray scarf',
      description: 'Wool gray scarf approximately 2 meters long. Soft material.',
      color: 'Gray',
      category: 'Clothing',
      location: 'Lobby',
      foundAt: 'April 3, 2026',
      expiry: 'May 3, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 20,
      name: 'Green water bottle',
      description: 'Eco-friendly green water bottle made from recycled plastic.',
      color: 'Green',
      category: 'Personal Belonging',
      location: 'Room 205',
      foundAt: 'April 2, 2026',
      expiry: 'May 2, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 21,
      name: 'Blue jacket',
      description: 'Light blue windbreaker jacket. Size M. Very clean condition.',
      color: 'Blue',
      category: 'Clothing',
      location: 'Photography Room',
      foundAt: 'April 1, 2026',
      expiry: 'May 1, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 22,
      name: 'Black pen set',
      description: 'Set of 5 black ballpoint pens in original packaging.',
      color: 'Black',
      category: 'Personal Belonging',
      location: 'Room 108',
      foundAt: 'March 31, 2026',
      expiry: 'April 30, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 23,
      name: 'Red sports cap',
      description: 'Red baseball cap with embroidered BINUS logo.',
      color: 'Red',
      category: 'Clothing',
      location: 'Auditorium',
      foundAt: 'March 30, 2026',
      expiry: 'April 29, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 24,
      name: 'Gray backpack',
      description: 'Gray canvas backpack with laptop compartment and USB charging port.',
      color: 'Gray',
      category: 'Other',
      location: 'Student Lounge',
      foundAt: 'March 29, 2026',
      expiry: 'April 28, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 25,
      name: 'Green notebook',
      description: 'Green spiral-bound notebook, half-filled with notes.',
      color: 'Green',
      category: 'Personal Belonging',
      location: 'Room 620',
      foundAt: 'March 28, 2026',
      expiry: 'April 27, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 26,
      name: 'White earbuds case',
      description: 'White protective case for wireless earbuds, empty.',
      color: 'White',
      category: 'Electronics',
      location: 'Library',
      foundAt: 'March 27, 2026',
      expiry: 'April 26, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 27,
      name: 'Blue water bottle (2)',
      description: 'Another blue water bottle, similar style. Capacity 1 liter.',
      color: 'Blue',
      category: 'Personal Belonging',
      location: 'Room 305',
      foundAt: 'March 26, 2026',
      expiry: 'April 25, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 28,
      name: 'Black sneakers',
      description: 'Black canvas sneakers size 8. Adidas brand.',
      color: 'Black',
      category: 'Clothing',
      location: 'Meeting Room',
      foundAt: 'March 25, 2026',
      expiry: 'April 24, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 29,
      name: 'Red mouse',
      description: 'Wireless red mouse with USB receiver. Good battery condition.',
      color: 'Red',
      category: 'Electronics',
      location: 'Room 612',
      foundAt: 'March 24, 2026',
      expiry: 'April 23, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 30,
      name: 'Gray pen holder',
      description: 'Desk organizer with gray color. Multiple compartments for pens and supplies.',
      color: 'Gray',
      category: 'Other',
      location: 'Sleeping Pods',
      foundAt: 'March 23, 2026',
      expiry: 'April 22, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
  ]

  const handleLogout = () => {
    setIsSignedIn(false)
    setUserName('')
    setUserRole('public')
  }

  const handleLoginSuccess = (name: string, role: UserRole = 'public') => {
    setUserName(name)
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
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUpPage onSignUpSuccess={(name) => handleLoginSuccess(name, 'public')} />} />
        <Route path="/staff/report" element={<StaffReportPage />} />
      </Routes>
    </>
  )
}

export default App
