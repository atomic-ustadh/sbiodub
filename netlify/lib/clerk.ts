/**
 * Server-side Clerk session verification for Netlify Functions.
 * - Reads an optional Bearer token from the Authorization header.
 * - If present, verifies it with CLERK_SECRET_KEY and returns the user id (`sub`);
 *   invalid/malformed tokens throw UnauthorizedError.
 * - If absent, returns null (supports anonymous payment flows).
 */
import { verifyToken } from '@clerk/backend'

export class UnauthorizedError extends Error {}

/** Extracts and verifies an optional Clerk session token from the request. */
export async function getOptionalClerkUserId(req: Request): Promise<string | null> {
  const authorization = req.headers.get('authorization')
  if (!authorization) return null

  const [scheme, token] = authorization.split(' ')
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    throw new UnauthorizedError('Invalid Authorization header')
  }

  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) {
    throw new Error('CLERK_SECRET_KEY is not configured')
  }

  try {
    const payload = await verifyToken(token, { secretKey })
    return payload.sub ?? null
  } catch {
    throw new UnauthorizedError('Invalid session token')
  }
}
