import { useState, useEffect } from 'react'
import { getAuditLog } from '../services/api'
import type { AuditLogApiEntry } from '../services/api'
import { auditActionLabel, auditDotColor, relativeTime } from '../utils/auditLog'

export function SuperadminAuditPage() {
  const [entries, setEntries] = useState<AuditLogApiEntry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAuditLog({ limit: 200 })
      .then((res) => {
        setEntries(res.data ?? [])
        setTotal(res.total ?? res.data?.length ?? 0)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load audit log')
        setEntries([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="staff-dashboard-main">
      <div className="staff-dashboard-page">
        <div className="staff-dashboard-header">
          <h1 className="staff-dashboard-title">Audit log</h1>
          <p className="staff-dashboard-subtitle">
            {total} recorded event{total === 1 ? '' : 's'} · item creates, updates, claims, and reviews
          </p>
        </div>

        <div className="staff-dashboard-section">
          {error && <div className="staff-manage-error">{error}</div>}

          <div className="staff-card">
            <div className="staff-card-head">
              <span className="staff-card-title">System activity</span>
            </div>
            <div className="staff-activity-list">
              {loading ? (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>Loading activity…</p>
              ) : entries.length === 0 ? (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>
                  No audit entries yet. Activity is logged when items are created or updated and when claims are reviewed.
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
          </div>
        </div>
      </div>
    </main>
  )
}
