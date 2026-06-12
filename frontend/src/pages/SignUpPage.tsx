import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserRole } from '../App'
import { register, storeAuthSession } from '../services/api'
import { FIELD_LIMITS } from '../utils/fieldLimits'

export function SignUpPage({
  onSignUpSuccess,
}: {
  onSignUpSuccess: (name: string, email: string, role: UserRole) => void
}) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    personalEmail: '',
    password: '',
    uniEmail: '',
    affiliation: '',
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value } = target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const setAffiliation = (aff: string) => {
    setFormData((prev) => ({
      ...prev,
      affiliation: aff,
      uniEmail: aff === 'Student' ? prev.uniEmail : '',
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.personalEmail || !formData.affiliation || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    // Validate personal email
    if (!formData.personalEmail.includes('@')) {
      setError('Please enter a valid personal email')
      return
    }

    // Validate phone number
    if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number')
      return
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    try {
      // Call the actual API to register
      const fullName = `${formData.firstName} ${formData.lastName}`
      const response = await register(
        fullName, 
        formData.personalEmail, 
        formData.password,
        formData.phoneNumber,
        formData.uniEmail || undefined,
        formData.affiliation
      )

      const role = response.user.role as UserRole
      storeAuthSession(response.token, {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role,
      })

      onSignUpSuccess(response.user.name, response.user.email, role)

      // Redirect to home
      navigate('/')
    } catch (err: any) {
      // Show error from API
      const errorMessage = err?.message || 'Registration failed. Please try again.'
      setError(errorMessage)
    }
  }

  return (
    <main>
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Create Account</h1>
              <p>You need an account to submit a claim or track your requests.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {error && <div className="auth-error">{error}</div>}

                {/* Personal Info Section */}
                <div className="form-section-divider">Personal info</div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-input"
                      maxLength={FIELD_LIMITS.USER_FIRST_NAME}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-input"
                      maxLength={FIELD_LIMITS.USER_LAST_NAME}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="+62 812 3456 7890"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-input"
                    maxLength={FIELD_LIMITS.PHONE}
                  />
                  <p className="form-hint">Used by staff to contact you about your claim appointment.</p>
                </div>

                {/* Affiliation Section */}
                <div className="form-section-divider">Affiliation</div>

                <div className="form-group">
                  <label>I am a</label>
                  <div className="affiliation-tabs">
                    <button
                      type="button"
                      className={`affiliation-tab ${formData.affiliation === 'Student' ? 'active' : ''}`}
                      onClick={() => setAffiliation('Student')}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      className={`affiliation-tab ${formData.affiliation === 'Visitor' ? 'active' : ''}`}
                      onClick={() => setAffiliation('Visitor')}
                    >
                      Visitor
                    </button>
                  </div>
                </div>

                {formData.affiliation === 'Student' && (
                  <>
                    <div className="info-box">
                      Optionally add your BINUS email below. It helps staff verify your affiliation when processing claims.
                    </div>

                    <div className="form-group">
                      <label htmlFor="uniEmail">BINUS email (optional)</label>
                      <input
                        id="uniEmail"
                        type="email"
                        name="uniEmail"
                        placeholder="john.doe@binus.ac.id"
                        value={formData.uniEmail}
                        onChange={handleChange}
                        className="form-input"
                        maxLength={FIELD_LIMITS.EMAIL}
                      />
                      <p className="form-hint">Your institutional email ending in @binus.ac.id</p>
                    </div>
                  </>
                )}

                {/* Account Section */}
                <div className="form-section-divider">Account</div>

                <div className="form-group">
                  <label htmlFor="personalEmail">Personal email</label>
                  <input
                    id="personalEmail"
                    type="email"
                    name="personalEmail"
                    placeholder="john@gmail.com"
                    value={formData.personalEmail}
                    onChange={handleChange}
                    className="form-input"
                    maxLength={FIELD_LIMITS.EMAIL}
                  />
                  <p className="form-hint">Used to log in. Can be the same as your BINUS email.</p>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-wrapper">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                      maxLength={FIELD_LIMITS.PASSWORD_MAX}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-auth-primary">
                  Create account
                </button>
              </form>

              <div className="auth-divider">
                <span>Already have an account? <a onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>Log in here</a></span>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
