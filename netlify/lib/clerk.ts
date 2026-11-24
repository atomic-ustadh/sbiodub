/**
 * Server-side Clerk session verification for Netlify Functions.
 * - Reads an optional Bearer token from the Authorization header.
 * - If present, verifies it with CLERK_SECRET_KEY and returns the user id (`sub`);
 *   invalid/malformed tokens throw UnauthorizedError.
 * - When authorized parties are configured (explicitly or via Netlify URL envs),
 *   tokens minted for another frontend origin are rejected via the `azp` claim.
 * - If absent, returns null (supports anonymous payment flows).
 */
import { verifyToken } from '@clerk/backend'

export class UnauthorizedError extends Error {}

function resolveAuthorizedParties(): string[] {
  const configured = process.env.CLERK_AUTHORIZED_PARTIES
  const candidates = [
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.BRANCH_URL,
    ...(configured ? configured.split(',') : []),
  ]

  return [
    ...new Set(
      candidates
        .map((value) => value?.trim().replace(/\/$/, ''))
        .filter((value): value is string => Boolean(value)),
    ),
  ]
}

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
    const authorizedParties = resolveAuthorizedParties()
    const payload = await verifyToken(token, {
      secretKey,
      ...(authorizedParties.length > 0 ? { authorizedParties } : {}),
    })
    return payload.sub ?? null
  } catch {
    throw new UnauthorizedError('Invalid session token')
  }
}
