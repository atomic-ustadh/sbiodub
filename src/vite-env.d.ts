/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_FORM_ID?: string
  readonly VITE_GOOGLE_FORM_EMAIL_ENTRY?: string
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string
  readonly VITE_NEON_DATA_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
