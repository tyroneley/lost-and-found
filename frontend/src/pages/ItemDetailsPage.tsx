import { useParams, useNavigate } from 'react-router-dom'
import { Item } from '../App'

export function ItemDetailsPage({ items, isSignedIn }: { items: Item[]; isSignedIn: boolean }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const item = items.find(i => i.id === parseInt(id || '0'))

  if (!item) {
    return (
      <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <h1>Item not found</h1>
        <button onClick={() => navigate('/browse')}>Back to browse</button>
      </main>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const calculateExpiry = (foundAt: string) => {
    const found = new Date(foundAt)
    const expiry = new Date(found.getTime() + 90 * 24 * 60 * 60 * 1000)
    const today = new Date('2026-04-24')
    const daysElapsed = Math.floor((today.getTime() - found.getTime()) / (24 * 60 * 60 * 1000))
    const percentElapsed = Math.min((daysElapsed / 90) * 100, 100)
    return { expiry: formatDate(expiry.toISOString()), daysElapsed, percentElapsed }
  }

  const { expiry, daysElapsed, percentElapsed } = calculateExpiry(item.foundAt)

  return (
    <main className="item-detail-main">
      <div className="item-detail-wrapper">
        {/* Breadcrumb */}
        <div className="item-detail-breadcrumb">
          Home <span>/ Browse items / {item.name}</span>
        </div>

        {/* Main Layout */}
        <div className="item-detail-layout">
          {/* Left Column: Gallery & Info */}
          <div>
            {/* Gallery */}
            <div className="item-detail-gallery">
              <div className="item-detail-main-photo">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-detail-thumbs">
                <div className="item-detail-thumb active">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-detail-thumb">
                  <div style={{ width: '24px', height: '24px', background: '#e0e0e0', borderRadius: '4px' }}></div>
                </div>
                <div className="item-detail-thumb">
                  <div style={{ width: '24px', height: '24px', background: '#e0e0e0', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="item-detail-info">
              <h1 className="item-detail-title">{item.name}</h1>
              
              <div className="item-detail-tags">
                <span className="item-detail-tag item-detail-tag-status">Active</span>
                <span className="item-detail-tag item-detail-tag-cat">{item.category}</span>
                <span className="item-detail-tag item-detail-tag-color">
                  <span className="item-detail-color-dot" style={{ background: item.color }}></span>
                  {item.color}
                </span>
              </div>

              <p className="item-detail-desc">{item.description}</p>

              <table className="item-detail-table">
                <tbody>
                  <tr><td>Found at</td><td>{item.location}</td></tr>
                  <tr><td>Date found</td><td>{formatDate(item.foundAt)}</td></tr>
                  <tr><td>Reported by</td><td>Security staff</td></tr>
                  <tr><td>Item ID</td><td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#90a4ae' }}>ITEM-{formatDate(item.foundAt).replace(/\s/g, '')}-{String(item.id).padStart(3, '0')}</td></tr>
                  <tr><td>Notes</td><td>{item.description.substring(0, 50)}...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="item-detail-sidebar">
            {/* Claim Card */}
            <div className="item-detail-card">
              <div className="item-detail-card-title">Claim this item</div>
              <p className="item-detail-claim-hint">If this is yours, log in and submit a claim. You'll need to describe the item and schedule an appointment with security to verify ownership.</p>
              <button className="item-detail-btn-claim">Claim this item</button>
              {!isSignedIn && (
                <>
                  <button className="item-detail-btn-login">Log in to your account</button>
                  <p className="item-detail-login-note">Don't have an account? <span style={{ color: '#004a87', cursor: 'pointer' }}>Register here</span> — it only takes a minute.</p>
                </>
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
                <span className="item-detail-meta-val" style={{ color: '#1a6b32' }}>Active</span>
              </div>
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Claims</span>
                <span className="item-detail-meta-val">0 submitted</span>
              </div>
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Stored at</span>
                <span className="item-detail-meta-val">Security, FX campus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
