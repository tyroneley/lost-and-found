import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { UserRole } from '../../App'

interface GuardProps {
  isSignedIn: boolean
  userRole: UserRole
  children: React.ReactNode
}

/**
 * PublicOnlyRoute
 * Allows: guest (not signed in), PUBLIC users
 * Denies: STAFF, SUPERADMIN → redirect to /staff
 */
export function PublicOnlyRoute({ isSignedIn, userRole, children }: GuardProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSignedIn) return
    if (userRole === 'superadmin') {
      navigate('/admin/overview', { replace: true })
    } else if (userRole === 'staff') {
      navigate('/staff', { replace: true })
    }
  }, [isSignedIn, userRole, navigate])

  if (isSignedIn && (userRole === 'staff' || userRole === 'superadmin')) {
    return null
  }

  return <>{children}</>
}

/**
 * AuthRoute
 * Allows: any authenticated user (PUBLIC, STAFF, SUPERADMIN)
 * Denies: guest (not signed in) → redirect to /login
 */
export function AuthRoute({ isSignedIn, children }: GuardProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/login', { replace: true })
    }
  }, [isSignedIn, navigate])

  if (!isSignedIn) {
    return null
  }

  return <>{children}</>
}

/**
 * StaffRoute
 * Allows: STAFF, SUPERADMIN
 * Denies: guest → redirect to /login
 * Denies: PUBLIC → redirect to /
 */
export function StaffRoute({ isSignedIn, userRole, children }: GuardProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/login', { replace: true })
    } else if (userRole === 'public') {
      navigate('/', { replace: true })
    }
  }, [isSignedIn, userRole, navigate])

  if (!isSignedIn || userRole === 'public') {
    return null
  }

  return <>{children}</>
}

/**
 * SuperadminRoute
 * Allows: SUPERADMIN only
 * Denies: guest → redirect to /login
 * Denies: PUBLIC → redirect to /
 * Denies: STAFF → redirect to /staff
 */
export function SuperadminRoute({ isSignedIn, userRole, children }: GuardProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/login', { replace: true })
    } else if (userRole === 'public') {
      navigate('/', { replace: true })
    } else if (userRole === 'staff') {
      navigate('/staff', { replace: true })
    }
  }, [isSignedIn, userRole, navigate])

  if (!isSignedIn || userRole !== 'superadmin') {
    return null
  }

  return <>{children}</>
}

/**
 * PublicAuthRoute
 * Allows: PUBLIC users who are authenticated
 * Denies: guest (not signed in) → redirect to /login
 * Denies: STAFF → redirect to /staff
 * Denies: SUPERADMIN → redirect to /staff
 */
export function PublicAuthRoute({ isSignedIn, userRole, children }: GuardProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/login', { replace: true })
    } else if (userRole === 'superadmin') {
      navigate('/admin/overview', { replace: true })
    } else if (userRole === 'staff') {
      navigate('/staff', { replace: true })
    }
  }, [isSignedIn, userRole, navigate])

  if (!isSignedIn || userRole !== 'public') {
    return null
  }

  return <>{children}</>
}
