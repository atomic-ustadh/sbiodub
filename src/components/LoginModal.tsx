import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginPromptProps {
  open: boolean
  onClose: () => void
  from: string
  title?: string
  description?: string
  icon?: string
}

export default function LoginPrompt({
  open,
  onClose,
  from,
  title = 'Log in to continue',
  description = 'Please log in to continue. You will be returned to this page after signing in.',
  icon = 'login',
}: LoginPromptProps) {
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cancelRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  const handleLogin = () => {
    onClose()
    navigate('/login', { state: { from } })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-gutter animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-prompt-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-outline-variant/80 bg-surface-container-lowest p-lg shadow-float animate-[fadeIn_0.2s_ease-out]"
      >
        <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-secondary via-secondary-fixed to-transparent" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login prompt"
          className="absolute top-sm right-sm flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-start gap-md pt-sm pr-lg">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <div>
            <h2
              id="login-prompt-title"
              className="mb-xs font-headline-sm text-headline-sm text-primary"
            >
              {title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-lg flex flex-col-reverse gap-sm sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            className="rounded-full px-md py-sm font-button text-button text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
          >
            Not now
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="btn btn-primary"
          >
            Log In
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
