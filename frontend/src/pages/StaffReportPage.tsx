import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemCard } from '../components/ItemCard'
import { ConfirmationDialog, ConfirmRow, ConfirmColorRow } from '../components/ConfirmationDialog'
import { useStaffToast } from '../components/StaffToast'
import { createItem, getCategories, getBuildings, uploadItemPhoto } from '../services/api'

interface Room {
  room_id: string
  room_number?: string
  room_name: string
}

interface Building {
  building_id: string
  name: string
  rooms?: Room[]
}

interface Category {
  category_id: string
  name: string
}

interface ReportFormState {
  itemName: string
  category: string
  colorHex: string
  description: string
  building: string
  roomId: string
  dateFound: string
  timeFound: string
  photos: File[]
  finderName: string
  finderContact: string
  finderAffiliation: string
}

// Color bucket mapping - maps hex colors to named color categories
const hexToColorBucket = (hex: string): string => {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 255
  const g = (rgb >> 8) & 255
  const b = rgb & 255

  // Normalize RGB to 0-1
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  // Calculate HSL
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)
        break
      case gNorm:
        h = (bNorm - rNorm) / d + 2
        break
      case bNorm:
        h = (rNorm - gNorm) / d + 4
        break
    }
    h /= 6
  }

  // Convert to degrees (0-360)
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  const lPercent = Math.round(l * 100)

  // Map HSL to color buckets
  if (lPercent < 15) return 'Black'
  if (lPercent > 85) return 'White'
  if (s < 10) return 'Grey'

  if (h >= 0 && h < 15) return 'Red'
  if (h >= 15 && h < 45) return 'Orange'
  if (h >= 45 && h < 65) return 'Yellow'
  if (h >= 65 && h < 150) return 'Green'
  if (h >= 150 && h < 200) return 'Blue'
  if (h >= 200 && h < 280) return 'Purple'
  if (h >= 280 && h < 330) return 'Pink'
  return 'Red' // Default for remaining hues
}

export function StaffReportPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<ReportFormState>({
    itemName: '',
    category: '',
    colorHex: '#2563eb',
    description: '',
    building: '',
    roomId: '',
    dateFound: '',
    timeFound: '',
    photos: [],
    finderName: '',
    finderContact: '',
    finderAffiliation: '',
  })

  const [photoPreview, setPhotoPreview] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [buildings, setBuildings] = useState<Building[]>([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const { showSuccess, showError, Toast } = useStaffToast()

  // Fetch categories and buildings on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [cats, bldgs] = await Promise.all([getCategories(), getBuildings()])
        setCategories(cats)
        setBuildings(bldgs)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load form data'
        showError(`Failed to load categories and buildings: ${message}`)
      }
    }
    fetchMetadata()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setForm(prev => ({ ...prev, photos: [...prev.photos, ...files] }))
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(prev => [...prev, event.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index: number) => {
    setForm(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }))
    setPhotoPreview(prev => prev.filter((_, i) => i !== index))
  }

  const getCompletionStatus = () => {
    const checks = [
      { name: 'Item name', done: !!form.itemName },
      { name: 'Category', done: !!form.category },
      { name: 'Color', done: !!form.colorHex },
      { name: 'Description', done: !!form.description },
      {
        name: 'Location',
        done: !!form.building && !!form.roomId,
      },
      { name: 'Date found', done: !!form.dateFound },
      { name: 'At least 1 photo', done: form.photos.length > 0 },
      { name: 'Finder name', done: !!form.finderName },
      { name: 'Finder contact', done: !!form.finderContact },
      { name: 'Finder affiliation', done: !!form.finderAffiliation },
    ]
    return checks
  }

  const isFormComplete = getCompletionStatus().every(c => c.done)

  // Derive location display string from buildings state + selected roomId
  const getLocationDisplay = (): string => {
    if (!form.building) return 'Location'
    const selectedBuilding = buildings.find(b => b.name === form.building)
    const selectedRoom = selectedBuilding?.rooms?.find(r => r.room_id === form.roomId)
    if (!selectedRoom) return form.building
    const roomLabel = selectedRoom.room_number
      ? `${selectedRoom.room_number} — ${selectedRoom.room_name}`
      : selectedRoom.room_name
    return `${form.building}, ${roomLabel}`
  }

  // Get date constraints for "date found" field
  const getDateConstraints = () => {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const maxDate = today.toISOString().split('T')[0] // Today

    const minDate = new Date(today)
    minDate.setDate(minDate.getDate() - 90) // 90 days ago
    const minDateStr = minDate.toISOString().split('T')[0]

    return { min: minDateStr, max: maxDate }
  }

  const handleOpenConfirmDialog = () => {
    if (!isFormComplete) {
      showError('Please complete all required fields')
      return
    }
    setShowConfirmDialog(true)
  }

  const handleConfirmSubmit = async () => {
    if (!isFormComplete) {
      showError('Please complete all required fields')
      return
    }

    setShowConfirmDialog(false)
    setSubmitting(true)
    try {
      const category = categories.find(c => c.name === form.category)
      if (!category) throw new Error('Category not found')

      const building = buildings.find(b => b.name === form.building)
      if (!building) throw new Error('Building not found')

      const time = form.timeFound ? `${form.timeFound}:00.000` : '00:00:00.000'
      const foundAt = `${form.dateFound}T${time}Z`

      const itemData = {
        name: form.itemName,
        description: form.description,
        category_id: category.category_id,
        building_id: building.building_id,
        room_id: form.roomId || undefined,
        color_hex: form.colorHex,
        found_at: foundAt,
        found_time_known: !!form.timeFound,
        finder_name: form.finderName || undefined,
        finder_contact: form.finderContact || undefined,
        finder_affiliation: form.finderAffiliation || undefined,
      }

      const createdItem = await createItem(itemData) as any

      // Upload photos to the created item
      let photoErrors = 0
      if (form.photos.length > 0) {
        const photoUploadResults = await Promise.allSettled(
          form.photos.map(file => uploadItemPhoto(createdItem.item_id, file))
        )
        photoErrors = photoUploadResults.filter(r => r.status === 'rejected').length
      }

      if (photoErrors > 0) {
        showError(`Item created, but ${photoErrors} photo(s) failed to upload. You can add photos later.`)
      } else {
        showSuccess('Item recorded successfully!')
      }
      // Delay redirect to allow toast to display (form stays visible for better UX)
      setTimeout(() => navigate('/staff'), 1500)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit item'
      showError(
        message.includes('Internal server error')
          ? 'Server error while saving the item. Make sure you are logged in as staff and the backend is running.'
          : message
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancelConfirmDialog = () => {
    setShowConfirmDialog(false)
  }

  return (
    <div className="staff-report-layout">
      <div className="staff-report-main">
        <div className="staff-report-breadcrumb">
          <button onClick={() => navigate('/staff')} className="staff-report-breadcrumb-link">Dashboard</button> <span>/ Record found item</span>
        </div>
        <div className="staff-report-header">
          <h1 className="staff-report-title">Record a found item</h1>
          <p className="staff-report-subtitle">Fill in the details as accurately as possible. The record will be submitted to ISS admin for approval before going live.</p>
        </div>

        {/* Item Details */}
        <div className="staff-report-section">
          <h2 className="staff-report-section-title">Item details</h2>

          <div className="staff-report-field">
            <label>
              Item name <span className="staff-report-required">*</span>
            </label>
            <input
              type="text"
              name="itemName"
              placeholder="Item name"
              value={form.itemName}
              onChange={handleInputChange}
            />
          </div>

          <div className="staff-report-field-row">
            <div className="staff-report-field">
              <label>
                Category <span className="staff-report-required">*</span>
              </label>
              <select name="category" value={form.category} onChange={handleInputChange}>
                <option value="" disabled>Select category</option>
                {categories.map(cat => (
                  <option key={cat.category_id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="staff-report-field">
              <label>
                Color <span className="staff-report-required">*</span>
              </label>
              <div className="staff-report-color-input-container">
                <input
                  type="color"
                  name="colorHex"
                  value={form.colorHex}
                  onChange={handleInputChange}
                  className="staff-report-color-input"
                />
                <div className="staff-report-color-info">
                  <span className="staff-report-color-bucket">
                    {hexToColorBucket(form.colorHex)}
                  </span>
                  <span className="staff-report-color-hex">
                    {form.colorHex.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="staff-report-field">
            <label>
              Description <span className="staff-report-required">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe the item in detail, including condition, brand, model, or any other identifying information."
              value={form.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Location & Time */}
        <div className="staff-report-section">
          <h2 className="staff-report-section-title">Location &amp; time found</h2>

          <div className="staff-report-field-row">
            <div className="staff-report-field">
              <label>
                Building <span className="staff-report-required">*</span>
              </label>
              <select name="building" value={form.building} onChange={handleInputChange}>
                <option value="" disabled>Select building</option>
                {buildings.map(bldg => (
                  <option key={bldg.building_id} value={bldg.name}>
                    {bldg.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="staff-report-field">
              <label>
                Specific location <span className="staff-report-required">*</span>
              </label>
              <select name="roomId" value={form.roomId} onChange={handleInputChange}>
                <option value="" disabled>Select a room</option>
                {form.building &&
                  buildings
                    .find(b => b.name === form.building)
                    ?.rooms
                    ?.map((room: Room) => (
                      <option key={room.room_id} value={room.room_id}>
                        {room.room_number ? `${room.room_number} — ${room.room_name}` : room.room_name}
                      </option>
                    ))
                }
              </select>
            </div>
          </div>

          <div className="staff-report-field-row">
            <div className="staff-report-field">
              <label>
                Date found <span className="staff-report-required">*</span>
              </label>
              <input
                type="date"
                name="dateFound"
                value={form.dateFound}
                onChange={handleInputChange}
                min={getDateConstraints().min}
                max={getDateConstraints().max}
              />
            </div>
            <div className="staff-report-field">
              <label>
                Time found <span className="staff-report-optional">optional</span>
              </label>
              <input type="time" name="timeFound" value={form.timeFound} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="staff-report-section">
          <h2 className="staff-report-section-title">Photos</h2>

          <label className="staff-report-photo-zone">
            <svg className="staff-report-photo-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="8" width="28" height="20" rx="3" />
              <circle cx="16" cy="18" r="5" />
              <path d="M11 8l2-4h6l2 4" />
            </svg>
            <div className="staff-report-photo-label">Click to upload photos</div>
            <div className="staff-report-photo-hint">JPG, PNG up to 10MB each · Recommended: 3–5 photos from different angles</div>
            <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          </label>

          {photoPreview.length > 0 && (
            <div className="staff-report-photo-grid">
              {photoPreview.map((preview, idx) => (
                <div key={idx} className="staff-report-photo-thumb">
                  <img src={preview} alt={`Photo ${idx + 1}`} />
                  <div className="staff-report-photo-remove" onClick={() => removePhoto(idx)}>×</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Finder Info */}
        <div className="staff-report-section">
          <h2 className="staff-report-section-title">Finder information</h2>

          <div className="staff-report-field-row">
            <div className="staff-report-field">
              <label>
                Finder name <span className="staff-report-required">*</span>
              </label>
              <input
                type="text"
                name="finderName"
                placeholder="Full name"
                value={form.finderName}
                onChange={handleInputChange}
              />
            </div>
            <div className="staff-report-field">
              <label>
                Finder contact <span className="staff-report-required">*</span>
              </label>
              <input
                type="text"
                name="finderContact"
                placeholder="Phone or email"
                value={form.finderContact}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="staff-report-field">
            <label>
              Finder affiliation <span className="staff-report-required">*</span>
            </label>
            <select name="finderAffiliation" value={form.finderAffiliation} onChange={handleInputChange}>
              <option value="">Select</option>
              <option>Student</option>
              <option>Staff</option>
              <option>Visitor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="staff-report-sidebar">
        <div className="staff-report-preview-title">Live preview</div>
        <div className="staff-report-live-preview">
          <ItemCard
            image={photoPreview[0] || ''}
            name={form.itemName || 'Item name'}
            location={getLocationDisplay()}
            foundAt={form.dateFound || new Date().toISOString()}
            category={form.category || 'Uncategorized'}
            onClick={() => {}}
          />
        </div>

        <div className="staff-report-preview-title">Completion checklist</div>
        <div className="staff-report-checklist">
          {getCompletionStatus().map((check, idx) => (
            <div key={idx} className="staff-report-check-row">
              <div className={`staff-report-check-icon ${check.done ? 'staff-report-check-done' : 'staff-report-check-empty'}`}>
                {check.done ? '✓' : '·'}
              </div>
              <span className={`staff-report-check-text ${check.done ? 'staff-report-check-done' : ''}`}>{check.name}</span>
            </div>
          ))}
        </div>

        <button className="staff-report-submit-btn" onClick={handleOpenConfirmDialog} disabled={!isFormComplete || submitting}>
          {submitting ? 'Submitting...' : 'Submit →'}
        </button>

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={showConfirmDialog}
          title="Confirm item details"
          sections={[
            {
              title: 'Item Details',
              content: (
                <>
                  <ConfirmRow label="Item name:" value={form.itemName} />
                  <ConfirmRow label="Category:" value={form.category} />
                  <ConfirmColorRow
                    label="Color:"
                    color={form.colorHex}
                    colorName={`${hexToColorBucket(form.colorHex)} (${form.colorHex.toUpperCase()})`}
                  />
                  <ConfirmRow label="Description:" value={form.description} />
                </>
              ),
            },
            {
              title: 'Location & Time',
              content: (
                <>
                  <ConfirmRow label="Location:" value={getLocationDisplay()} />
                  <ConfirmRow label="Date found:" value={new Date(form.dateFound).toLocaleDateString()} />
                  {form.timeFound && (
                    <ConfirmRow label="Time found:" value={form.timeFound} />
                  )}
                </>
              ),
            },
            {
              title: 'Photos',
              content: (
                <ConfirmRow label="Photos:" value={`${form.photos.length} photo(s) selected`} />
              ),
            },
            {
              title: 'Finder Information',
              content: (
                <>
                  <ConfirmRow label="Finder name:" value={form.finderName} />
                  <ConfirmRow label="Finder contact:" value={form.finderContact} />
                  <ConfirmRow label="Affiliation:" value={form.finderAffiliation} />
                </>
              ),
            },
          ]}
          onCancel={handleCancelConfirmDialog}
          onConfirm={handleConfirmSubmit}
          cancelText="Cancel"
          confirmText={submitting ? 'Submitting...' : 'Confirm & Submit'}
          confirmVariant="primary"
          isConfirmDisabled={submitting}
        />

      <Toast />
      </div>
    </div>
  )
}