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
