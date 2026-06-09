import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Item } from '../App'
import { claimItem, getItemById } from '../services/api'
import { transformBackendItem } from '../utils/transformData'
import { Stepper } from '../components/Stepper'
import { ItemStrip } from '../components/ItemStrip'
import { ErrorPage } from './ErrorPage'

interface ClaimFormState {
  ownershipDesc: string
}

function StepOwnership({
  item,
  form,
  onChange,
  onNext,
  onCancel,
}: {
  item: Item
  form: ClaimFormState
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onNext: () => void
  onCancel: () => void
}) {
  const charLimit = 500
  const remaining = charLimit - form.ownershipDesc.length
  const canProceed = form.ownershipDesc.trim().length >= 10

  return (
    <div className="claim-step">
      <h2 className="claim-step-title">Describe your ownership</h2>
      <p className="claim-step-description">
        Tell us details only the real owner would know.
      </p>

      <ItemStrip item={item} />

      <div className="form-group">
        <label htmlFor="ownershipDesc">
          How do you know this is yours? <span className="claim-required">*</span>
        </label>
        <textarea
          id="ownershipDesc"
          name="ownershipDesc"
          className="form-input claim-textarea"
          placeholder="e.g. Model, brand, distinguishing marks, serial numbers..."
          value={form.ownershipDesc}
          onChange={onChange}
          maxLength={charLimit}
        />
        <div className="claim-char-row">
          <span className="form-hint">
            Min 10 characters
          </span>
          <span className={`claim-char-count ${remaining < 50 ? 'claim-char-warn' : ''}`}>
            {form.ownershipDesc.length} / {charLimit}
          </span>
        </div>
      </div>

      <div className="claim-warning-box">
        Staff will review your description and verify ownership in person.
      </div>

      <div className="claim-actions">
        <button className="btn btn-secondary-light" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn btn-primary-dark"
          onClick={onNext}
          disabled={!canProceed}
          title={!canProceed ? 'Please write at least 10 characters' : undefined}
        >
          Review claim →
        </button>
      </div>
    </div>
  )
}

function StepReview({
  item,
  form,
  onBack,
  onSubmit,
  userName,
  userEmail,
  isSubmitting,
}: {
  item: Item
  form: ClaimFormState
  onBack: () => void
  onSubmit: () => void
  userName?: string
  userEmail?: string
  isSubmitting?: boolean
}) {
  const user = { name: userName || 'Guest User', email: userEmail || 'user@example.com' }

  return (
    <div className="claim-step">
      <h2 className="claim-step-title">Review your claim</h2>
      <p className="claim-step-description">
        Check everything before submitting. Once submitted, your claim is sent to
        security staff for review.
      </p>

      <div className="claim-review-box">
        <p className="claim-review-label">Item</p>
        <div className="claim-review-table">
          <div className="claim-review-row">
            <span className="claim-review-key">Name</span>
            <span className="claim-review-val">{item.name}</span>
          </div>
          <div className="claim-review-row">
            <span className="claim-review-key">Found at</span>
            <span className="claim-review-val">{item.found_location}</span>
          </div>
          <div className="claim-review-row">
            <span className="claim-review-key">Item ID</span>
            <span className="claim-review-val claim-mono">ITEM-{item.item_id.slice(0, 8).toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="claim-review-box">
        <p className="claim-review-label">Your ownership description</p>
        <div className="claim-review-desc">{form.ownershipDesc}</div>
      </div>

      <div className="claim-review-box">
        <p className="claim-review-label">Your contact details</p>
        <div className="claim-review-table">
          <div className="claim-review-row">
            <span className="claim-review-key">Name</span>
            <span className="claim-review-val">{user.name}</span>
          </div>
          <div className="claim-review-row">
            <span className="claim-review-key">Email</span>
            <span className="claim-review-val">{user.email}</span>
          </div>
        </div>
      </div>

      <div className="claim-actions">
        <button className="btn btn-secondary-light" onClick={onBack}>
          ← Back
        </button>
        <button className="btn btn-primary-dark" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit claim →'}
        </button>
      </div>
    </div>
  )
}

function StepConfirm({ claimRef, onDone }: { claimRef: string; onDone: () => void }) {
  const navigate = useNavigate()

  return (
    <div className="claim-step claim-step-confirm">
      <div className="claim-success-icon">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1a6b32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 14 11 19 22 9" />
        </svg>
      </div>

      <h2 className="claim-step-title" style={{ textAlign: 'center' }}>
        Claim submitted
      </h2>
      <p className="claim-step-description" style={{ textAlign: 'center' }}>
        Your claim has been received.
        <br></br>
        Security staff will review your ownership description.
      </p>

      <div className="claim-ref-box">
        <p className="claim-ref-label">Claim reference</p>
        <p className="claim-ref-code">{claimRef}</p>
      </div>

      <div className="claim-review-box">
        <p className="claim-review-label">What happens next</p>
        <div className="claim-next-steps">
          <div className="claim-next-row">
            <div className="claim-next-dot" />
            <p className="claim-next-text">
              <strong>If you're on campus:</strong> Visit the security desk immediately with your ID. They'll ask verification questions based on your description and return the item if verified.
            </p>
          </div>
          <div className="claim-next-row">
            <div className="claim-next-dot" />
            <p className="claim-next-text">
              <strong>If you're away from campus:</strong> Your claim will be reviewed by security staff. Check your claim status in My Claims, then visit campus when convenient to complete verification and collect your item.
            </p>
          </div>
          <div className="claim-next-row">
            <div className="claim-next-dot" />
            <p className="claim-next-text">
              In either case, security will verify your ownership, then hand over your item.
            </p>
          </div>
        </div>
      </div>

      <div className="claim-actions">
        <button className="btn btn-primary-dark" style={{ width: '100%' }} onClick={onDone}>
          Back to listings
        </button>
        <button
          className="btn btn-secondary-light"
          style={{ width: '100%' }}
          onClick={() => navigate('/my-claims')}
        >
          View my claims
        </button>
      </div>
    </div>
  )
}

export function ClaimPage({
  userName,
  userEmail,
  isSignedIn,
}: {
  userName?: string
  userEmail?: string
  isSignedIn?: boolean
}) {
  const { itemId } = useParams()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState<ClaimFormState>({ ownershipDesc: '' })
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [claimRef, setClaimRef] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSignedIn === false) {
      setError('AUTH_REQUIRED')
    }
  }, [isSignedIn])

  useEffect(() => {
    if (!itemId) {
      setLoading(false)
      return
    }

    setLoading(true)
    getItemById(itemId)
      .then((raw) => setItem(transformBackendItem(raw)))
      .catch(() => setItem(null))
      .finally(() => setLoading(false))
  }, [itemId])

  if (error === 'AUTH_REQUIRED') {
    return (
      <ErrorPage
        code={401}
        title="Authentication Required"
        message="You must be logged in to submit a claim. Please log in and try again."
        showBackButton={true}
        showHomeButton={true}
        onBack={() => navigate(`/items/${itemId}`)}
      />
    )
  }

  if (loading) {
    return (
      <main className="item-detail-main" style={{ textAlign: 'center', color: '#90a4ae', padding: '3rem' }}>
        Loading item…
      </main>
    )
  }

  if (!item) {
    return (
      <ErrorPage
        code={404}
        title="Item Not Found"
        message="The item you're trying to claim doesn't exist or has been removed."
        showBackButton={false}
        showHomeButton={true}
      />
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setError('')
    setIsSubmitting(true)
    try {
      if (!itemId) {
        setError('Item ID not found')
        return
      }
      const response = await claimItem(itemId, form.ownershipDesc)
      const ref = `CLM-${response.claim_id.slice(0, 8).toUpperCase()}`
      setClaimRef(ref)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit claim')
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <div className="claim-banner">
        <div className="claim-banner-content">
          <div className="breadcrumb">
            <span onClick={() => navigate('/browse')} style={{ cursor: 'pointer' }}>Home</span>
            {' / '}
            <span onClick={() => navigate(`/items/${itemId}`)} style={{ cursor: 'pointer' }}>{item.name}</span>
            {' / '}
            <span>Claim request</span>
          </div>
          <h1 className="claim-banner-title">Claim your item</h1>
          <p className="claim-banner-subtitle">Follow the steps below to verify ownership and collect your lost item</p>
        </div>
      </div>

      <section className="claim-section">
        <div className="claim-container">
          {step < 3 && <Stepper current={step} />}

          <div className="claim-content">
            {error && error !== 'AUTH_REQUIRED' && (
              <div className="auth-error" style={{ marginBottom: '1.5rem' }}>{error}</div>
            )}
            {step === 1 && (
              <StepOwnership
                item={item}
                form={form}
                onChange={handleChange}
                onNext={() => setStep(2)}
                onCancel={() => navigate(`/items/${itemId}`)}
              />
            )}
            {step === 2 && (
              <StepReview
                item={item}
                form={form}
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
                userName={userName}
                userEmail={userEmail}
                isSubmitting={isSubmitting}
              />
            )}
            {step === 3 && (
              <StepConfirm
                claimRef={claimRef}
                onDone={() => navigate('/browse')}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
