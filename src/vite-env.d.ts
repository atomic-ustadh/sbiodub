/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_FORM_ID?: string
  readonly VITE_GOOGLE_FORM_EMAIL_ENTRY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
