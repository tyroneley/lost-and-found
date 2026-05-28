import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Item } from '../App'
import { getItemById } from '../services/api'
import { transformBackendItem } from '../utils/transformData'

const statusBadgeClass = (status: string) =>
  `staff-items-status-badge staff-items-status-${status.toLowerCase().replace(/\s+/g, '-')}`

export function StaffItemDetailsPage() {
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
      .catch(() => setError('Could not load this item. It may have been removed.'))
      .finally(() => setLoading(false))
  }, [id])

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

  if (loading) {
    return (
      <main className="item-detail-main" style={{ textAlign: 'center', color: '#90a4ae' }}>
        Loading item…
      </main>
    )
  }

  if (error || !item) {
    return (
      <main className="item-detail-main" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <h1>Item not found</h1>
        <p style={{ color: '#90a4ae', marginBottom: '1.5rem' }}>{error}</p>
        <button className="item-detail-btn-login" onClick={() => navigate('/staff/items')}>
          Back to items
        </button>
      </main>
    )
  }

  const photos = item.photos.length > 0 ? item.photos : [item.image]
  const { expiry, daysElapsed, percentElapsed } = calculateExpiry(item.found_at)

  return (
    <main className="item-detail-main">
      <div className="item-detail-wrapper">
        <div className="staff-report-breadcrumb" style={{ marginBottom: '1.25rem' }}>
          <button onClick={() => navigate('/staff')} className="staff-report-breadcrumb-link">
            Dashboard
          </button>
          <span> / </span>
          <button onClick={() => navigate('/staff/items')} className="staff-report-breadcrumb-link">
            Items
          </button>
          <span> / {item.name}</span>
        </div>

        <div className="item-detail-layout">
          <div>
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

            <div className="item-detail-info">
              <h1 className="item-detail-title">{item.name}</h1>
              <div className="item-detail-tags">
                <span className={statusBadgeClass(item.status)}>{item.status}</span>
                <span className="item-detail-tag item-detail-tag-cat">{item.category}</span>
                <span className="item-detail-tag item-detail-tag-color">
                  <span
                    className="item-detail-color-dot"
                    style={{ background: item.color_hex || item.color }}
                  />
                  {item.color_bucket}
                </span>
              </div>
              <p className="item-detail-desc">{item.description || 'No description provided.'}</p>
              <table className="item-detail-table">
                <tbody>
                  <tr><td>Found at</td><td>{item.found_location}</td></tr>
                  <tr><td>Building</td><td>{item.building}</td></tr>
                  <tr><td>Date found</td><td>{formatDate(item.found_at)}</td></tr>
                  <tr>
                    <td>Item ID</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#90a4ae' }}>
                      ITEM-{item.item_id.slice(0, 8).toUpperCase()}
                    </td>
                  </tr>
                  {item.notes && (
                    <tr><td>Notes</td><td>{item.notes}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="item-detail-sidebar">
            <div className="item-detail-card">
              <div className="item-detail-card-title">Status</div>
              <span className={statusBadgeClass(item.status)}>{item.status}</span>
              <p className="item-detail-expiry-note" style={{ marginTop: '0.75rem' }}>
                Status is managed automatically — active when reported, claimed when a user submits a claim, and collected or returned as claims are resolved.
              </p>
            </div>

            <div className="item-detail-card">
              <div className="item-detail-card-title">Listing expiry</div>
              <div className="item-detail-expiry-bar">
                <div className="item-detail-expiry-label">
                  <span>Found {formatDate(item.found_at)}</span>
                  <span>Expires {expiry}</span>
                </div>
                <div className="item-detail-expiry-track">
                  <div className="item-detail-expiry-fill" style={{ width: `${percentElapsed}%` }} />
                </div>
                <div className="item-detail-expiry-note">
                  {daysElapsed} of 90 days elapsed. Unclaimed items are returned to the finder after 90 days.
                </div>
              </div>
            </div>

            <div className="item-detail-card">
              <div className="item-detail-card-title">Finder & storage</div>
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Finder</span>
                <span className="item-detail-meta-val">{item.finder.name}</span>
              </div>
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Contact</span>
                <span className="item-detail-meta-val">{item.finder.contact}</span>
              </div>
              {item.finder.affiliation && (
                <div className="item-detail-meta-row">
                  <span className="item-detail-meta-key">Affiliation</span>
                  <span className="item-detail-meta-val">{item.finder.affiliation}</span>
                </div>
              )}
              <div className="item-detail-meta-row">
                <span className="item-detail-meta-key">Building</span>
                <span className="item-detail-meta-val">{item.building}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
