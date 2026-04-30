import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserRole } from '../App'

interface NavbarProps {
  isSignedIn?: boolean;
  userName?: string;
  userRole?: UserRole;
  onLogout?: () => void;
}

export function Navbar({ isSignedIn = false, userName = '', userRole = 'public', onLogout }: NavbarProps) {
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

  const getRoleLabel = (role: UserRole) => {
    const roleLabels: Record<UserRole, string> = {
      public: 'User',
      staff: 'Security Staff',
      superadmin: 'Admin'
    }
    return roleLabels[role]
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

        {/* Desktop Menu - Role-based Navigation */}
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          {!isSignedIn && (
            <>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/browse') }}>Browse Items</a></li>
            </>
          )}
          
          {isSignedIn && userRole === 'public' && (
            <>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/browse') }}>Browse Items</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/my-claims') }}>My Claims</a></li>
            </>
          )}
          
          {isSignedIn && userRole === 'staff' && (
            <>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/staff/dashboard') }}>Dashboard</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/staff/items') }}>Items</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/staff/claims') }}>Claims</a></li>
            </>
          )}
          
          {isSignedIn && userRole === 'superadmin' && (
            <>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/admin/overview') }}>Overview</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/admin/users') }}>Users</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/admin/items') }}>All Items</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/admin/audit') }}>Audit Log</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('/admin/settings') }}>Settings</a></li>
            </>
          )}
        </ul>

        {/* Right Side - Profile Icon or Auth Buttons */}
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
                  Register
                </button>
              )}
            </>
          ) : (
            <div className="navbar-profile-wrapper">
              <div className="navbar-profile-section">
                {(userRole === 'staff' || userRole === 'superadmin') && (
                  <span className={`role-pill role-${userRole}`}>{getRoleLabel(userRole)}</span>
                )}
                <button 
                  className="navbar-profile-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img src="/placeholder.png" alt="Profile" className="profile-icon" />
                </button>
              </div>
              
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
