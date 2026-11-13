import { getOptionalClerkUserId, UnauthorizedError } from '../lib/clerk'
import { recordVerifiedDonation } from '../lib/donations'
import { json } from '../lib/http'
import { verifyPaystackTransaction } from '../lib/paystack'

const REFERENCE_PATTERN = /^[A-Za-z0-9._-]{6,100}$/

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const payload = body as { reference?: unknown } | null
  const reference =
    payload && typeof payload.reference === 'string' ? payload.reference.trim() : ''

  if (!REFERENCE_PATTERN.test(reference)) {
    return json({ error: 'Invalid reference' }, 400)
  }

  try {
    const userId = await getOptionalClerkUserId(req)
    const transaction = await verifyPaystackTransaction(reference)
    const donation = await recordVerifiedDonation(transaction, userId)
    return json({ donation })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return json({ error: 'Unauthorized' }, 401)
    }
    console.error('Paystack verification failed', error)
    return json({ error: 'Unable to verify payment' }, 502)
  }
}
