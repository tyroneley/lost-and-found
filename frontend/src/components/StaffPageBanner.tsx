import { ReactNode } from 'react'

interface StaffPageBannerProps {
  title: string
  subtitle: string
  action?: ReactNode
}

export function StaffPageBanner({ title, subtitle, action }: StaffPageBannerProps) {
  return (
    <div className={`staff-dashboard-header${action ? ' staff-dashboard-header-row' : ''}`}>
      <div>
        <h1 className="staff-dashboard-title">{title}</h1>
        <p className="staff-dashboard-subtitle">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}

interface StaffBannerActionBtnProps {
  onClick: () => void
  children: ReactNode
  disabled?: boolean
}

export function StaffBannerActionBtn({ onClick, children, disabled }: StaffBannerActionBtnProps) {
  return (
    <button type="button" className="staff-banner-action-btn" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
