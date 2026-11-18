/**
 * Vite build/dev configuration.
 * - React plugin enables JSX transform and Fast Refresh.
 * - Tailwind CSS v4 is integrated via the Vite plugin (tokens/utilities in src/index.css).
 * - No custom aliases/server proxy here; local full-stack dev with functions uses
 *   `npx netlify-cli dev` so /api rewrites reach Netlify Functions.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
