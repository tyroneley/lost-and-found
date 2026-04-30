import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserRole } from '../App'

interface LoginPageProps {
  onLoginSuccess: (name: string, role: UserRole) => void;
}

// Mock accounts for testing different roles
const MOCK_ACCOUNTS = [
  { email: 'student@binus', password: '123', name: 'John Student', role: 'public' as UserRole },
  { email: 'security@binus', password: '123', name: 'Sir Security', role: 'staff' as UserRole },
  { email: 'admin@binus', password: '123', name: 'Admin User', role: 'superadmin' as UserRole },
]

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showTestAccounts, setShowTestAccounts] = useState(true)

  const handleQuickLogin = (account: typeof MOCK_ACCOUNTS[0]) => {
    onLoginSuccess(account.name, account.role)
    if (account.role === 'staff' || account.role === 'superadmin') {
      navigate('/staff')
    } else {
      navigate('/')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    // Check against mock accounts
    const mockAccount = MOCK_ACCOUNTS.find(acc => acc.email === email && acc.password === password)
    if (mockAccount) {
      onLoginSuccess(mockAccount.name, mockAccount.role)
      if (mockAccount.role === 'staff' || mockAccount.role === 'superadmin') {
        navigate('/staff')
      } else {
        navigate('/')
      }
      return
    }

    // Default mock authentication
    const name = email.split('@')[0].replace(/[._]/g, ' ')
    onLoginSuccess(name, 'public')
    navigate('/')
  }

  return (
    <main>
      <div className="auth-container banner">
        <div className="auth-wrapper">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your Lost & Found account</p>
            </div>

            {showTestAccounts && (
              <div className="test-accounts-section">
                <p className="test-accounts-title">Test Accounts (Mock RBA):</p>
                <div className="test-accounts-grid">
                  {MOCK_ACCOUNTS.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      className={`test-account-btn test-account-${account.role}`}
                      onClick={() => handleQuickLogin(account)}
                    >
                      <div className="test-account-role">{account.role.toUpperCase()}</div>
                      <div className="test-account-name">{account.name}</div>
                      <div className="test-account-email">{account.email}</div>
                    </button>
                  ))}
                </div>
                <button 
                  type="button"
                  className="toggle-test-btn"
                  onClick={() => setShowTestAccounts(false)}
                >
                  Hide
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="auth-error">{error}</div>}
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@binus.ac.id"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError('')
                    }}
                    className="form-input"
                  />
                </div>

                <a href="#" className="forgot-password">Forgot password?</a>

                <button type="submit" className="btn btn-auth-primary">
                  Sign In
                </button>
              </form>

              <div className="auth-divider">
                <span>Don't have an account?</span>
                <a onClick={() => navigate('/signup')} style={{cursor: 'pointer'}}> Register here</a>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
