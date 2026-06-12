import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserRole } from '../App'
import { login, storeAuthSession } from '../services/api'
import { FIELD_LIMITS } from '../utils/fieldLimits'

interface LoginPageProps {
  onLoginSuccess: (name: string, email: string, role: UserRole) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('deactivated') === '1') {
      setError('Your account has been deactivated. Contact an administrator if you need access restored.')
    }
  }, [location.search])

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
      storeAuthSession(response.token, {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role as UserRole,
      })
      onLoginSuccess(response.user.name, response.user.email, response.user.role as UserRole)
      
      // Check for returnTo in query params or localStorage (hybrid approach)
      const params = new URLSearchParams(location.search)
      let returnToRaw = params.get('returnTo') || localStorage.getItem('returnTo')

      if (returnToRaw) {
        // Clear stored value
        localStorage.removeItem('returnTo')

        // Try to decode in case it's URL-encoded
        try {
          returnToRaw = decodeURIComponent(returnToRaw)
        } catch (e) {
          // ignore
        }

        // If an absolute URL was stored, extract the path+search
        if (returnToRaw.startsWith('http')) {
          try {
            const u = new URL(returnToRaw)
            returnToRaw = u.pathname + u.search
          } catch (e) {
            // ignore and navigate to root as fallback
            navigate('/')
          }
        }

        // Normalize to a leading slash
        if (!returnToRaw.startsWith('/')) returnToRaw = '/' + returnToRaw

        navigate(returnToRaw)
      } else if (response.user.role === 'superadmin') {
        navigate('/admin/overview')
      } else if (response.user.role === 'staff') {
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
                    maxLength={FIELD_LIMITS.EMAIL}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-wrapper">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError('')
                      }}
                      className="form-input"
                      maxLength={FIELD_LIMITS.PASSWORD_MAX}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
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
