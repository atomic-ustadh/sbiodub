import { verifyToken } from '@clerk/backend'

export class UnauthorizedError extends Error {}

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
