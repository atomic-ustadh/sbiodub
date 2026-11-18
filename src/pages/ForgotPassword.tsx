/**
 * Forgot-password page (route `/forgot-password`).
 * - Clerk runs the password-reset flow inside `<SignIn />`, so this route exists
 *   only to redirect deep links back to `/login` (via `<Navigate replace />`).
 */
import { Navigate } from 'react-router-dom'

/** Redirects legacy password-reset links to the Clerk sign-in screen. */
export default function ForgotPassword() {
  return <Navigate to="/login" replace />
}
