import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Item } from '../App'
import { getItemById } from '../services/api'
import { transformBackendItem } from '../utils/transformData'
import { ErrorPage } from './ErrorPage'

export function ItemDetailsPage({ isSignedIn }: { isSignedIn: boolean }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getItemById(id)
      .then((raw) => {
        const transformed = transformBackendItem(raw)
        setItem(transformed)
        setActivePhoto(0)
      })
      .catch(() => setError("The item you're looking for doesn't exist or has been removed."))
      .finally(() => setLoading(false))
  }, [id])

  const handleClaimClick = () => {
    if (!item) return

    if (!isSignedIn) {
      // Set returnTo for both query param and localStorage (hybrid approach)
      const returnPath = `/items/${item.item_id}/claim`
      localStorage.setItem('returnTo', returnPath)
      navigate(`/login?returnTo=${encodeURIComponent(returnPath)}`)
    } else {
      navigate(`/items/${item.item_id}/claim`)
    }
  }

  if (loading) {
    return (
      <main className="item-detail-main" style={{ textAlign: 'center', color: '#90a4ae' }}>
        Loading item…
      </main>
    )
  }

  if (error || !item) {
    return (
      <ErrorPage
        code={404}
        title="Item Not Found"
        message={error || "The item you're looking for doesn't exist or has been removed."}
        showBackButton={true}
        showHomeButton={true}
        onBack={() => navigate('/browse')}
      />
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const calculateExpiry = (foundAt: string) => {
    const found = new Date(foundAt)
    const expiry = new Date(found.getTime() + 90 * 24 * 60 * 60 * 1000)
    const today = new Date()
    const daysElapsed = Math.floor((today.getTime() - found.getTime()) / (24 * 60 * 60 * 1000))
    const percentElapsed = Math.min((daysElapsed / 90) * 100, 100)
    return { expiry: formatDate(expiry.toISOString()), daysElapsed, percentElapsed }
  }

  const photos = item.photos.length > 0 ? item.photos : [item.image]
  const { expiry, daysElapsed, percentElapsed } = calculateExpiry(item.foundAt)

  return (
    <main className="item-detail-main">
      <div className="item-detail-wrapper">
        <div className="item-detail-layout">
          {/* Left Column: Gallery & Info */}
          <div>
            {/* Gallery */}
            <div className="item-detail-gallery">
              <div className="item-detail-main-photo">
                <img src={photos[activePhoto]} alt={item.name} />
              </div>
              {photos.length > 1 && (
                <div className="item-detail-thumbs">
                  {photos.map((url, i) => (
                    <button
                      key={url + i}
                      type="button"
                      className={`item-detail-thumb ${i === activePhoto ? 'active' : ''}`}
                      onClick={() => setActivePhoto(i)}
                      style={{ border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      <img src={url} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="item-detail-info">
              <h1 className="item-detail-title">{item.name}</h1>
              
              <div className="item-detail-tags">
                <span className="item-detail-tag item-detail-tag-status">{item.status}</span>
                <span className="item-detail-tag item-detail-tag-cat">{item.category}</span>
                <span className="item-detail-tag item-detail-tag-color">
                  <span className="item-detail-color-dot" style={{ background: item.color_hex || item.color }}></span>
                  {item.color_bucket}
                </span>
              </div>

              <p className="item-detail-desc">{item.description}</p>

              <table className="item-detail-table">
                <tbody>
                  <tr><td>Found at</td><td>{item.found_location}</td></tr>
                  <tr><td>Date found</td><td>{formatDate(item.foundAt)}</td></tr>
                  <tr>
                    <td>Item ID</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#90a4ae' }}>
                      ITEM-{item.item_id.slice(0, 8).toUpperCase()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="item-detail-sidebar">
            {/* Claim Card */}
            <div className="item-detail-card">
              <div className="item-detail-card-title">Claim this item</div>
              <p className="item-detail-claim-hint">If this is yours, log in and submit a claim. You'll need to describe the item for security to verify ownership.</p>
              <button 
                className="item-detail-btn-claim"
                onClick={handleClaimClick}
              >
                {isSignedIn ? 'Claim this item' : 'Log in to claim'}
              </button>
              {!isSignedIn && (
                <p className="item-detail-login-note auth-divider">Don't have an account? <a onClick={() => navigate('/signup')} style={{cursor: 'pointer'}}>Register here</a> </p>
              )}
            </div>

            {/* Expiry Card */}
            <div className="item-detail-card">
              <div className="item-detail-card-title">Listing expiry</div>
              <div className="item-detail-expiry-bar">
                <div className="item-detail-expiry-label">
                  <span>Found {formatDate(item.foundAt)}</span>
                  <span>Expires {expiry}</span>
                </div>
                <div className="item-detail-expiry-track">
                  <div className="item-detail-expiry-fill" style={{ width: `${percentElapsed}%` }}></div>
                </div>
                <div className="item-detail-expiry-note">{daysElapsed} of 90 days elapsed. Unclaimed items are returned to the finder after 90 days.</div>
              </div>
            </div>

            {/* Details Card */}
            <div className="item-detail-card">
              <div className="item-detail-card-title">Item details</div>
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Listed</span>
                <span className="item-detail-meta-val">{formatDate(item.foundAt)}</span>
              </div>
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Status</span>
                <span className="item-detail-meta-val" style={{ color: '#1a6b32' }}>{item.status}</span>
              </div>
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Claims</span>
                <span className="item-detail-meta-val">0 submitted</span>
              </div>
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Stored at</span>
                <span className="item-detail-meta-val">{item.finder.affiliation}, {item.building}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
