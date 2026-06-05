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
    navigate('/', { replace: true })
    onLogout?.()
  }

  const handleNavClick = (path: string) => {
    navigate(path)
    setMenuOpen(false)
  }

  const isStaffNavActive = (path: string) => {
    if (path === '/staff') return location.pathname === '/staff'
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const getRoleLabel = (role: UserRole) => {
    const roleLabels: Record<UserRole, string> = {
      public: 'User',
      staff: 'Security Staff',
      superadmin: 'Superadmin'
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
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/browse') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/browse') }}
                >
                  Browse Items
                </a>
              </li>
            </>
          )}
          
          {isSignedIn && userRole === 'public' && (
            <>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/browse') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/browse') }}
                >
                  Browse Items
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/my-claims') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/my-claims') }}
                >
                  My Claims
                </a>
              </li>
            </>
          )}
          
          {isSignedIn && userRole === 'staff' && (
            <>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/staff') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/staff') }}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/staff/items') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/staff/items') }}
                >
                  Items
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/staff/claims') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/staff/claims') }}
                >
                  Claims
                </a>
              </li>
            </>
          )}
          
          {isSignedIn && userRole === 'superadmin' && (
            <>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/admin/overview') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/admin/overview') }}
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/admin/users') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/admin/users') }}
                >
                  Users
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/admin/items') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/admin/items') }}
                >
                  All Items
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/admin/audit') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/admin/audit') }}
                >
                  Audit Log
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={isStaffNavActive('/admin/settings') ? 'navbar-link-active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('/admin/settings') }}
                >
                  Settings
                </a>
              </li>
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
                  <span className="profile-icon profile-icon-initials" aria-hidden="true">
                    {(userName || 'U').charAt(0).toUpperCase()}
                  </span>
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
