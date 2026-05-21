import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserRole } from '../App'
import { login, storeAuthToken } from '../services/api'

interface LoginPageProps {
  onLoginSuccess: (name: string, email: string, role: UserRole) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
