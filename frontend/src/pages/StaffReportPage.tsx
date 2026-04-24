import { useState } from 'react'

interface ReportFormState {
  itemName: string
  category: string
  color: string
  description: string
  notes: string
  building: string
  specificLocation: string
  roomNumber: string
  dateFound: string
  timeFound: string
  photos: File[]
  finderType: 'anonymous' | 'known'
  finderName: string
  finderContact: string
  finderAffiliation: string
}

const COLORS = [
  { name: 'Black', hex: '#222' },
  { name: 'White', hex: '#fff' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Yellow', hex: '#ca8a04' },
  { name: 'Purple', hex: '#9333ea' },
  { name: 'Grey', hex: '#94a3b8' },
]

export function StaffReportPage() {
  const [form, setForm] = useState<ReportFormState>({
    itemName: '',
    category: '',
    color: 'Black',
    description: '',
    notes: '',
    building: '',
    specificLocation: '',
    roomNumber: '',
    dateFound: '',
    timeFound: '',
    photos: [],
    finderType: 'anonymous',
    finderName: '',
    finderContact: '',
    finderAffiliation: '',
  })

  const [photoPreview, setPhotoPreview] = useState<string[]>([])

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
      { name: 'Color', done: !!form.color },
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
    ]
    return checks
  }

  const isFormComplete = getCompletionStatus().every(c => c.done)

  const handleSubmit = () => {
    if (!isFormComplete) {
      alert('Please complete all required fields')
      return
    }
    alert('Item submitted for approval!')
    // Here you would send to backend
  }

  const handleSaveDraft = () => {
    alert('Item saved as draft!')
    // Here you would save to backend
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
              <div className="staff-report-color-swatches">
                {COLORS.map(c => (
                  <div
                    key={c.name}
                    className={`staff-report-swatch ${form.color === c.name ? 'active' : ''}`}
                    style={{ background: c.hex }}
                    onClick={() => setForm(prev => ({ ...prev, color: c.name }))}
                    title={c.name}
                  />
                ))}
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
              style={{ minHeight: '54px' }}
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
            {/* <svg className="staff-report-photo-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="8" width="28" height="20" rx="3" />
              <circle cx="16" cy="18" r="5" />
              <path d="M11 8l2-4h6l2 4" />
            </svg> */}
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

          <div className="staff-report-finder-toggle">
            <button
              className={`staff-report-finder-opt ${form.finderType === 'anonymous' ? 'active' : ''}`}
              onClick={() => setForm(prev => ({ ...prev, finderType: 'anonymous' }))}
            >
              Anonymous / unknown
            </button>
            <button
              className={`staff-report-finder-opt ${form.finderType === 'known' ? 'active' : ''}`}
              onClick={() => setForm(prev => ({ ...prev, finderType: 'known' }))}
            >
              Finder details known
            </button>
          </div>

          {form.finderType === 'known' && (
            <div className="staff-report-finder-fields">
              <div className="staff-report-field-row">
                <div className="staff-report-field">
                  <label>Finder name</label>
                  <input
                    type="text"
                    name="finderName"
                    placeholder="Full name"
                    value={form.finderName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="staff-report-field">
                  <label>Finder contact</label>
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
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="staff-report-sidebar">
        <div className="staff-report-preview-title">Live preview</div>
        <div className="staff-report-preview-card">
          <div className="staff-report-preview-img">
            {photoPreview.length > 0 ? (
              <img src={photoPreview[0]} alt="Preview" />
            ) : (
              <div className="staff-report-preview-placeholder"></div>
            )}
          </div>
          <div className="staff-report-preview-body">
            <div className="staff-report-preview-name">{form.itemName || 'Item name'}</div>
            <div className="staff-report-preview-meta">
              {form.building}
              {form.specificLocation && (
                `, ${form.specificLocation === 'Room'
                  ? `Room ${form.roomNumber || ''}`
                  : form.specificLocation}`
              )}
            </div>
            <div className="staff-report-preview-tags">
              <span className="staff-report-tag staff-report-tag-draft">Draft</span>
              {form.category && <span className="staff-report-tag staff-report-tag-cat">{form.category}</span>}
              {form.color && (
                <span className="staff-report-tag staff-report-tag-color">
                  <span className="staff-report-dot" style={{ background: COLORS.find(c => c.name === form.color)?.hex }} />
                  {form.color}
                </span>
              )}
            </div>
          </div>
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
          Submit for approval →
        </button>
        <div className="staff-report-submit-note">This will be sent to ISS admin for review before going public.</div>
      </div>
    </div>
  )
}
