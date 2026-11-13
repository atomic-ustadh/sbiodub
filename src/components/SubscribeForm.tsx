import { useState, type SubmitEvent } from 'react'

interface SubscribeFormProps {
  variant?: 'default' | 'footer'
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const FORM_ID = import.meta.env.VITE_GOOGLE_FORM_ID
const EMAIL_ENTRY = import.meta.env.VITE_GOOGLE_FORM_EMAIL_ENTRY

const FORM_RESPONSE_URL = FORM_ID
  ? `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`
  : ''

function entryKey(value: string): string {
  return value.startsWith('entry.') ? value : `entry.${value}`
}

export default function SubscribeForm({ variant = 'default' }: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || trap) return
    setStatus('sending')
    try {
      if (FORM_RESPONSE_URL && EMAIL_ENTRY) {
        // Google Forms only allows a CORS-opaque response, so we cannot read
        // success/error from the network. The UI is optimistic on completion.
        await fetch(FORM_RESPONSE_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            [entryKey(EMAIL_ENTRY)]: email,
          }).toString(),
        })
      } else {
        const body = new URLSearchParams({
          'form-name': 'newsletter',
          email,
          'bot-field': trap,
        })
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        })
        if (!response.ok) throw new Error('Subscription failed')
      }
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
        className={variant === 'footer' ? 'flex items-stretch' : 'flex flex-col sm:flex-row gap-sm justify-center'}
        onSubmit={handleSubmit}
      >
        <input
          className="absolute -left-2499.75 h-0 w-0 opacity-0"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
        <input
          className={
            variant === 'footer'
              ? 'w-full rounded-l-full border border-white/15 bg-white/10 px-md py-3 font-body-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-secondary-fixed/60 focus:bg-white/15'
              : 'field flex-1 rounded-full px-md py-3.5'
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
              ? 'flex items-center justify-center rounded-r-full bg-secondary-fixed px-md py-3 text-primary transition-colors hover:bg-secondary-fixed-dim disabled:opacity-60'
              : 'btn btn-primary shrink-0 px-lg py-3.5'
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
