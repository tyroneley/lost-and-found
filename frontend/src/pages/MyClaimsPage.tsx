import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Item } from '../App'
import { ClaimCard } from '../components/ClaimCard'
import * as api from '../services/api'

interface Claim {
  claim_id: string
  item_id: string
  item_name: string
  item_location: string
  item_found_at: string
  item_category: string
  item_image: string
  status: 'pending' | 'approved' | 'rejected' | 'collected'
  ownership_desc: string
  staff_notes?: string
  requested_at: string
  decision_at?: string
  resolved_at?: string
}

export function MyClaimsPage({ isSignedIn: _isSignedIn }: { items?: Item[]; isSignedIn: boolean }) {
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'collected' | 'rejected'>('all')
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user's claims from backend
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.getUserClaims()
        
        // Backend returns { data, total, limit, offset }
        const claimsData = response.data || []
        
        // Transform backend claims to frontend format
        const transformedClaims = (claimsData as any[]).map((claim: any) => {
          const room = claim.item?.room
          let roomDisplay = 'Unknown'
          if (room) {
            if (room.room_number && room.room_name) {
              roomDisplay = `${room.room_number} — ${room.room_name}`
            } else if (room.room_number) {
              roomDisplay = String(room.room_number)
            } else if (room.room_name) {
              roomDisplay = room.room_name
            }
          }
          const photos: string[] = claim.item?.photos?.map((p: any) =>
            p.storage_url.startsWith('http') ? p.storage_url : `${api.API_URL}${p.storage_url}`
          ) ?? []

          return {
            claim_id: claim.claim_id,
            item_id: claim.item_id,
            item_name: claim.item?.name || 'Unknown',
            item_location: roomDisplay,
            item_found_at: claim.item?.found_at || new Date().toISOString(),
            item_category: claim.item?.category?.name || 'Other',
            item_image: photos[0] || '',
            status: claim.status.toLowerCase() as Claim['status'],
            ownership_desc: claim.ownership_desc,
            staff_notes: claim.staff_notes,
            requested_at: claim.requested_at,
            decision_at: claim.decision_at,
            resolved_at: claim.resolved_at,
          }
        })
        
        setClaims(transformedClaims)
      } catch (err) {
        console.error('Failed to fetch claims:', err)
        setError(err instanceof Error ? err.message : 'Failed to load claims')
        setClaims([])
      } finally {
        setLoading(false)
      }
    }

    fetchClaims()
  }, [])

  const stats = {
    total: claims.length,
    pending: claims.filter(c => c.status === 'pending').length,
    approved: claims.filter(c => c.status === 'approved').length,
  }

  const filteredClaims = filterStatus === 'all' ? claims : claims.filter(c => c.status === filterStatus)

  return (
    <main className="my-claims-main">
      <div className="my-claims-container">
        <div className="page-head">
          <h1 className="page-title">My claims</h1>
          <p className="page-sub">Track the status of items you've submitted a claim for.</p>
        </div>

        {loading && (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Loading your claims...</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '1rem', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', marginBottom: '1rem' }}>
            <p style={{ color: '#991b1b' }}>Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
        <>
        <div className="summary-strip">
          <div className="summary-card">
            <div className="summary-label">Total claims</div>
            <div className="summary-val">{stats.total}</div>
            <div className="summary-sub">all time</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Pending review</div>
            <div className="summary-val amber">{stats.pending}</div>
            <div className="summary-sub">awaiting staff</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Approved</div>
            <div className="summary-val blue">{stats.approved}</div>
            <div className="summary-sub">ready to collect</div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="toolbar">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'on' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterStatus === 'pending' ? 'on' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filterStatus === 'approved' ? 'on' : ''}`}
            onClick={() => setFilterStatus('approved')}
          >
            Approved
          </button>
          <button
            className={`filter-btn ${filterStatus === 'collected' ? 'on' : ''}`}
            onClick={() => setFilterStatus('collected')}
          >
            Collected
          </button>
          <button
            className={`filter-btn ${filterStatus === 'rejected' ? 'on' : ''}`}
            onClick={() => setFilterStatus('rejected')}
          >
            Rejected
          </button>
          <span className="toolbar-right">{filteredClaims.length} claims</span>
        </div>

        {/* Claims List or Empty State */}
        {filteredClaims.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
            <div className="empty-title">No claims yet</div>
            <div className="empty-sub">Browse lost items and submit a claim if you find yours.</div>
            <button className="btn-browse" onClick={() => navigate('/browse')}>
              Browse items
            </button>
          </div>
        ) : (
          <div className="claims-list">
            {filteredClaims.map(claim => (
              <ClaimCard key={claim.claim_id} claim={claim} />
            ))}
          </div>
        )}
        </>
        )}
        </div>
    </main>
  )
}
