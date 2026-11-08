import { useState, type FormEvent } from 'react'

interface SubscribeFormProps {
  variant?: 'default' | 'footer'
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function SubscribeForm({ variant = 'default' }: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    try {
      const body = new URLSearchParams({
        'form-name': 'newsletter',
        email,
        'bot-field': '',
      })
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error('Subscription failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  const message =
    status === 'success'
      ? 'Thanks for subscribing.'
      : status === 'error'
        ? 'Something went wrong. Please try again.'
        : ''

  return (
    <div className={variant === 'footer' ? '' : 'w-full'}>
      <form
        className={variant === 'footer' ? 'flex' : 'flex flex-col sm:flex-row gap-sm justify-center'}
        onSubmit={handleSubmit}
      >
        <input
          className={
            variant === 'footer'
              ? 'bg-primary-container border-none text-white rounded-l-lg px-md w-full focus:ring-1 focus:ring-secondary-fixed placeholder:text-white/50'
              : 'flex-1 px-md py-3 rounded-lg border border-outline bg-white focus:ring-2 focus:ring-secondary focus:outline-none'
          }
          name="email"
          placeholder={variant === 'footer' ? 'Email address' : 'Enter your email'}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
          required
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={
            variant === 'footer'
              ? 'bg-secondary-fixed text-primary px-md py-2 rounded-r-lg hover:bg-secondary-fixed-dim transition-colors disabled:opacity-60'
              : 'bg-primary text-on-primary font-button text-button px-lg py-3 rounded-lg hover:bg-primary-container transition-all disabled:opacity-60'
          }
        >
          {status === 'sending' ? (
            'Sending...'
          ) : variant === 'footer' ? (
            <span className="material-symbols-outlined">send</span>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      {message && (
        <p
          aria-live="polite"
          className={
            variant === 'footer'
              ? 'mt-xs font-body-sm text-body-sm text-on-primary/70'
              : 'mt-sm text-center font-body-sm text-body-sm text-on-surface-variant'
          }
        >
          {message}
        </p>
      )}
    </div>
  )
}
