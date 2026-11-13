import { createHmac, timingSafeEqual } from 'node:crypto'
import { recordVerifiedDonation } from '../lib/donations'
import type { PaystackTransaction } from '../lib/paystack'

interface ChargeSuccessEvent {
  event?: string
  data?: PaystackTransaction
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    console.error('PAYSTACK_SECRET_KEY is not configured')
    return new Response('Server error', { status: 500 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get('x-paystack-signature') ?? ''
  const expected = createHmac('sha512', secretKey).update(rawBody).digest('hex')
  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)

  if (
    expectedBuffer.length !== signatureBuffer.length ||
    !timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    return new Response('Invalid signature', { status: 401 })
  }

  let event: ChargeSuccessEvent
  try {
    event = JSON.parse(rawBody) as ChargeSuccessEvent
  } catch {
    return new Response('Invalid payload', { status: 400 })
  }

  if (event.event === 'charge.success' && event.data) {
    try {
      await recordVerifiedDonation(event.data, null)
    } catch (error) {
      console.error('Failed to record webhook donation', error)
      return new Response('Failed to record donation', { status: 500 })
    }
  }

  return new Response(null, { status: 200 })
}
