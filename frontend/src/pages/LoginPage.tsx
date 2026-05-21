import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserRole } from '../App'
import { login, storeAuthToken } from '../services/api'

interface LoginPageProps {
  onLoginSuccess: (name: string, email: string, role: UserRole) => void;
}

// Demo accounts for quick testing
const DEMO_ACCOUNTS = [
  { email: 'alex.tan@binus.ac.id', password: 'user@123456', name: 'Alex Tan', role: 'public' as UserRole },
  { email: 'maya.sari@binus.ac.id', password: 'user@123456', name: 'Maya Sari', role: 'staff' as UserRole },
]

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDemoAccounts, setShowDemoAccounts] = useState(true)

  const handleQuickLogin = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setLoading(true)
    setError('')
    try {
      const response = await login(account.email, account.password)
      // Save token for future requests
      storeAuthToken(response.token)
      onLoginSuccess(response.user.name, response.user.email, response.user.role as UserRole)
      if (response.user.role === 'staff' || response.user.role === 'superadmin') {
        navigate('/staff')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await login(email, password)
      // Save token for future requests
      storeAuthToken(response.token)
      onLoginSuccess(response.user.name, response.user.email, response.user.role as UserRole)
      if (response.user.role === 'staff' || response.user.role === 'superadmin') {
        navigate('/staff')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password')
    } finally {
      setLoading(false)
    }
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

            {showDemoAccounts && (
              <div className="test-accounts-section">
                <p className="test-accounts-title">Demo Accounts (Real Database):</p>
                <div className="test-accounts-grid">
                  {DEMO_ACCOUNTS.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      className={`test-account-btn test-account-${account.role}`}
                      onClick={() => handleQuickLogin(account)}
                      disabled={loading}
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
                  onClick={() => setShowDemoAccounts(false)}
                  disabled={loading}
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

                <button type="submit" className="btn btn-auth-primary" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
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
