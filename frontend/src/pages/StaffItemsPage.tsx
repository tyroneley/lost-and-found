import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Item } from '../App'
import { getItems } from '../services/api'
import { transformBackendItems } from '../utils/transformData'

export function StaffItemsPage() {
  const navigate = useNavigate()
  const [allItems, setAllItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [buildingFilter, setBuildingFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    getItems({ limit: 500 })
      .then((response: any) => {
        const raw = Array.isArray(response) ? response : response.data ?? []
        setAllItems(transformBackendItems(raw))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...Array.from(new Set(allItems.map(i => i.category)))]
  const statuses = ['All', ...Array.from(new Set(allItems.map(i => i.status)))]
  const buildings = ['All', ...Array.from(new Set(allItems.map(i => i.building)))]

  const filteredItems = allItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.found_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter
    const matchesBuilding = buildingFilter === 'All' || item.building === buildingFilter
    return matchesSearch && matchesCategory && matchesStatus && matchesBuilding
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    const dateA = new Date(a.found_at).getTime()
    const dateB = new Date(b.found_at).getTime()
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB
  })

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const paginatedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const statusBadgeClass = (status: string) =>
    `staff-items-status-badge staff-items-status-${status.toLowerCase().replace(/\s+/g, '-')}`

  if (loading) {
    return (
      <div className="staff-items-page" style={{ padding: '3rem', textAlign: 'center', color: '#90a4ae' }}>
        Loading items…
      </div>
    )
  }

  return (
    <div className="staff-items-page">
      <div className="staff-items-header">
        <div>
          <h1 className="staff-items-title">Items</h1>
          <p className="staff-items-subtitle">All found items recorded at this security desk</p>
        </div>
        <button className="staff-items-record-btn" onClick={() => navigate('/staff/report')}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 1v10M1 6h10" />
          </svg>
          <span>Record found item</span>
        </button>
      </div>

      <div className="staff-items-toolbar">
        <div className="staff-items-search-group">
          <label className="staff-items-filter-label">Search</label>
          <div className="staff-items-search">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
              <circle cx="5" cy="5" r="3" />
              <path d="M8 8l2.5 2.5" />
            </svg>
            <input
              type="text"
              placeholder="Name, location, or ID"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
            />
          </div>
        </div>
        <div className="staff-items-filters">
          <div className="staff-items-filter-group">
            <label className="staff-items-filter-label">Category</label>
            <select
              className="staff-items-select"
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1) }}
            >
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="staff-items-filter-group">
            <label className="staff-items-filter-label">Status</label>
            <select
              className="staff-items-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
            >
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="staff-items-filter-group">
            <label className="staff-items-filter-label">Building</label>
            <select
              className="staff-items-select"
              value={buildingFilter}
              onChange={(e) => { setBuildingFilter(e.target.value); setCurrentPage(1) }}
            >
              {buildings.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="staff-items-filter-group">
            <label className="staff-items-filter-label">Sort</label>
            <select
              className="staff-items-select"
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1) }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </div>

      <div className="staff-items-table-wrap">
        <table className="staff-items-table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '15%' }} className="staff-items-col-hide-sm" />
            <col style={{ width: '15%' }} className="staff-items-col-hide-md" />
            <col style={{ width: '15%' }} className="staff-items-col-hide-sm" />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} className="staff-items-col-hide-sm" />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Item</th>
              <th className="staff-items-col-hide-sm">Category</th>
              <th className="staff-items-col-hide-md">Location</th>
              <th className="staff-items-col-hide-sm">Color</th>
              <th>Status</th>
              <th className="staff-items-col-hide-sm">Found</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map(item => (
                <tr key={item.item_id} onClick={() => navigate(`/staff/items/${item.item_id}`)}>
                  <td>
                    <div className="staff-items-name">{item.name}</div>
                    <div className="staff-items-id">ITEM-{item.item_id.slice(0, 8).toUpperCase()}</div>
                  </td>
                  <td className="staff-items-col-hide-sm">{item.category}</td>
                  <td className="staff-items-col-hide-md">{item.found_location}</td>
                  <td className="staff-items-col-hide-sm">
                    <div className="staff-items-color-chip">
                      <div
                        className="staff-items-color-dot"
                        style={{ backgroundColor: item.color_hex }}
                      />
                      <span className="staff-items-col-label">{item.color_bucket}</span>
                    </div>
                  </td>
                  <td>
                    <span className={statusBadgeClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td className="staff-items-date staff-items-col-hide-sm">{item.foundAt}</td>
                  <td>
                    <button
                      className="staff-items-action-btn"
                      onClick={(e) => { e.stopPropagation(); navigate(`/staff/items/${item.item_id}`) }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#90a4ae' }}>
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="staff-items-pagination">
          <span className="staff-items-pg-info">
            Showing {paginatedItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, sortedItems.length)} of {sortedItems.length} items
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
      </div>
    </div>
  )
}
