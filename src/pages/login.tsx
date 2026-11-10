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

  const switchMode = () => {
    navigate(mode === 'signup' ? '/login' : '/login?mode=signup', {
      replace: true,
      state: location.state,
    })
  }

  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-hidden md:flex-row">
      <button
        onClick={() => navigate(-1)}
        className="absolute z-50 flex items-center transition-all rounded-lg top-gutter md:top-25 left-3 md:left-gutter gap-sm text-on-primary px-sm py-xs hover:bg-white/30"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        <span className="hidden font-button text-button sm:inline">Back</span>
      </button>

      <section className="relative flex items-center justify-center w-full overflow-hidden md:w-1/2 bg-primary min-h-102 md:min-h-screen">
        <div className="relative z-10 flex flex-col justify-end px-xl py-sm text-on-primary max-w-120">
          <div className="py-sm mt-md">
            <span className="inline-block rounded-full px-sm py-xs bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md mb-lg">
              WISDOM &amp; GROWTH
            </span>
            <h1 className="font-display-lg text-display-lg mb-lg text-secondary-fixed">
              &ldquo;Read, in the name of your Lord who created.&rdquo;
            </h1>
            <p className="italic leading-normal font-body-lg text-body-lg text-on-primary/90 md:leading-loose">
              Knowledge is the light that guides the path of the youth towards a
              brighter, more purposeful future.
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center w-full md:w-1/2 bg-surface px-gutter py-xl">
        <div className="w-full max-w-lg">
          <div className="mb-lg mt-md">
            <h2 className="font-bold font-headline-md text-headline-md text-primary mb-xs">
              {mode === 'signup' ? 'Join LCA, Abuja' : 'Welcome Back'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {mode === 'signup'
                ? 'Create your account to join the community.'
                : 'Access your profile and continue your journey.'}
            </p>
          </div>

          <div className="flex justify-center">
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
          </div>

          <p className="text-center mt-lg font-body-md text-body-md text-on-surface-variant">
            {mode === 'signup' ? 'Already a member?' : "Don't have an account?"}
            <button
              type="button"
              onClick={switchMode}
              className="font-bold text-primary hover:underline decoration-secondary-fixed decoration-2 underline-offset-4 ml-xs"
            >
              {mode === 'signup' ? 'Log In' : 'Join Us Today'}
            </button>
          </p>

          <p className="text-center mt-md mb-md font-body-sm text-body-sm text-outline">
            &copy; 2026 LCA, Abuja. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  )
}
