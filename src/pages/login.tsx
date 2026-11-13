import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/react'
import { useAuth } from '../context/AuthContext'

const appearance = {
  variables: {
    colorPrimary: '#0c3a2c',
    colorText: '#14241e',
    borderRadius: '0.75rem',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
}

export default function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, isLoading } = useAuth()

  const from = location.state?.from
  const redirectTo =
    typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
      ? from
      : '/profile'
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin'

  if (!isLoading && user) {
    return <Navigate to={redirectTo} replace />
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-x-hidden md:flex-row">
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute left-3 top-gutter z-50 flex items-center gap-sm rounded-full border border-white/15 bg-white/5 px-sm py-xs text-on-primary backdrop-blur-sm transition-all hover:bg-white/15 md:left-gutter md:top-8"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
      </button>

      <section className="hero-gradient relative flex min-h-102 w-full items-center justify-center overflow-hidden px-xl md:min-h-screen md:w-1/2">
        <div className="absolute inset-0 geometric-pattern opacity-[0.08]" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -right-16 top-10 h-56 w-56 rounded-full border border-secondary-fixed/15" />
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <span className="material-symbols-outlined mb-md block text-5xl text-secondary-fixed/70">
            format_quote
          </span>
          <h1 className="font-display-lg text-display-lg-mobile leading-tight text-secondary-fixed md:text-display-lg">
            &ldquo;Read, in the name of your Lord who created.&rdquo;
          </h1>
          <div className="mx-auto mt-lg h-px w-24 bg-linear-to-r from-secondary-fixed/70 to-transparent md:mx-0" />
        </div>
      </section>

      <section className="flex w-full items-center justify-center bg-surface px-gutter py-xl md:w-1/2">
        {mode === 'signup' ? (
          <SignUp
            routing="hash"
            fallbackRedirectUrl={redirectTo}
            signInUrl="/login"
            appearance={appearance}
          />
        ) : (
          <SignIn
            routing="hash"
            fallbackRedirectUrl={redirectTo}
            signUpUrl="/login?mode=signup"
            appearance={appearance}
          />
        )}
      </section>
    </main>
  )
}
