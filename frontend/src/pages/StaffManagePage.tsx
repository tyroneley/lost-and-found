import { useState, useEffect, useCallback } from 'react'
import * as api from '../services/api'

interface Category {
  category_id: string
  name: string
  description?: string
}

interface Room {
  room_id: string
  room_number?: number | null
  room_name: string
  building_id: string
}

interface Building {
  building_id: string
  name: string
  address?: string
  rooms: Room[]
}

type Section = 'categories' | 'buildings' | 'rooms'

export function StaffManagePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<Section>('categories')

  // Edit state
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [editingCatName, setEditingCatName] = useState('')
  const [editingCatDesc, setEditingCatDesc] = useState('')

  const [editingBldId, setEditingBldId] = useState<string | null>(null)
  const [editingBldName, setEditingBldName] = useState('')
  const [editingBldAddr, setEditingBldAddr] = useState('')

  const [editingRoomId, setEditingRoomId] = useState<string | null>(null)
  const [editingRoomName, setEditingRoomName] = useState('')
  const [editingRoomNum, setEditingRoomNum] = useState('')

  // Add state
  const [newCatName, setNewCatName] = useState('')
  const [newCatDesc, setNewCatDesc] = useState('')

  const [newBldName, setNewBldName] = useState('')
  const [newBldAddr, setNewBldAddr] = useState('')

  const [newRoomBldId, setNewRoomBldId] = useState('')
  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomNum, setNewRoomNum] = useState('')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [cats, blds] = await Promise.all([api.getCategories(), api.getBuildings()])
      setCategories(cats)
      setBuildings(blds)
      if (!newRoomBldId && blds.length > 0) setNewRoomBldId(blds[0].building_id)
    } catch (e) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [newRoomBldId])

  useEffect(() => { fetchAll() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const withSave = async (fn: () => Promise<void>) => {
    setSaving(true)
    setError(null)
    try {
      await fn()
      await fetchAll()
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  // ── Category handlers ──────────────────────────────────────────────────────

  const handleAddCategory = () => withSave(async () => {
    if (!newCatName.trim()) throw new Error('Name is required')
    await api.createCategory({ name: newCatName.trim(), description: newCatDesc.trim() || undefined })
    setNewCatName('')
    setNewCatDesc('')
  })

  const startEditCat = (cat: Category) => {
    setEditingCatId(cat.category_id)
    setEditingCatName(cat.name)
    setEditingCatDesc(cat.description ?? '')
  }

  const handleSaveCat = () => withSave(async () => {
    if (!editingCatId) return
    await api.updateCategory(editingCatId, { name: editingCatName.trim(), description: editingCatDesc.trim() || undefined })
    setEditingCatId(null)
  })

  const handleDeleteCat = (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? This cannot be undone.`)) return
    withSave(() => api.deleteCategory(id) as Promise<void>)
  }

  // ── Building handlers ──────────────────────────────────────────────────────

  const handleAddBuilding = () => withSave(async () => {
    if (!newBldName.trim()) throw new Error('Name is required')
    await api.createBuilding({ name: newBldName.trim(), address: newBldAddr.trim() || undefined })
    setNewBldName('')
    setNewBldAddr('')
  })

  const startEditBld = (bld: Building) => {
    setEditingBldId(bld.building_id)
    setEditingBldName(bld.name)
    setEditingBldAddr(bld.address ?? '')
  }

  const handleSaveBld = () => withSave(async () => {
    if (!editingBldId) return
    await api.updateBuilding(editingBldId, { name: editingBldName.trim(), address: editingBldAddr.trim() || undefined })
    setEditingBldId(null)
  })

  const handleDeleteBld = (id: string, name: string) => {
    if (!confirm(`Delete building "${name}" and all its rooms? This cannot be undone.`)) return
    withSave(() => api.deleteBuilding(id) as Promise<void>)
  }

  // ── Room handlers ──────────────────────────────────────────────────────────

  const handleAddRoom = () => withSave(async () => {
    if (!newRoomBldId) throw new Error('Select a building')
    if (!newRoomName.trim()) throw new Error('Room name is required')
    const num = newRoomNum.trim() ? parseInt(newRoomNum.trim(), 10) : undefined
    await api.createRoom(newRoomBldId, { room_name: newRoomName.trim(), room_number: num })
    setNewRoomName('')
    setNewRoomNum('')
  })

  const startEditRoom = (room: Room) => {
    setEditingRoomId(room.room_id)
    setEditingRoomName(room.room_name)
    setEditingRoomNum(room.room_number != null ? String(room.room_number) : '')
  }

  const handleSaveRoom = () => withSave(async () => {
    if (!editingRoomId) return
    const num = editingRoomNum.trim() ? parseInt(editingRoomNum.trim(), 10) : null
    await api.updateRoom(editingRoomId, { room_name: editingRoomName.trim(), room_number: num })
    setEditingRoomId(null)
  })

  const handleDeleteRoom = (id: string, name: string) => {
    if (!confirm(`Delete room "${name}"? This cannot be undone.`)) return
    withSave(() => api.deleteRoom(id) as Promise<void>)
  }

  if (loading) {
    return (
      <div className="staff-manage-page">
        <div style={{ padding: '3rem', textAlign: 'center', color: '#90a4ae' }}>Loading…</div>
      </div>
    )
  }

  return (
    <div className="staff-manage-page">
      <div className="staff-manage-header">
        <div>
          <h1 className="staff-manage-title">Manage Reference Data</h1>
          <p className="staff-manage-subtitle">Add, edit, or remove categories, buildings, and rooms</p>
        </div>
      </div>

      {error && (
        <div className="staff-manage-error">{error}</div>
      )}

      {/* Section tabs */}
      <div className="staff-manage-tabs">
        {(['categories', 'buildings', 'rooms'] as Section[]).map(s => (
          <button
            key={s}
            className={`staff-manage-tab${activeSection === s ? ' staff-manage-tab-active' : ''}`}
            onClick={() => setActiveSection(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="staff-manage-tab-count">
              {s === 'categories' ? categories.length
                : s === 'buildings' ? buildings.length
                : buildings.reduce((n, b) => n + b.rooms.length, 0)}
            </span>
          </button>
        ))}
      </div>

      {/* ── CATEGORIES ─────────────────────────────────────────────────────── */}
      {activeSection === 'categories' && (
        <div className="staff-card">
          <div className="staff-card-head">
            <span className="staff-card-title">Categories</span>
          </div>

          <table className="staff-manage-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.category_id}>
                  {editingCatId === cat.category_id ? (
                    <>
                      <td>
                        <input
                          className="staff-manage-input"
                          value={editingCatName}
                          onChange={e => setEditingCatName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="staff-manage-input"
                          value={editingCatDesc}
                          onChange={e => setEditingCatDesc(e.target.value)}
                          placeholder="Optional description"
                        />
                      </td>
                      <td>
                        <div className="staff-manage-row-actions">
                          <button className="staff-manage-save-btn" onClick={handleSaveCat} disabled={saving}>Save</button>
                          <button className="staff-manage-cancel-btn" onClick={() => setEditingCatId(null)}>Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="staff-manage-name">{cat.name}</td>
                      <td className="staff-manage-meta">{cat.description || '—'}</td>
                      <td>
                        <div className="staff-manage-row-actions">
                          <button className="staff-manage-edit-btn" onClick={() => startEditCat(cat)}>Edit</button>
                          <button className="staff-manage-delete-btn" onClick={() => handleDeleteCat(cat.category_id, cat.name)}>Delete</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan={3} className="staff-manage-empty">No categories yet</td></tr>
              )}
            </tbody>
          </table>

          <div className="staff-manage-add-form">
            <span className="staff-manage-add-label">Add category</span>
            <div className="staff-manage-add-row">
              <input
                className="staff-manage-input"
                placeholder="Name *"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
              />
              <input
                className="staff-manage-input"
                placeholder="Description (optional)"
                value={newCatDesc}
                onChange={e => setNewCatDesc(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
              />
              <button className="staff-manage-add-btn" onClick={handleAddCategory} disabled={saving || !newCatName.trim()}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── BUILDINGS ──────────────────────────────────────────────────────── */}
      {activeSection === 'buildings' && (
        <div className="staff-card">
          <div className="staff-card-head">
            <span className="staff-card-title">Buildings</span>
          </div>

          <table className="staff-manage-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Rooms</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {buildings.map(bld => (
                <tr key={bld.building_id}>
                  {editingBldId === bld.building_id ? (
                    <>
                      <td>
                        <input
                          className="staff-manage-input"
                          value={editingBldName}
                          onChange={e => setEditingBldName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="staff-manage-input"
                          value={editingBldAddr}
                          onChange={e => setEditingBldAddr(e.target.value)}
                          placeholder="Optional address"
                        />
                      </td>
                      <td className="staff-manage-meta">{bld.rooms.length}</td>
                      <td>
                        <div className="staff-manage-row-actions">
                          <button className="staff-manage-save-btn" onClick={handleSaveBld} disabled={saving}>Save</button>
                          <button className="staff-manage-cancel-btn" onClick={() => setEditingBldId(null)}>Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="staff-manage-name">{bld.name}</td>
                      <td className="staff-manage-meta">{bld.address || '—'}</td>
                      <td className="staff-manage-meta">{bld.rooms.length}</td>
                      <td>
                        <div className="staff-manage-row-actions">
                          <button className="staff-manage-edit-btn" onClick={() => startEditBld(bld)}>Edit</button>
                          <button className="staff-manage-delete-btn" onClick={() => handleDeleteBld(bld.building_id, bld.name)}>Delete</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {buildings.length === 0 && (
                <tr><td colSpan={4} className="staff-manage-empty">No buildings yet</td></tr>
              )}
            </tbody>
          </table>

          <div className="staff-manage-add-form">
            <span className="staff-manage-add-label">Add building</span>
            <div className="staff-manage-add-row">
              <input
                className="staff-manage-input"
                placeholder="Name *"
                value={newBldName}
                onChange={e => setNewBldName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddBuilding()}
              />
              <input
                className="staff-manage-input"
                placeholder="Address (optional)"
                value={newBldAddr}
                onChange={e => setNewBldAddr(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddBuilding()}
              />
              <button className="staff-manage-add-btn" onClick={handleAddBuilding} disabled={saving || !newBldName.trim()}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ROOMS ──────────────────────────────────────────────────────────── */}
      {activeSection === 'rooms' && (
        <div className="staff-card">
          <div className="staff-card-head">
            <span className="staff-card-title">Rooms</span>
          </div>

          {buildings.map(bld => (
            <div key={bld.building_id} className="staff-manage-bld-group">
              <div className="staff-manage-bld-label">{bld.name}</div>
              <table className="staff-manage-table">
                <thead>
                  <tr>
                    <th style={{ width: '120px' }}>Room #</th>
                    <th>Room Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bld.rooms.map(room => (
                    <tr key={room.room_id}>
                      {editingRoomId === room.room_id ? (
                        <>
                          <td>
                            <input
                              className="staff-manage-input staff-manage-input-sm"
                              placeholder="e.g. 601"
                              value={editingRoomNum}
                              onChange={e => setEditingRoomNum(e.target.value)}
                              type="number"
                            />
                          </td>
                          <td>
                            <input
                              className="staff-manage-input"
                              value={editingRoomName}
                              onChange={e => setEditingRoomName(e.target.value)}
                            />
                          </td>
                          <td>
                            <div className="staff-manage-row-actions">
                              <button className="staff-manage-save-btn" onClick={handleSaveRoom} disabled={saving}>Save</button>
                              <button className="staff-manage-cancel-btn" onClick={() => setEditingRoomId(null)}>Cancel</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="staff-manage-meta">{room.room_number ?? '—'}</td>
                          <td className="staff-manage-name">{room.room_name}</td>
                          <td>
                            <div className="staff-manage-row-actions">
                              <button className="staff-manage-edit-btn" onClick={() => startEditRoom(room)}>Edit</button>
                              <button className="staff-manage-delete-btn" onClick={() => handleDeleteRoom(room.room_id, room.room_name)}>Delete</button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {bld.rooms.length === 0 && (
                    <tr><td colSpan={3} className="staff-manage-empty">No rooms</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ))}

          {buildings.length === 0 && (
            <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1rem' }}>
              Add buildings first before adding rooms.
            </p>
          )}

          {buildings.length > 0 && (
            <div className="staff-manage-add-form">
              <span className="staff-manage-add-label">Add room</span>
              <div className="staff-manage-add-row">
                <select
                  className="staff-manage-select"
                  value={newRoomBldId}
                  onChange={e => setNewRoomBldId(e.target.value)}
                >
                  {buildings.map(b => (
                    <option key={b.building_id} value={b.building_id}>{b.name}</option>
                  ))}
                </select>
                <input
                  className="staff-manage-input staff-manage-input-sm"
                  placeholder="Room # (optional)"
                  value={newRoomNum}
                  onChange={e => setNewRoomNum(e.target.value)}
                  type="number"
                />
                <input
                  className="staff-manage-input"
                  placeholder="Room name *"
                  value={newRoomName}
                  onChange={e => setNewRoomName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddRoom()}
                />
                <button className="staff-manage-add-btn" onClick={handleAddRoom} disabled={saving || !newRoomName.trim()}>
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
