import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/react'
import { useAuth } from '../context/AuthContext'

const appearance = {
  variables: {
    colorPrimary: '#003527',
    colorText: '#1a1c1a',
    borderRadius: '0.5rem',
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
    <main className="relative flex flex-col w-full min-h-screen overflow-x-hidden md:flex-row">
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute z-50 flex items-center transition-all rounded-lg top-gutter md:top-25 left-3 md:left-gutter gap-sm text-on-primary px-sm py-xs hover:bg-white/30"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
      </button>

      <section className="relative flex items-center justify-center w-full overflow-hidden md:w-1/2 bg-primary min-h-102 md:min-h-screen">
        <div className="relative z-10 px-xl max-w-2xl text-center md:text-left">
          <h1 className="font-display-lg text-display-lg text-secondary-fixed">
            &ldquo;Read, in the name of your Lord who created.&rdquo;
          </h1>
        </div>
      </section>

      <section className="flex items-center justify-center w-full md:w-1/2 bg-surface px-gutter py-xl">
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
