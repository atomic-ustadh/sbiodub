/// <reference types="vite/client" />

/**
 * Typed Vite client environment variables.
 * Only VITE_* vars are exposed to the browser; secrets must remain server-only
 * (see .env.example and docs/ARCHITECTURE.md).
 */
interface ImportMetaEnv {
  /** Google Form id for newsletter signup (falls back to Netlify Forms if unset). */
  readonly VITE_GOOGLE_FORM_ID?: string
  /** Google Form email field entry id (required when using Google Form). */
  readonly VITE_GOOGLE_FORM_EMAIL_ENTRY?: string
  /** Clerk publishable key used by ClerkProvider in src/main.tsx. */
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string
  /** Neon Data API base URL (…/rest/v1) for client reads/writes via RLS. */
  readonly VITE_NEON_DATA_API_URL?: string
  /** Paystack public key for Inline checkout on the Donate page. */
  readonly VITE_PAYSTACK_PUBLIC_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
