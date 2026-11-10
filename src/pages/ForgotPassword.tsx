import { Navigate } from 'react-router-dom'

/**
 * Clerk runs the password-reset flow inside <SignIn />. Deep links to
 * /forgot-password are sent back to the sign-in screen where the user can
 * choose "Forgot password?".
 */
export default function ForgotPassword() {
  return <Navigate to="/login" replace />
}
