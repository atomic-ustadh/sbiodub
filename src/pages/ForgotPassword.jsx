import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ForgotPassword() {
  const { users } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email) return setError('Please enter your email address')
    const found = users.find((u) => u.email === email)
    if (!found) return setError('No account found with that email address')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  return (
    <main className="flex items-center justify-center min-h-screen grow pt-xl pb-xl px-gutter bg-surface geometric-bg">
      <div className="relative overflow-hidden border bg-surface-container-lowest p-md rounded-xl border-outline-variant">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none translate-x-12 -translate-y-12">
          <svg className="fill-primary" viewBox="0 0 100 100">
            <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
          </svg>
        </div>
        <div className="relative z-10">
          {!sent ? (
            <>
              <div className="text-center mb-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-fixed mb-md">
                  <span className="material-symbols-outlined text-primary text-[32px]">lock_reset</span>
                </div>
                <h1 className="font-headline-md text-headline-md text-primary mb-sm">Forgot Password</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Enter the email address associated with your Noor Youth account, <br /> and we&rsquo;ll send you a link to reset your password.</p>
              </div>
              {error && <p className="rounded-lg bg-error-container text-on-error-container p-sm font-body-sm mb-md">{error}</p>}
              <form className="space-y-md" onSubmit={handleSubmit}>
                <div className="space-y-xs">
                  <label className="block ml-1 font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                  <div className="relative group">
                    <span className="absolute transition-colors -translate-y-1/2 material-symbols-outlined left-4 top-1/2 text-outline group-focus-within:text-primary">mail</span>
                    <input className="w-full pl-12 pr-4 transition-all border rounded-lg bg-surface-container-lowest border-outline-variant py-sm font-body-md text-body-md focus:border-primary glow-ring" id="email" placeholder="name@example.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <button className="w-full bg-primary text-on-primary font-button text-button py-md rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-base" type="submit" disabled={loading}>
                  {loading ? (
                    <span className="animate-spin material-symbols-outlined">progress_activity</span>
                  ) : (
                    <>
                      <span>Reset Password</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
              <div className="text-center border-t mt-lg border-outline-variant pt-lg">
                <Link className="inline-flex items-center transition-colors gap-xs font-button text-button text-secondary-fixed-dim hover:text-secondary-fixed" to="/login">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-lg">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-container mb-md">
                <span className="material-symbols-outlined text-[40px]" style={{ color: 'var(--color-primary-fixed-dim, #95d3ba)' }}>check_circle</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">Check your inbox</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg">If an account exists for that email, you will receive a reset link shortly.</p>
              <button className="transition-all font-button text-button text-primary hover:underline" onClick={() => { setSent(false); setEmail('') }}>Try another email</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
