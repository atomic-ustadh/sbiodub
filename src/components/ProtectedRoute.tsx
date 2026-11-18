/**
 * Route guard for member-only pages (used in `App.tsx`).
 * - While auth is loading, shows a spinner.
 * - If unauthenticated, redirects to `/login` preserving the intended path in
 *   `state.from` (`pathname + search + hash`) for post-login return.
 * - If authenticated, renders nested routes via `<Outlet />`.
 * - Note: this is a client-side guard; real data authorization is enforced by
 *   server/RLS (see docs/ARCHITECTURE.md).
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface">
        <span className="material-symbols-outlined animate-spin text-primary text-[32px]">
          progress_activity
        </span>
      </main>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    )
  }

  return <Outlet />
}
