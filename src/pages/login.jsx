import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { signup, login } = useAuth()
  const [mode, setMode] = useState('signin')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [interest, setInterest] = useState('')
  const [terms, setTerms] = useState(false)
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')
    if (!fullName || !email || !password) return setError('Please fill in all fields')
    if (!terms) return setError('Please agree to the Terms of Service')
    const result = signup({ name: fullName, email, password, interests: interest ? [interest] : [] })
    if (result.ok) navigate('/profile')
    else setError(result.error)
  }

  const handleSignin = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Please fill in all fields')
    const result = login(email, password)
    if (result.ok) navigate('/profile')
    else setError(result.error)
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
        {mode === 'signup' ? (
          <div className="relative z-10 text-center px-gutter md:text-left max-w-120">
            <div className="mb-md mt-md">
              <span className="inline-block rounded-full px-sm py-xs bg-secondary text-on-secondary font-label-md text-label-md mb-sm">
                Noor Youth Community
              </span>
              <h1 className="leading-tight font-display-lg text-display-lg-mobile md:text-display-lg text-secondary-fixed">
                Illuminate Your Potential.
              </h1>
            </div>
            <p className="max-w-3xl font-body-lg text-body-lg text-on-primary/90">
              Join a movement dedicated to spiritual growth, community service, and youth empowerment. Your journey begins here.
            </p>
            <div className="flex items-center mt-md md:mt-lg gap-sm">
              <div className="flex space-x-[-12px] overflow-hidden">
                <img
                  alt="Member 1"
                  className="inline-block w-10 h-10 rounded-full ring-2 ring-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2njxIygCe1ZpDVHv3I1yHuMq9jVqVASjiKTE5R6VbT_CLksgCQ3MmTboNOSUWv7hVY127qRSrgrCfgZ8fV4lQr73x5m2yqo54gwJvHIFHwfHFPze_Se2EmEqW-lcfuBCkz_1ly5V5VacjIZ7PHgaN_BUr6d2Q19UK34CYrZkwcS8MAc9x0S6N8RuHNY3X-ZwMuGCM_l2QUkVHLDbmSQ4Rka9lWYfmthjXyRxt8hR1rUSvid1N57OD2aAlkQCPiJjKEe8wSxUA-B6e"
                />
                <img
                  alt="Member 2"
                  className="inline-block w-10 h-10 rounded-full ring-2 ring-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiK95LsX9ZL2ZZ11TycutHBWQ6H5mTEMLphb63GASjINVk_mOgnf7HmeYfQIPQN4k8NHQ3xzQHGI1bn4rerd-ULuragt00ZXf1lXCb4po-NAIw-YTjZS1_yr93SauhU-y_-C-rWH0sPRTj3buj_9HRmmibuZNRcv7J9VUvuLxXwco4CBAse7lw4o-0ZRjkW9Ev0ls6hEeCBOP5iH1qb1J1M2jOu2dLl97_AeY7K5nu3gNUMX4xUH__rzJ_4CIb-j0ea-58C1ed_i2y"
                />
                <img
                  alt="Member 3"
                  className="inline-block w-10 h-10 rounded-full ring-2 ring-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBriPffv_6w60ycnplrf4tDb3T2qAEIM0RHfKPx2haJfxr2xudN9wnJMf-rF2G53F3QfJMT5Ua2wsJIcrEpgO1hWBP-xWv-Xor6FU6Tl_a0H9K66CcGY21iuCBoyFxSKisMK0L5sP22xoSeki6YVO36pmREVV6EFgE7EkABKJbANJ7AGAdD4P2exbqtjEQOUaw9qopSuXpdHR73GXBrwdbSKSuWuiyxyEv52FtjWHq7BSwxWtBi97_E4aNewj95FEJhFZTaZM6Ok1Ct"
                />
            </div>
            <p className="font-body-sm text-body-sm text-on-primary/80">
              Join 2,000+ youth members
            </p>
          </div>
        </div>
        ) : (
          <div className="relative z-10 flex flex-col justify-end px-xl py-sm text-on-primary max-w-120">
            <div className="py-sm mt-md">
              <span className="inline-block rounded-full px-sm py-xs bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md mb-lg">
                WISDOM & GROWTH
              </span>
              <h1 className="font-display-lg text-display-lg mb-lg text-secondary-fixed">
                &ldquo;Read, in the name of your Lord who created.&rdquo;
              </h1>
              <p className="italic leading-normal font-body-lg text-body-lg text-on-primary/90 md:leading-loose">
                Knowledge is the light that guides the path of the youth towards a brighter, more purposeful future.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="flex items-center justify-center w-full md:w-1/2 bg-surface px-gutter">
        <div className="w-full max-w-144">
          {mode === 'signup' ? (
            <>
              <div className="mb-lg mt-md">
                <h2 className="font-bold font-headline-md text-headline-md text-primary mb-xs">Noor Youth</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Create your account to join the community.</p>
              </div>
              {error && <p className="rounded-lg bg-error-container text-on-error-container p-sm font-body-sm mb-md">{error}</p>}
              <form className="space-y-5" onSubmit={handleSignup}>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="full_name">Full Name</label>
                  <div className="relative rounded-lg group form-glow">
                    <span className="absolute -translate-y-1/2 material-symbols-outlined left-sm top-1/2 text-outline">person</span>
                    <input className="w-full transition-all duration-200 border rounded-lg pl-lg pr-md py-sm bg-surface-container-lowest border-outline-variant font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary" id="full_name" placeholder="Enter your full name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                  <div className="relative rounded-lg group form-glow">
                    <span className="absolute -translate-y-1/2 material-symbols-outlined left-sm top-1/2 text-outline">mail</span>
                    <input className="w-full transition-all duration-200 border rounded-lg pl-lg pr-md py-sm bg-surface-container-lowest border-outline-variant font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary" id="email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                  <div className="relative rounded-lg group form-glow">
                    <span className="absolute -translate-y-1/2 material-symbols-outlined left-sm top-1/2 text-outline">lock</span>
                    <input className="w-full transition-all duration-200 border rounded-lg pl-lg pr-lg py-sm bg-surface-container-lowest border-outline-variant font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary" id="password" placeholder="••••••••" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="absolute transition-colors -translate-y-1/2 right-sm top-1/2 text-outline hover:text-primary" type="button" onClick={() => setShowPassword(!showPassword)}>
                      <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-sm pt-sm">
                  <div className="flex items-center h-5">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container" id="terms" name="terms" type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                  </div>
                  <div className="text-sm mb-lg">
                    <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                      I agree to the <a className="font-bold text-primary hover:underline" href="#">Terms of Service</a> and <a className="font-bold text-primary hover:underline" href="#">Privacy Policy</a>.
                    </label>
                  </div>
                </div>
                <button className="w-full bg-primary text-on-primary font-button text-button py-sm rounded-lg shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-sm" type="submit">
                  Create Account <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>
              <div className="text-center border-t mt-sm pt-md border-outline-variant">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Already a member?
                  <button className="font-bold transition-colors text-secondary hover:text-primary ml-xs" onClick={() => { setMode('signin'); setError('') }}>Log In</button>
                </p>
              </div>
              <div className="text-center mt-md mb-md">
                <p className="font-body-sm text-body-sm text-outline">&copy; 2026 Noor Youth Organization. All rights reserved.</p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-lg mt-md">
                <h2 className="font-headline-md text-headline-md text-primary mb-xs">Welcome Back</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Access your profile and continue your journey.</p>
              </div>
              {error && <p className="rounded-lg bg-error-container text-on-error-container p-sm font-body-sm mb-md">{error}</p>}
              <form className="space-y-md" onSubmit={handleSignin}>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                  <div className="relative rounded-lg form-glow">
                    <span className="absolute -translate-y-1/2 material-symbols-outlined left-sm top-1/2 text-outline">mail</span>
                    <input className="w-full transition-all duration-200 border rounded-lg pl-lg pr-md py-sm bg-surface-container-lowest border-outline-variant font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary" id="email" placeholder="name@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                    <Link className="transition-colors font-body-sm text-body-sm text-primary hover:text-secondary-fixed-dim" to="/forgot-password">Forgot password?</Link>
                  </div>
                  <div className="relative rounded-lg form-glow">
                    <span className="absolute -translate-y-1/2 material-symbols-outlined left-sm top-1/2 text-outline">lock</span>
                    <input className="w-full transition-all duration-200 border rounded-lg pl-lg pr-lg py-sm bg-surface-container-lowest border-outline-variant font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary" id="password" placeholder="••••••••" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="absolute -translate-y-1/2 right-sm top-1/2 text-outline hover:text-on-surface-variant" type="button" onClick={() => setShowPassword(!showPassword)}>
                      <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-sm">
                  <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="remember" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="remember">Keep me signed in</label>
                </div>
                <button className="w-full bg-primary text-on-primary font-button text-button py-sm rounded-lg shadow-sm hover:bg-primary-container transition-all active:scale-[0.98]" type="submit">Sign In</button>
              </form>
              <div className="relative mt-lg">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant" /></div>
                <div className="relative flex justify-center"><span className="px-md bg-surface text-outline font-label-md text-label-md">OR CONTINUE WITH</span></div>
              </div>
              <p className="text-center mt-md mb-md font-body-md text-body-md text-on-surface-variant">
                Don&rsquo;t have an account?
                <button className="font-bold text-primary hover:underline decoration-secondary-fixed decoration-2 underline-offset-4 ml-xs" onClick={() => { setMode('signup'); setError('') }}>Join Us Today</button>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
