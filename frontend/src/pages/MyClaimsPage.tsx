import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Item } from '../App'
import { ClaimCard } from '../components/ClaimCard'

interface Claim {
  claim_id: string
  item_id: number
  item_name: string
  item_location: string
  item_found_at: string
  item_category: string
  item_image: string
  status: 'pending' | 'approved' | 'rejected' | 'collected'
  ownership_desc: string
  staff_notes?: string
  requested_at: string
  approved_at?: string
  rejected_at?: string
  resolved_at?: string
}

export function MyClaimsPage({ items, isSignedIn: _isSignedIn }: { items: Item[]; isSignedIn: boolean }) {
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'collected' | 'rejected'>('all')


  const mockClaimsData = [
    {
      claim_id: 'CLM-20260408-001',
      item_id: 4,
      status: 'approved' as const,
      ownership_desc: 'They are Sony WF-1000XM5 earbuds. The right earbud has a small chip on the outer edge. My name "Rina" is written in marker inside the case lid.',
      requested_at: '2026-04-08T16:45',
      approved_at: '2026-04-09T09:15',
    },
    {
      claim_id: 'CLM-20260407-002',
      item_id: 1,
      status: 'pending' as const,
      ownership_desc: 'It\'s a Targus laptop bag, matte black with a red zipper pull on the main compartment. Has a BINUS sticker on the front pocket and contains a charger.',
      requested_at: '2026-04-07T15:20',
    },
    {
      claim_id: 'CLM-20260405-003',
      item_id: 2,
      status: 'rejected' as const,
      ownership_desc: 'My student ID card with my photo and student number on it.',
      staff_notes: 'Description too vague — please visit the security desk in person with your university email for verification.',
      requested_at: '2026-04-05T11:30',
      rejected_at: '2026-04-06T14:00',
    },
    {
      claim_id: 'CLM-20260402-004',
      item_id: 5,
      status: 'collected' as const,
      ownership_desc: 'Red canvas backpack with my name written on the inside pocket. Has music stickers on the front.',
      requested_at: '2026-04-02T12:15',
      approved_at: '2026-04-03T10:30',
      resolved_at: '2026-04-06T10:30',
    },
  ]

  const claims = mockClaimsData
    .map((claim) => {
      const item = items.find((i) => i.id === claim.item_id)
      if (!item) return null
      return {
        claim_id: claim.claim_id,
        item_id: claim.item_id,
        item_name: item.name,
        item_location: item.location,
        item_found_at: item.found_at,
        item_category: item.category,
        item_image: item.image,
        status: claim.status,
        ownership_desc: claim.ownership_desc,
        staff_notes: claim.staff_notes,
        requested_at: claim.requested_at,
        approved_at: claim.approved_at,
        rejected_at: claim.rejected_at,
        resolved_at: claim.resolved_at,
      } as Claim
    })
    .filter((claim): claim is Claim => claim !== null)

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

        {/* Summary Strip */}
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
              <div style={{ width: '24px', height: '24px', background: '#e0e6ed', borderRadius: '4px' }}></div>
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
        </div>
    </main>
  )
}
