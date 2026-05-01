import { useState } from 'react'
import { ItemCard } from '../components/ItemCard'

interface ReportFormState {
  itemName: string
  category: string
  colorHex: string
  description: string
  notes: string
  building: string
  specificLocation: string
  roomNumber: string
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
  const [form, setForm] = useState<ReportFormState>({
    itemName: '',
    category: '',
    colorHex: '#2563eb',
    description: '',
    notes: '',
    building: '',
    specificLocation: '',
    roomNumber: '',
    dateFound: '',
    timeFound: '',
    photos: [],
    finderName: '',
    finderContact: '',
    finderAffiliation: '',
  })

  const [photoPreview, setPhotoPreview] = useState<string[]>([])

  // const [showDebug, setShowDebug] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target

    setForm(prev => {
      if (name === 'specificLocation' && value !== 'Room') {
        return { ...prev, specificLocation: value, roomNumber: '' }
      }
      return { ...prev, [name]: value }
    })
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
        done:
          !!form.building &&
          !!form.specificLocation &&
          (form.specificLocation !== 'Room' || !!form.roomNumber),
      },
      { name: 'Date found', done: !!form.dateFound },
      { name: 'At least 1 photo', done: form.photos.length > 0 },
      { name: 'Finder name', done: !!form.finderName },
      { name: 'Finder contact', done: !!form.finderContact },
    ]
    return checks
  }

  const isFormComplete = getCompletionStatus().every(c => c.done)

  const generatePayload = () => {
    const colorBucket = hexToColorBucket(form.colorHex)
    return {
      item: {
        name: form.itemName,
        description: form.description,
        category: form.category,
        color_hex: form.colorHex,
        color_bucket: colorBucket,
        notes: form.notes,
        found_location: form.specificLocation === 'Room' ? `Room ${form.roomNumber}` : form.specificLocation,
        found_at: form.dateFound + (form.timeFound ? `T${form.timeFound}` : 'T00:00'),
        building: form.building,
      },
      finder: {
        name: form.finderName,
        contact: form.finderContact,
        affiliation: form.finderAffiliation || null,
      },
      photos: form.photos.map(f => f.name),
    }
  }

  // const handleDebugClick = () => {
  //   setShowDebug(!showDebug)
  // }

  const handleSubmit = () => {
    if (!isFormComplete) {
      alert('Please complete all required fields')
      return
    }
    const payload = generatePayload()
    console.log('Submitting payload:', payload)
    alert('Item submitted for approval!')
    // send payload to backend
  }

  const handleSaveDraft = () => {
    alert('Item saved as draft!')
    // send to backend
  }

  return (
    <div className="staff-report-layout">
      <div className="staff-report-main">
        <div className="staff-report-breadcrumb">
          Dashboard <span>/ Record found item</span>
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
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Personal belongings</option>
                <option>Sports equipment</option>
                <option>Other</option>
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
              placeholder="Describe the item in detail."
              value={form.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="staff-report-field">
            <label>
              Notes <span className="staff-report-optional">optional</span>
            </label>
            <textarea
              name="notes"
              placeholder="Any other observations."
              value={form.notes}
              onChange={handleInputChange}
              className="staff-report-notes"
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
                <option>FX Campus</option>
                <option>JWC Campus</option>
              </select>
            </div>
            <div className="staff-report-field">
              <label>
                Specific location <span className="staff-report-required">*</span>
              </label>
              <select name="specificLocation" value={form.specificLocation} onChange={handleInputChange}>
                <option value="" disabled>Select building</option>
                <option>Auditorium</option>
                <option>Lobby</option>
                <option>Student Lounge</option>
                <option>Sleeping Pods</option>
                <option>Photography Room</option>
                <option>Meeting Room</option>
                <option>Library</option>
                <option>Room</option>
              </select>
            </div>
            
            {form.specificLocation === 'Room' && (
              <div className="staff-report-field">
                <label>
                  Room number <span className="staff-report-required">*</span>
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  placeholder="e.g. 602, 627"
                  value={form.roomNumber}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="staff-report-field-row">
            <div className="staff-report-field">
              <label>
                Date found <span className="staff-report-required">*</span>
              </label>
              <input type="date" name="dateFound" value={form.dateFound} onChange={handleInputChange} />
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
              Finder affiliation <span className="staff-report-optional">optional</span>
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
            location={form.building ? `${form.building}${form.specificLocation ? `, ${form.specificLocation === 'Room' ? `Room ${form.roomNumber || ''}` : form.specificLocation}` : ''}` : 'Location'}
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

        <button className="staff-report-save-draft" onClick={handleSaveDraft}>
          Save as draft
        </button>
        <button className="staff-report-submit-btn" onClick={handleSubmit} disabled={!isFormComplete}>
          Submit →
        </button>

        {/* DEBUG START: button and panel for debug */}
        {/* <button 
          className="staff-report-debug-btn" 
          onClick={handleDebugClick}
        >
          {showDebug ? '▼ Hide' : '▶ Show'} Debug Info
        </button>

        {showDebug && (
          <div className="staff-report-debug-panel">
            <label className="staff-report-debug-label">
              JSON Payload:
            </label>
            <textarea
              readOnly
              value={JSON.stringify(generatePayload(), null, 2)}
              className="staff-report-debug-textarea"
            />
          </div>
        )} */}
        {/* DEBUG END */}
      </div>
    </div>
  )
}
