import React, { ReactNode } from 'react'

export interface ConfirmDialogSection {
  title: string
  content: React.ReactNode
}

export interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  sections: ConfirmDialogSection[]
  onCancel: () => void
  onConfirm: () => void
  cancelText?: string
  confirmText?: string
  confirmVariant?: 'primary' | 'approve' | 'collect' | 'reject'
  isConfirmDisabled?: boolean
}

export function ConfirmationDialog({
  isOpen,
  title,
  sections,
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  confirmVariant = 'primary',
  isConfirmDisabled = false,
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog-modal">
        <div className="confirmation-dialog-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="confirmation-dialog-close"
            onClick={onCancel}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <div className="confirmation-dialog-body">
          {sections.map((section, idx) => (
            <div key={idx} className="confirmation-dialog-section">
              <h3>{section.title}</h3>
              {section.content}
            </div>
          ))}
        </div>

        <div className="confirmation-dialog-footer">
          <button
            type="button"
            className="confirmation-dialog-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`confirmation-dialog-confirm confirmation-dialog-confirm-${confirmVariant}`}
            onClick={onConfirm}
            disabled={isConfirmDisabled}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper component for displaying row-based content
export function ConfirmRow({
  label,
  value,
  children,
}: {
  label: string
  value?: string | ReactNode
  children?: ReactNode
}) {
  return (
    <div className="confirmation-dialog-row">
      <span className="confirmation-dialog-label">{label}</span>
      <div className="confirmation-dialog-value">
        {children || value}
      </div>
    </div>
  )
}

// Helper component for color swatches
export function ConfirmColorRow({
  label,
  color,
  colorName,
}: {
  label: string
  color: string
  colorName: string
}) {
  return (
    <div className="confirmation-dialog-row">
      <span className="confirmation-dialog-label">{label}</span>
      <div className="confirmation-dialog-color">
        <div
          className="confirmation-dialog-color-swatch"
          style={{ backgroundColor: color }}
        />
        <span>{colorName}</span>
      </div>
    </div>
  )
}

// Helper component for highlighted action boxes
export function ConfirmActionBox({ children }: { children: ReactNode }) {
  return (
    <div className="confirmation-dialog-action-box">
      {children}
    </div>
  )
}

// Helper component for notes/details box
export function ConfirmNotesBox({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="confirmation-dialog-notes-box">
      <p className="confirmation-dialog-notes-label">{label}</p>
      <p className="confirmation-dialog-notes-value">{value}</p>
    </div>
  )
}
