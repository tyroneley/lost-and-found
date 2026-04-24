import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavbarProps {
  isSignedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export function Navbar({ isSignedIn = false, userName = '', onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const titleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const handleLogout = () => {
    setProfileOpen(false)
    onLogout?.()
    navigate('/')
  }

  const handleNavClick = (path: string) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Burger Menu Button */}
        <button 
          className={`navbar-burger ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          title="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('/')} style={{cursor: 'pointer'}}>
          <div className="logo">
            <img src="/Logo_Binus_University.png" alt="Binus University" style={{width: '100%', height: '100%'}} />
          </div>
        </div>

        {/* Desktop Menu - only shown on larger screens */}
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/staff/report') }}>Report Lost Item</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/browse') }}>Browse Lost Items</a></li>
          {isSignedIn && <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/my-claims') }}>My Claims</a></li>}
        </ul>

        {/* Right Side - Profile Icon */}
        <div className="navbar-right">
          {!isSignedIn ? (
            <>
              {location.pathname !== '/login' && (
                <button onClick={() => handleNavClick('/login')} className="navbar-btn navbar-btn-login">
                  Log In
                </button>
              )}
              {location.pathname !== '/signup' && (
                <button onClick={() => handleNavClick('/signup')} className="navbar-btn navbar-btn-signup">
                  Sign Up
                </button>
              )}
            </>
          ) : (
            <div className="navbar-profile-wrapper">
              <button 
                className="navbar-profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img src="/placeholder.png" alt="Profile" className="profile-icon" />
              </button>
              
              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    Welcome, <strong>{titleCase(userName)}</strong>
                  </div>
                  <button 
                    className="profile-menu-btn"
                    onClick={() => setProfileOpen(false)}
                  >
                    Settings
                  </button>
                  <button 
                    className="profile-menu-btn"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Account
                  </button>
                  <hr className="profile-dropdown-divider" />
                  <button 
                    className="profile-logout-btn"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
