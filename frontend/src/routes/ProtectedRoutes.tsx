import { Route } from 'react-router-dom'
import { ReactNode } from 'react'
import { UserRole } from '../App'
import { HomePage } from '../pages/HomePage'
import { BrowsePage } from '../pages/BrowsePage'
import { ItemDetailsPage } from '../pages/ItemDetailsPage'
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from '../pages/SignUpPage'
import { MyClaimsPage } from '../pages/MyClaimsPage'
import { ClaimPage } from '../pages/ClaimPage'
import { StaffDashboardPage } from '../pages/StaffDashboardPage'
import { StaffItemsPage } from '../pages/StaffItemsPage'
import { StaffItemDetailsPage } from '../pages/StaffItemDetailsPage'
import { StaffClaimsPage } from '../pages/StaffClaimsPage'
import { StaffClaimReviewPage } from '../pages/StaffClaimReviewPage'
import { StaffReportPage } from '../pages/StaffReportPage'
import { SuperadminOverviewPage } from '../pages/SuperadminOverviewPage'
import { SuperadminSettingsPage } from '../pages/SuperadminSettingsPage'
import { SuperadminUsersPage } from '../pages/SuperadminUsersPage'
import { SuperadminAuditPage } from '../pages/SuperadminAuditPage'
import { ErrorPage } from '../pages/ErrorPage'
import { PublicOnlyRoute, StaffRoute, SuperadminRoute, PublicAuthRoute } from '../components/guards/RouteGuards'

interface ProtectedRoutesProps {
  isSignedIn: boolean
  userRole: UserRole
  items: any[]
  userName: string
  userEmail: string
  isSignedInProp: boolean
  onLoginSuccess: (name: string, email: string, role: UserRole) => void
  onSignUpSuccess: (name: string, email: string, role: UserRole) => void
}

export function getProtectedRoutes({
  isSignedIn,
  userRole,
  items,
  userName,
  userEmail,
  isSignedInProp,
  onLoginSuccess,
  onSignUpSuccess,
}: ProtectedRoutesProps): ReactNode[] {
  return [
    // PUBLIC ONLY ROUTES
    <Route
      key="home"
      path="/"
      element={
        <PublicOnlyRoute isSignedIn={isSignedIn} userRole={userRole}>
          <HomePage items={items} />
        </PublicOnlyRoute>
      }
    />,
    <Route
      key="browse"
      path="/browse"
      element={
        <PublicOnlyRoute isSignedIn={isSignedIn} userRole={userRole}>
          <BrowsePage items={items} />
        </PublicOnlyRoute>
      }
    />,
    <Route
      key="item-details"
      path="/items/:id"
      element={
        <PublicOnlyRoute isSignedIn={isSignedIn} userRole={userRole}>
          <ItemDetailsPage isSignedIn={isSignedInProp} />
        </PublicOnlyRoute>
      }
    />,
    <Route
      key="login"
      path="/login"
      element={
        <PublicOnlyRoute isSignedIn={isSignedIn} userRole={userRole}>
          <LoginPage onLoginSuccess={onLoginSuccess} />
        </PublicOnlyRoute>
      }
    />,
    <Route
      key="signup"
      path="/signup"
      element={
        <PublicOnlyRoute isSignedIn={isSignedIn} userRole={userRole}>
          <SignUpPage onSignUpSuccess={onSignUpSuccess} />
        </PublicOnlyRoute>
      }
    />,

    // AUTH ROUTES - PUBLIC users only
    <Route
      key="my-claims"
      path="/my-claims"
      element={
        <PublicAuthRoute isSignedIn={isSignedIn} userRole={userRole}>
          <MyClaimsPage items={items} isSignedIn={isSignedInProp} />
        </PublicAuthRoute>
      }
    />,

    // CLAIM ENDPOINT
    <Route
      key="claim"
      path="/items/:itemId/claim"
      element={<ClaimPage userName={userName} userEmail={userEmail} isSignedIn={isSignedIn} />}
    />,

    // STAFF ROUTE
    <Route
      key="staff-dashboard"
      path="/staff"
      element={
        <StaffRoute isSignedIn={isSignedIn} userRole={userRole}>
          <StaffDashboardPage userName={userName} />
        </StaffRoute>
      }
    />,
    <Route
      key="staff-items"
      path="/staff/items"
      element={
        <StaffRoute isSignedIn={isSignedIn} userRole={userRole}>
          <StaffItemsPage />
        </StaffRoute>
      }
    />,
    <Route
      key="staff-item-details"
      path="/staff/items/:id"
      element={
        <StaffRoute isSignedIn={isSignedIn} userRole={userRole}>
          <StaffItemDetailsPage />
        </StaffRoute>
      }
    />,
    <Route
      key="staff-claims"
      path="/staff/claims"
      element={
        <StaffRoute isSignedIn={isSignedIn} userRole={userRole}>
          <StaffClaimsPage />
        </StaffRoute>
      }
    />,
    <Route
      key="staff-claim-review"
      path="/staff/claims/:claim_id"
      element={
        <StaffRoute isSignedIn={isSignedIn} userRole={userRole}>
          <StaffClaimReviewPage />
        </StaffRoute>
      }
    />,
    <Route
      key="staff-report"
      path="/staff/report"
      element={
        <StaffRoute isSignedIn={isSignedIn} userRole={userRole}>
          <StaffReportPage />
        </StaffRoute>
      }
    />,

    // SUPERADMIN ROUTES
    <Route
      key="admin-overview"
      path="/admin/overview"
      element={
        <SuperadminRoute isSignedIn={isSignedIn} userRole={userRole}>
          <SuperadminOverviewPage userName={userName} />
        </SuperadminRoute>
      }
    />,
    <Route
      key="admin-settings"
      path="/admin/settings"
      element={
        <SuperadminRoute isSignedIn={isSignedIn} userRole={userRole}>
          <SuperadminSettingsPage />
        </SuperadminRoute>
      }
    />,
    <Route
      key="admin-users"
      path="/admin/users"
      element={
        <SuperadminRoute isSignedIn={isSignedIn} userRole={userRole}>
          <SuperadminUsersPage />
        </SuperadminRoute>
      }
    />,
    <Route
      key="admin-items"
      path="/admin/items"
      element={
        <SuperadminRoute isSignedIn={isSignedIn} userRole={userRole}>
          <StaffItemsPage />
        </SuperadminRoute>
      }
    />,
    <Route
      key="admin-audit"
      path="/admin/audit"
      element={
        <SuperadminRoute isSignedIn={isSignedIn} userRole={userRole}>
          <SuperadminAuditPage />
        </SuperadminRoute>
      }
    />,
    <Route
      key="staff-manage-redirect"
      path="/staff/manage"
      element={
        <SuperadminRoute isSignedIn={isSignedIn} userRole={userRole}>
          <SuperadminSettingsPage />
        </SuperadminRoute>
      }
    />,

    //  Invalid routes
    <Route
      key="not-found"
      path="*"
      element={
        <ErrorPage
          code={404}
          title="Page Not Found"
          message="The page you're looking for doesn't exist. Please check the URL and try again."
          showBackButton={true}
          showHomeButton={true}
        />
      }
    />,
  ]
}
