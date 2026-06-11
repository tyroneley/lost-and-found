import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllClaims, getCategories } from '../services/api'
import { transformBackendStaffClaims } from '../utils/transformData'
import type { StaffClaimObject, StaffClaimsNavState } from '../types/claims'
import { StaffClaimRow } from '../components/StaffClaimRow'
import { FIELD_LIMITS } from '../utils/fieldLimits'

type StatusTab = 'All' | 'Pending' | 'Approved' | 'Rejected' | 'Collected'

const CLAIMS_PER_PAGE = 6
const STATUS_TABS: StatusTab[] = ['All', 'Pending', 'Approved', 'Rejected', 'Collected']

const TAB_TO_API: Record<Exclude<StatusTab, 'All'>, string> = {
  Pending: 'PENDING',
  Approved: 'APPROVED',
  Rejected: 'REJECTED',
  Collected: 'COLLECTED',
}

function tabCount(claims: StaffClaimObject[], tab: StatusTab): number {
  if (tab === 'All') return claims.length
  return claims.filter((c) => c.status === tab.toLowerCase()).length
}

export function StaffClaimsPage() {
  const navigate = useNavigate()
  const [summaryClaims, setSummaryClaims] = useState<StaffClaimObject[]>([])
  const [listClaims, setListClaims] = useState<StaffClaimObject[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusTab, setStatusTab] = useState<StatusTab>('All')
  const [categories, setCategories] = useState<string[]>(['All'])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getAllClaims({ limit: 100 })
      .then((response) => {
        const raw = Array.isArray(response) ? response : response.data ?? []
        setSummaryClaims(transformBackendStaffClaims(raw))
      })
      .catch(console.error)
  }, [])

  const fetchListClaims = useCallback(() => {
    setLoading(true)
    const filters: Parameters<typeof getAllClaims>[0] = { limit: 100 }
    if (statusTab !== 'All') {
      filters!.status = TAB_TO_API[statusTab as Exclude<StatusTab, 'All'>]
    }
    if (categoryFilter !== 'All') {
      filters!.category = categoryFilter
    }

    getAllClaims(filters)
      .then((response) => {
        const raw = Array.isArray(response) ? response : response.data ?? []
        setListClaims(transformBackendStaffClaims(raw))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [statusTab, categoryFilter])

  useEffect(() => {
    fetchListClaims()
    setCurrentPage(1)
  }, [fetchListClaims])

  useEffect(() => {
    getCategories()
      .then((cats: unknown) => {
        const list = Array.isArray(cats) ? cats : []
        const names = list.map((c: { name?: string }) => c.name).filter(Boolean) as string[]
        setCategories(['All', ...names])
      })
      .catch(() => {})
  }, [])

  const filteredClaims = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return listClaims
    return listClaims.filter(
      (c) =>
        c.claimer_name.toLowerCase().includes(term) ||
        c.item_name.toLowerCase().includes(term)
    )
  }, [listClaims, searchTerm])

  const totalPages = Math.ceil(filteredClaims.length / CLAIMS_PER_PAGE)
  const paginatedClaims = useMemo(() => {
    const start = (currentPage - 1) * CLAIMS_PER_PAGE
    return filteredClaims.slice(start, start + CLAIMS_PER_PAGE)
  }, [filteredClaims, currentPage])

  const summarySource = summaryClaims

  const metrics = {
    total: summarySource.length,
    pending: summarySource.filter((c) => c.status === 'pending').length,
    approved: summarySource.filter((c) => c.status === 'approved').length,
    collected: summarySource.filter((c) => c.status === 'collected').length,
  }

  const openReview = (claimId: string) => {
    const state: StaffClaimsNavState = {
      claimIds: filteredClaims.map((c) => c.claim_id),
    }
    navigate(`/staff/claims/${claimId}`, { state })
  }

  return (
    <div className="staff-items-page staff-claims-page">
      <div className="staff-items-header">
        <div>
          <h1 className="staff-items-title">Claims</h1>
          <p className="staff-items-subtitle">Review and action incoming claim requests</p>
        </div>
      </div>

      <div className="staff-metrics staff-claims-metrics">
        <div className="staff-metric">
          <div className="staff-metric-label">Total</div>
          <div className="staff-metric-val">{metrics.total}</div>
          <div className="staff-metric-sub">all claims</div>
        </div>
        <div className="staff-metric staff-metric-warn">
          <div className="staff-metric-label">Pending</div>
          <div className="staff-metric-val">{metrics.pending}</div>
          <div className="staff-metric-sub">awaiting review</div>
        </div>
        <div className="staff-metric staff-metric-approved">
          <div className="staff-metric-label">Approved</div>
          <div className="staff-metric-val">{metrics.approved}</div>
          <div className="staff-metric-sub">ready to collect</div>
        </div>
        <div className="staff-metric staff-metric-collected">
          <div className="staff-metric-label">Collected</div>
          <div className="staff-metric-val">{metrics.collected}</div>
          <div className="staff-metric-sub">resolved</div>
        </div>
      </div>

      <div className="staff-items-toolbar">
        <div className="staff-items-search-group staff-claims-search-wrap">
          <div className="staff-items-search">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
              <circle cx="5" cy="5" r="3" />
              <path d="M8 8l2.5 2.5" />
            </svg>
            <input
              type="text"
              placeholder="Search by item name or claimant name…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxLength={FIELD_LIMITS.SEARCH}
            />
          </div>
        </div>
        <div className="staff-items-filter-group">
          <select
            className="staff-items-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All categories' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="staff-claims-tabs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`staff-claims-tab ${statusTab === tab ? 'staff-claims-tab-active' : ''}`}
            onClick={() => setStatusTab(tab)}
          >
            {tab}
            <span className="staff-claims-tab-count">{tabCount(summaryClaims, tab)}</span>
          </button>
        ))}
      </div>

      <div className="staff-claims-list">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="staff-claims-skeleton" />
          ))
        ) : filteredClaims.length === 0 ? (
          <div className="staff-claims-empty">
            <p>No claims found</p>
            <span>Try adjusting your filters or search term.</span>
          </div>
        ) : (
          paginatedClaims.map((claim) => (
            <StaffClaimRow
              key={claim.claim_id}
              claim={claim}
              onReview={() => openReview(claim.claim_id)}
            />
          ))
        )}
      </div>

      {filteredClaims.length > 0 && (
        <div className="staff-items-pagination">
          <span className="staff-items-pg-info">
            Showing {paginatedClaims.length > 0 ? (currentPage - 1) * CLAIMS_PER_PAGE + 1 : 0}–{Math.min(currentPage * CLAIMS_PER_PAGE, filteredClaims.length)} of {filteredClaims.length} claims
          </span>
          <div className="staff-items-pg-btns">
            <button
              className="staff-items-pg-btn"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ opacity: currentPage === 1 ? 0.35 : 1 }}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`staff-items-pg-btn ${currentPage === i + 1 ? 'staff-items-pg-btn-active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="staff-items-pg-btn"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{ opacity: currentPage === totalPages || totalPages === 0 ? 0.35 : 1 }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
