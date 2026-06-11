import { useState, useEffect } from 'react'
import { getAuditLog } from '../services/api'
import type { AuditLogAction, AuditLogApiEntry, AuditLogSort } from '../services/api'
import { AUDIT_ACTION_FILTER_OPTIONS, auditActionLabel, auditDotColor, relativeTime } from '../utils/auditLog'
import { clampField, FIELD_LIMITS } from '../utils/fieldLimits'

const ENTRIES_PER_PAGE = 10
const SEARCH_DEBOUNCE_MS = 350

function visiblePageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: (number | 'ellipsis')[] = [1]
  if (current > 3) pages.push('ellipsis')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let p = start; p <= end; p++) pages.push(p)
  if (current < total - 2) pages.push('ellipsis')
  pages.push(total)
  return pages
}

function hasActiveFilters(
  action: AuditLogAction | '',
  search: string,
  fromDate: string,
  toDate: string
): boolean {
  return Boolean(action || search.trim() || fromDate || toDate)
}

export function SuperadminAuditPage() {
  const [entries, setEntries] = useState<AuditLogApiEntry[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [actionFilter, setActionFilter] = useState<AuditLogAction | ''>('')
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sort, setSort] = useState<AuditLogSort>('newest')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const totalPages = Math.max(1, Math.ceil(total / ENTRIES_PER_PAGE))
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * ENTRIES_PER_PAGE + 1
  const rangeEnd = Math.min(currentPage * ENTRIES_PER_PAGE, total)
  const filtersActive = hasActiveFilters(actionFilter, debouncedSearch, fromDate, toDate)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchInput.trim()), SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    setCurrentPage(1)
  }, [actionFilter, debouncedSearch, sort, fromDate, toDate])

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAuditLog({
      limit: ENTRIES_PER_PAGE,
      offset: (currentPage - 1) * ENTRIES_PER_PAGE,
      action: actionFilter || undefined,
      q: debouncedSearch || undefined,
      sort,
      from: fromDate || undefined,
      to: toDate || undefined,
    })
      .then((res) => {
        setEntries(res.data ?? [])
        setTotal(res.total ?? res.data?.length ?? 0)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load audit log')
        setEntries([])
        setTotal(0)
      })
      .finally(() => setLoading(false))
  }, [currentPage, actionFilter, debouncedSearch, sort, fromDate, toDate])

  const clearFilters = () => {
    setActionFilter('')
    setSearchInput('')
    setDebouncedSearch('')
    setFromDate('')
    setToDate('')
    setSort('newest')
  }

  return (
    <main className="staff-dashboard-main">
      <div className="staff-dashboard-page">
        <div className="staff-dashboard-header">
          <h1 className="staff-dashboard-title">Audit log</h1>
          <p className="staff-dashboard-subtitle">
            {total} recorded event{total === 1 ? '' : 's'}
            {filtersActive ? ' matching filters' : ' · item creates, updates, claims, and reviews'}
          </p>
        </div>

        <div className="staff-dashboard-section">
          {error && <div className="staff-manage-error">{error}</div>}

          <div className="staff-items-toolbar admin-audit-toolbar" style={{ marginBottom: '1.25rem' }}>
            <div className="staff-items-search-group" style={{ flex: 1, minWidth: '200px' }}>
              <label className="staff-items-filter-label">Search</label>
              <div className="staff-items-search">
                <input
                  type="text"
                  placeholder="Item name, staff name, or notes"
                  value={searchInput}
                  onChange={(e) => setSearchInput(clampField(e.target.value, FIELD_LIMITS.SEARCH))}
                  maxLength={FIELD_LIMITS.SEARCH}
                />
              </div>
            </div>
            <div className="staff-items-filter-group">
              <label className="staff-items-filter-label">Action</label>
              <select
                className="staff-items-select"
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value as AuditLogAction | '')}
              >
                {AUDIT_ACTION_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value || 'all'} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="staff-items-filter-group">
              <label className="staff-items-filter-label">Sort</label>
              <select className="staff-items-select" value={sort} onChange={(e) => setSort(e.target.value as AuditLogSort)}>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
            <div className="staff-items-filter-group">
              <label className="staff-items-filter-label">From</label>
              <input
                type="date"
                className="staff-items-select admin-audit-date-input"
                value={fromDate}
                max={toDate || undefined}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="staff-items-filter-group">
              <label className="staff-items-filter-label">To</label>
              <input
                type="date"
                className="staff-items-select admin-audit-date-input"
                value={toDate}
                min={fromDate || undefined}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            {filtersActive && (
              <div className="staff-items-filter-group admin-audit-clear-wrap">
                <label className="staff-items-filter-label">&nbsp;</label>
                <button type="button" className="staff-items-clear-btn" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <div className="staff-card">
            <div className="staff-card-head">
              <span className="staff-card-title">System activity</span>
            </div>
            <div className="staff-activity-list">
              {loading ? (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>Loading activity…</p>
              ) : entries.length === 0 ? (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>
                  {filtersActive
                    ? 'No events match your filters. Try widening the date range or clearing filters.'
                    : 'No audit entries yet. Activity is logged when items are created or updated and when claims are reviewed.'}
                </p>
              ) : (
                entries.map((entry) => (
                  <div key={entry.log_id} className="staff-activity-row">
                    <div className="staff-activity-dot" style={{ backgroundColor: auditDotColor(entry.action) }} />
                    <div className="staff-cr-info">
                      <div className="staff-cr-name staff-activity-text">{auditActionLabel(entry)}</div>
                      <div className="staff-cr-meta">
                        {entry.user?.name ? `by ${entry.user.name}` : 'System'}
                        {entry.notes ? ` · ${entry.notes}` : ''}
                        {' · '}
                        {relativeTime(entry.created_at)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {total > 0 && (
              <div className="staff-items-pagination admin-audit-pagination">
                <span className="staff-items-pg-info">
                  Showing {rangeStart}–{rangeEnd} of {total} events
                </span>
                <div className="staff-items-pg-btns">
                  <button
                    type="button"
                    className="staff-items-pg-btn"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    style={{ opacity: currentPage === 1 ? 0.35 : 1 }}
                  >
                    ‹
                  </button>
                  {visiblePageNumbers(currentPage, totalPages).map((page, idx) =>
                    page === 'ellipsis' ? (
                      <span key={`ellipsis-${idx}`} className="staff-items-pg-ellipsis">
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        className={`staff-items-pg-btn ${currentPage === page ? 'staff-items-pg-btn-active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    className="staff-items-pg-btn"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    style={{ opacity: currentPage === totalPages ? 0.35 : 1 }}
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
