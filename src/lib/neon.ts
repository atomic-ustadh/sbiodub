const BASE_URL = (import.meta.env.VITE_NEON_DATA_API_URL ?? '').replace(/\/+$/, '')

export function isNeonConfigured(): boolean {
  return BASE_URL.length > 0
}

/**
 * Sends a request to the Neon Data API (PostgREST-compatible) using the
 * Clerk-issued JWT. Authorization is enforced by Postgres RLS, not here.
 */
export async function neonRequest<T>(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  if (!BASE_URL) throw new Error('VITE_NEON_DATA_API_URL is not configured')

  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)
  headers.set('Content-Type', 'application/json')
  if (!headers.has('Prefer')) headers.set('Prefer', 'return=representation')

  const response = await fetch(`${BASE_URL}${path}`, { ...init, headers })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Neon Data API ${response.status}: ${detail || response.statusText}`)
  }

  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}
