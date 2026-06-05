import { useState, useEffect, useCallback } from 'react'
import * as api from '../services/api'
import type { ReferenceUsage } from '../services/api'
import { ConfirmationDialog, ConfirmRow } from '../components/ConfirmationDialog'

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

type SettingsSection = 'categories' | 'buildings'

const CATEGORY_ACCENT_CLASSES = ['admin-cat-elec', 'admin-cat-cloth', 'admin-cat-pers', 'admin-cat-sport', 'admin-cat-other']

/** Stable accent color per category name — no icon storage needed */
function categoryAccentClass(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return CATEGORY_ACCENT_CLASSES[Math.abs(hash) % CATEGORY_ACCENT_CLASSES.length]
}

/** Tabler Icons (MIT) — https://tabler.io/icons */
const TABLER_ICONS = 'https://cdn.jsdelivr.net/npm/@tabler/icons@3.19.0/icons/outline'

function SettingsRowActions({
  onEdit,
  onDelete,
  deleteDisabled = false,
}: {
  onEdit: () => void
  onDelete: () => void
  deleteDisabled?: boolean
}) {
  return (
    <div className="admin-settings-hover-actions">
      <button
        type="button"
        className="admin-settings-icon-action admin-settings-icon-action-edit"
        onClick={onEdit}
        aria-label="Edit"
        title="Edit"
      >
        <img src={`${TABLER_ICONS}/pencil.svg`} alt="" width={15} height={15} />
      </button>
      <button
        type="button"
        className="admin-settings-icon-action admin-settings-icon-action-del"
        onClick={onDelete}
        disabled={deleteDisabled}
        aria-label="Delete"
        title="Delete"
      >
        <img src={`${TABLER_ICONS}/trash.svg`} alt="" width={15} height={15} />
      </button>
    </div>
  )
}

function parseRoomNumber(value: string): number | null | undefined {
  const trimmed = value.trim()
  if (!trimmed) return null
  const n = parseInt(trimmed, 10)
  if (!Number.isFinite(n)) throw new Error('Room number must be a valid number')
  return n
}

function isDuplicateRoomName(building: Building, name: string, excludeRoomId?: string): boolean {
  const normalized = name.trim().toLowerCase()
  if (!normalized) return false
  return building.rooms.some(
    (r) => r.room_id !== excludeRoomId && r.room_name.trim().toLowerCase() === normalized
  )
}

type PendingConfirm =
  | { action: 'delete-category'; id: string; name: string; usage: ReferenceUsage }
  | { action: 'save-category'; id: string; name: string; description: string }
  | { action: 'delete-building'; id: string; name: string; usage: ReferenceUsage }
  | { action: 'save-building'; id: string; name: string }
  | { action: 'delete-room'; id: string; name: string; usage: ReferenceUsage }
  | { action: 'save-room'; id: string; name: string; roomNum: string }
  | { action: 'add-room'; buildingId: string; name: string; roomNum: string }

export function SuperadminSettingsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [buildings, setBuildings] = useState<Building[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<SettingsSection>('categories')

  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [editingCatName, setEditingCatName] = useState('')
  const [editingCatDesc, setEditingCatDesc] = useState('')

  const [editingBldId, setEditingBldId] = useState<string | null>(null)
  const [editingBldName, setEditingBldName] = useState('')

  const [editingRoomId, setEditingRoomId] = useState<string | null>(null)
  const [editingRoomName, setEditingRoomName] = useState('')
  const [editingRoomNum, setEditingRoomNum] = useState('')

  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatDesc, setNewCatDesc] = useState('')

  const [showAddBuilding, setShowAddBuilding] = useState(false)
  const [newBldName, setNewBldName] = useState('')
  const [newBldAddr, setNewBldAddr] = useState('')

  const [addingRoomBldId, setAddingRoomBldId] = useState<string | null>(null)
  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomNum, setNewRoomNum] = useState('')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  /** Buildings start collapsed; id present = expanded */
  const [expandedBuildings, setExpandedBuildings] = useState<Record<string, boolean>>({})
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const totalRooms = buildings.reduce((n, b) => n + b.rooms.length, 0)

  const isBuildingExpanded = (buildingId: string) => !!expandedBuildings[buildingId]

  const toggleBuildingExpanded = (buildingId: string) => {
    setExpandedBuildings((prev) => ({ ...prev, [buildingId]: !prev[buildingId] }))
  }

  const expandBuilding = (buildingId: string) => {
    setExpandedBuildings((prev) => ({ ...prev, [buildingId]: true }))
  }

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const [cats, blds] = await Promise.all([api.getCategories(), api.getBuildings()])
      setCategories(cats)
      setBuildings(blds)
      setError(null)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load settings data')
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const withSave = async (fn: () => Promise<void>) => {
    setSaving(true)
    setError(null)
    try {
      await fn()
      await fetchAll(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleAddCategory = () =>
    withSave(async () => {
      if (!newCatName.trim()) throw new Error('Name is required')
      await api.createCategory({ name: newCatName.trim(), description: newCatDesc.trim() || undefined })
      setNewCatName('')
      setNewCatDesc('')
      setShowAddCategory(false)
    })

  const startEditCat = (cat: Category) => {
    setEditingCatId(cat.category_id)
    setEditingCatName(cat.name)
    setEditingCatDesc(cat.description ?? '')
  }

  const requestSaveCat = () => {
    if (!editingCatId || !editingCatName.trim()) {
      setError('Category name is required')
      return
    }
    setPendingConfirm({
      action: 'save-category',
      id: editingCatId,
      name: editingCatName.trim(),
      description: editingCatDesc.trim(),
    })
  }

  const requestDeleteCat = async (id: string, name: string) => {
    setConfirmLoading(true)
    setError(null)
    try {
      const usage = await api.getCategoryUsage(id)
      setPendingConfirm({ action: 'delete-category', id, name, usage })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not check category usage')
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleAddBuilding = () =>
    withSave(async () => {
      if (!newBldName.trim()) throw new Error('Name is required')
      await api.createBuilding({ name: newBldName.trim(), address: newBldAddr.trim() || undefined })
      setNewBldName('')
      setNewBldAddr('')
      setShowAddBuilding(false)
    })

  const startEditBld = (bld: Building) => {
    expandBuilding(bld.building_id)
    setEditingBldId(bld.building_id)
    setEditingBldName(bld.name)
  }

  const requestSaveBld = () => {
    if (!editingBldId || !editingBldName.trim()) {
      setError('Building name is required')
      return
    }
    setPendingConfirm({ action: 'save-building', id: editingBldId, name: editingBldName.trim() })
  }

  const requestDeleteBld = async (id: string, name: string) => {
    setConfirmLoading(true)
    setError(null)
    try {
      const usage = await api.getBuildingUsage(id)
      setPendingConfirm({ action: 'delete-building', id, name, usage })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not check building usage')
    } finally {
      setConfirmLoading(false)
    }
  }

  const requestAddRoom = (buildingId: string) => {
    if (!newRoomName.trim()) {
      setError('Room name is required')
      return
    }
    const bld = buildings.find((b) => b.building_id === buildingId)
    if (bld && isDuplicateRoomName(bld, newRoomName)) {
      setError(`A room named "${newRoomName.trim()}" already exists in ${bld.name}.`)
      return
    }
    setPendingConfirm({
      action: 'add-room',
      buildingId,
      name: newRoomName.trim(),
      roomNum: newRoomNum,
    })
  }

  const startEditRoom = (room: Room) => {
    expandBuilding(room.building_id)
    setEditingRoomId(room.room_id)
    setEditingRoomName(room.room_name)
    setEditingRoomNum(room.room_number != null ? String(room.room_number) : '')
  }

  const requestSaveRoom = () => {
    if (!editingRoomId || !editingRoomName.trim()) {
      setError('Room name is required')
      return
    }
    const bld = buildings.find((b) => b.rooms.some((r) => r.room_id === editingRoomId))
    if (bld && isDuplicateRoomName(bld, editingRoomName, editingRoomId)) {
      setError(`A room named "${editingRoomName.trim()}" already exists in ${bld.name}.`)
      return
    }
    setPendingConfirm({
      action: 'save-room',
      id: editingRoomId,
      name: editingRoomName.trim(),
      roomNum: editingRoomNum,
    })
  }

  const requestDeleteRoom = async (id: string, name: string) => {
    setConfirmLoading(true)
    setError(null)
    try {
      const usage = await api.getRoomUsage(id)
      setPendingConfirm({ action: 'delete-room', id, name, usage })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not check room usage')
    } finally {
      setConfirmLoading(false)
    }
  }

  const executeConfirm = async () => {
    if (!pendingConfirm) return
    const action = pendingConfirm
    setPendingConfirm(null)

    switch (action.action) {
      case 'save-category':
        await withSave(async () => {
          await api.updateCategory(action.id, {
            name: action.name,
            description: action.description || undefined,
          })
          setEditingCatId(null)
        })
        break
      case 'delete-category':
        await withSave(() => api.deleteCategory(action.id) as Promise<void>)
        break
      case 'save-building':
        await withSave(async () => {
          await api.updateBuilding(action.id, { name: action.name })
          setEditingBldId(null)
        })
        break
      case 'delete-building':
        await withSave(() => api.deleteBuilding(action.id) as Promise<void>)
        break
      case 'save-room':
        await withSave(async () => {
          const num = parseRoomNumber(action.roomNum)
          await api.updateRoom(action.id, { room_name: action.name, room_number: num })
          setEditingRoomId(null)
        })
        break
      case 'delete-room':
        await withSave(() => api.deleteRoom(action.id) as Promise<void>)
        break
      case 'add-room':
        await withSave(async () => {
          const num = action.roomNum.trim() ? parseRoomNumber(action.roomNum) : undefined
          await api.createRoom(action.buildingId, {
            room_name: action.name,
            room_number: num ?? undefined,
          })
          setNewRoomName('')
          setNewRoomNum('')
          setAddingRoomBldId(null)
        })
        break
    }
  }

  const getConfirmButtonLabel = (pending: PendingConfirm): string => {
    if (pending.action === 'delete-category') return pending.usage.canDelete ? 'Delete category' : 'Cannot delete'
    if (pending.action === 'delete-building') return pending.usage.canDelete ? 'Delete building' : 'Cannot delete'
    if (pending.action === 'delete-room') return pending.usage.canDelete ? 'Delete room' : 'Cannot delete'
    return 'Save changes'
  }

  const isConfirmDisabled = (pending: PendingConfirm): boolean => {
    if (pending.action === 'delete-category') return !pending.usage.canDelete || saving
    if (pending.action === 'delete-building') return !pending.usage.canDelete || saving
    if (pending.action === 'delete-room') return !pending.usage.canDelete || saving
    return saving
  }

  if (loading) {
    return (
      <main className="staff-dashboard-main" style={{ padding: '3rem', textAlign: 'center', color: '#90a4ae' }}>
        Loading settings…
      </main>
    )
  }

  return (
    <main className="staff-dashboard-main">
      <div className="staff-dashboard-page admin-settings-page-wrap">
        <div className="staff-dashboard-header">
          <h1 className="staff-dashboard-title">Settings</h1>
          <p className="staff-dashboard-subtitle">Manage categories, buildings, and rooms</p>
        </div>

      <div className="admin-settings-layout">
        <aside className="admin-settings-sidebar">
          <div className="admin-settings-sidebar-group">
            <div className="admin-settings-sidebar-label">Lookup data</div>
            <button
              type="button"
              className={`admin-settings-sidebar-link${activeSection === 'categories' ? ' admin-settings-sidebar-link-active' : ''}`}
              onClick={() => setActiveSection('categories')}
            >
              Categories
            </button>
            <button
              type="button"
              className={`admin-settings-sidebar-link${activeSection === 'buildings' ? ' admin-settings-sidebar-link-active' : ''}`}
              onClick={() => setActiveSection('buildings')}
            >
              Buildings &amp; rooms
            </button>
          </div>
        </aside>

        <div className="admin-settings-main">
          {error && <div className="staff-manage-error">{error}</div>}
          {saving && <div className="admin-settings-saving-hint">Saving changes…</div>}

          {activeSection === 'categories' && (
            <div className="staff-card admin-settings-section-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Categories</span>
                <span className="admin-section-count">{categories.length} total</span>
                <button
                  type="button"
                  className="staff-manage-add-btn"
                  onClick={() => setShowAddCategory((v) => !v)}
                >
                  + Add category
                </button>
              </div>

              <div className="admin-category-grid">
                {categories.map((cat) => {
                  const accent = categoryAccentClass(cat.name)
                  const isEditing = editingCatId === cat.category_id

                  return (
                    <div
                      key={cat.category_id}
                      className={`admin-category-card ${accent}${isEditing ? ' admin-category-card-editing' : ''}`}
                    >
                      {isEditing ? (
                        <div className="admin-category-card-edit">
                          <input
                            className="staff-manage-input"
                            value={editingCatName}
                            onChange={(e) => setEditingCatName(e.target.value)}
                            placeholder="Name"
                          />
                          <input
                            className="staff-manage-input"
                            value={editingCatDesc}
                            onChange={(e) => setEditingCatDesc(e.target.value)}
                            placeholder="Description"
                          />
                          <div className="admin-category-card-edit-actions">
                            <button type="button" className="staff-manage-save-btn" onClick={requestSaveCat} disabled={saving}>
                              Save
                            </button>
                            <button type="button" className="staff-manage-cancel-btn" onClick={() => setEditingCatId(null)}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="admin-category-card-top">
                            <h3 className="admin-category-card-name">{cat.name}</h3>
                            <SettingsRowActions
                              onEdit={() => startEditCat(cat)}
                              onDelete={() => requestDeleteCat(cat.category_id, cat.name)}
                              deleteDisabled={confirmLoading}
                            />
                          </div>
                          <p className="admin-category-card-desc">
                            {cat.description || 'No description'}
                          </p>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>

              {categories.length === 0 && !showAddCategory && (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.25rem 1rem 0' }}>No categories yet</p>
              )}

              {showAddCategory && (
                <div className="admin-category-add-panel">
                  <p className="admin-category-add-label">New category</p>
                  <div className="admin-settings-inline-add">
                    <input
                      className="staff-manage-input"
                      placeholder="Category name *"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                    />
                    <input
                      className="staff-manage-input"
                      placeholder="Description (optional)"
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                    />
                    <button type="button" className="staff-manage-add-btn" onClick={handleAddCategory} disabled={saving || !newCatName.trim()}>
                      Add
                    </button>
                    <button
                      type="button"
                      className="staff-manage-cancel-btn"
                      onClick={() => {
                        setShowAddCategory(false)
                        setNewCatName('')
                        setNewCatDesc('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'buildings' && (
            <div className="staff-card admin-settings-section-card">
              <div className="staff-card-head">
                <span className="staff-card-title">Buildings &amp; rooms</span>
                <span className="admin-section-count">
                  {buildings.length} building{buildings.length === 1 ? '' : 's'} · {totalRooms} room{totalRooms === 1 ? '' : 's'}
                </span>
                <button type="button" className="staff-manage-add-btn" onClick={() => setShowAddBuilding((v) => !v)}>
                  + Add building
                </button>
              </div>

              {showAddBuilding && (
                <div className="admin-settings-inline-add">
                  <input
                    className="staff-manage-input"
                    placeholder="Building name *"
                    value={newBldName}
                    onChange={(e) => setNewBldName(e.target.value)}
                  />
                  <input
                    className="staff-manage-input"
                    placeholder="Address (optional)"
                    value={newBldAddr}
                    onChange={(e) => setNewBldAddr(e.target.value)}
                  />
                  <button type="button" className="staff-manage-add-btn" onClick={handleAddBuilding} disabled={saving || !newBldName.trim()}>
                    Add
                  </button>
                  <button
                    type="button"
                    className="staff-manage-cancel-btn"
                    onClick={() => {
                      setShowAddBuilding(false)
                      setNewBldName('')
                      setNewBldAddr('')
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="admin-building-grid">
                {buildings.map((bld) => {
                  const expanded = isBuildingExpanded(bld.building_id)
                  return (
                  <div
                    key={bld.building_id}
                    className={`admin-building-card${expanded ? ' admin-building-card-expanded' : ' admin-building-card-collapsed'}`}
                  >
                    <div className="admin-building-card-head">
                      {editingBldId === bld.building_id ? (
                        <div className="admin-settings-inline-edit admin-settings-inline-edit-compact">
                          <input
                            className="staff-manage-input"
                            value={editingBldName}
                            onChange={(e) => setEditingBldName(e.target.value)}
                          />
                          <button type="button" className="staff-manage-save-btn" onClick={requestSaveBld} disabled={saving}>
                            Save
                          </button>
                          <button type="button" className="staff-manage-cancel-btn" onClick={() => setEditingBldId(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="admin-building-toggle"
                            onClick={() => toggleBuildingExpanded(bld.building_id)}
                            aria-expanded={expanded}
                            aria-label={expanded ? `Collapse ${bld.name}` : `Expand ${bld.name}`}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                              className={expanded ? 'admin-building-chevron-up' : 'admin-building-chevron-down'}
                            >
                              <path d="M3 5.5L7 9.5L11 5.5" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="admin-building-card-name-btn"
                            onClick={() => toggleBuildingExpanded(bld.building_id)}
                          >
                            <span className="admin-building-card-name">{bld.name}</span>
                            <span className="admin-building-room-count">
                              {bld.rooms.length} room{bld.rooms.length === 1 ? '' : 's'}
                            </span>
                          </button>
                          <SettingsRowActions
                            onEdit={() => startEditBld(bld)}
                            onDelete={() => requestDeleteBld(bld.building_id, bld.name)}
                            deleteDisabled={confirmLoading}
                          />
                        </>
                      )}
                    </div>

                    {expanded && bld.rooms.map((room) => (
                      <div key={room.room_id} className="admin-building-room">
                        {editingRoomId === room.room_id ? (
                          <div className="admin-settings-inline-edit admin-settings-inline-edit-compact">
                            <input
                              className="staff-manage-input staff-manage-input-sm"
                              placeholder="Room #"
                              value={editingRoomNum}
                              onChange={(e) => setEditingRoomNum(e.target.value)}
                              type="number"
                            />
                            <input
                              className="staff-manage-input"
                              value={editingRoomName}
                              onChange={(e) => setEditingRoomName(e.target.value)}
                            />
                            <button type="button" className="staff-manage-save-btn" onClick={requestSaveRoom} disabled={saving}>
                              Save
                            </button>
                            <button type="button" className="staff-manage-cancel-btn" onClick={() => setEditingRoomId(null)}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="admin-building-room-name">
                              {room.room_number != null ? `Room ${room.room_number}` : room.room_name}
                              {room.room_number != null && room.room_name ? ` — ${room.room_name}` : ''}
                            </span>
                            <SettingsRowActions
                              onEdit={() => startEditRoom(room)}
                              onDelete={() => requestDeleteRoom(room.room_id, room.room_name)}
                              deleteDisabled={confirmLoading}
                            />
                          </>
                        )}
                      </div>
                    ))}

                    {expanded && addingRoomBldId === bld.building_id ? (
                      <div className="admin-settings-inline-add admin-settings-inline-add-room">
                        <input
                          className="staff-manage-input staff-manage-input-sm"
                          placeholder="Room #"
                          value={newRoomNum}
                          onChange={(e) => setNewRoomNum(e.target.value)}
                          type="number"
                        />
                        <input
                          className="staff-manage-input"
                          placeholder="Room name *"
                          value={newRoomName}
                          onChange={(e) => setNewRoomName(e.target.value)}
                        />
                        <button
                          type="button"
                          className="staff-manage-add-btn"
                          onClick={() => requestAddRoom(bld.building_id)}
                          disabled={saving || !newRoomName.trim()}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="staff-manage-cancel-btn"
                          onClick={() => {
                            setAddingRoomBldId(null)
                            setNewRoomName('')
                            setNewRoomNum('')
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : expanded ? (
                      <button
                        type="button"
                        className="admin-building-add-room"
                        onClick={() => {
                          expandBuilding(bld.building_id)
                          setAddingRoomBldId(bld.building_id)
                          setNewRoomName('')
                          setNewRoomNum('')
                        }}
                      >
                        + Add room
                      </button>
                    ) : null}
                  </div>
                  )
                })}
              </div>

              {buildings.length === 0 && (
                <p style={{ color: '#90a4ae', fontSize: '0.85rem', padding: '1.5rem 1rem' }}>No buildings yet. Add a building to get started.</p>
              )}
            </div>
          )}

        </div>
      </div>
      </div>

      {pendingConfirm && (
        <ConfirmationDialog
          isOpen
          title={
            pendingConfirm.action.startsWith('delete')
              ? 'Confirm deletion'
              : 'Confirm changes'
          }
          sections={[
            {
              title: 'Details',
              content: (
                <>
                  {pendingConfirm.action === 'delete-category' && (
                    <>
                      <ConfirmRow label="Category" value={pendingConfirm.name} />
                      <ConfirmRow label="Linked items" value={String(pendingConfirm.usage.totalItems)} />
                      {pendingConfirm.usage.activeItems !== pendingConfirm.usage.totalItems && (
                        <ConfirmRow label="Active items" value={String(pendingConfirm.usage.activeItems)} />
                      )}
                      {!pendingConfirm.usage.canDelete && pendingConfirm.usage.blockReason && (
                        <p className="admin-settings-confirm-warning">{pendingConfirm.usage.blockReason}</p>
                      )}
                      {pendingConfirm.usage.canDelete && (
                        <p className="admin-settings-confirm-note">This action cannot be undone.</p>
                      )}
                    </>
                  )}
                  {pendingConfirm.action === 'save-category' && (
                    <>
                      <ConfirmRow label="Name" value={pendingConfirm.name} />
                      <ConfirmRow label="Description" value={pendingConfirm.description || '—'} />
                    </>
                  )}
                  {pendingConfirm.action === 'delete-building' && (
                    <>
                      <ConfirmRow label="Building" value={pendingConfirm.name} />
                      {(pendingConfirm.usage.roomCount ?? 0) > 0 && (
                        <ConfirmRow label="Rooms" value={String(pendingConfirm.usage.roomCount)} />
                      )}
                      <ConfirmRow label="Linked items" value={String(pendingConfirm.usage.totalItems)} />
                      {!pendingConfirm.usage.canDelete && pendingConfirm.usage.blockReason && (
                        <p className="admin-settings-confirm-warning">{pendingConfirm.usage.blockReason}</p>
                      )}
                      {pendingConfirm.usage.canDelete && (pendingConfirm.usage.roomCount ?? 0) > 0 && (
                        <p className="admin-settings-confirm-note">
                          All {pendingConfirm.usage.roomCount} room(s) in this building will also be removed.
                        </p>
                      )}
                      {pendingConfirm.usage.canDelete && (
                        <p className="admin-settings-confirm-note">This action cannot be undone.</p>
                      )}
                    </>
                  )}
                  {pendingConfirm.action === 'save-building' && (
                    <ConfirmRow label="Building name" value={pendingConfirm.name} />
                  )}
                  {pendingConfirm.action === 'delete-room' && (
                    <>
                      <ConfirmRow label="Room" value={pendingConfirm.name} />
                      <ConfirmRow label="Linked items" value={String(pendingConfirm.usage.totalItems)} />
                      {!pendingConfirm.usage.canDelete && pendingConfirm.usage.blockReason && (
                        <p className="admin-settings-confirm-warning">{pendingConfirm.usage.blockReason}</p>
                      )}
                      {pendingConfirm.usage.canDelete && (
                        <p className="admin-settings-confirm-note">This action cannot be undone.</p>
                      )}
                    </>
                  )}
                  {(pendingConfirm.action === 'save-room' || pendingConfirm.action === 'add-room') && (
                    <>
                      <ConfirmRow label="Room name" value={pendingConfirm.name} />
                      {pendingConfirm.roomNum.trim() && (
                        <ConfirmRow label="Room number" value={pendingConfirm.roomNum.trim()} />
                      )}
                      <p className="admin-settings-confirm-note">
                        Room names must be unique within each building.
                      </p>
                    </>
                  )}
                </>
              ),
            },
          ]}
          onCancel={() => setPendingConfirm(null)}
          onConfirm={executeConfirm}
          cancelText="Cancel"
          confirmText={getConfirmButtonLabel(pendingConfirm)}
          confirmVariant={pendingConfirm.action.startsWith('delete') ? 'reject' : 'primary'}
          isConfirmDisabled={isConfirmDisabled(pendingConfirm)}
        />
      )}
    </main>
  )
}
