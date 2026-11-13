export interface PaystackTransaction {
  id?: number | string
  reference: string
  status: string
  amount: number
  currency?: string
  channel?: string
  paid_at?: string
  paidAt?: string
  customer?: {
    email?: string
    phone?: string | null
    first_name?: string | null
    last_name?: string | null
  }
  metadata?: unknown
}

const PAYSTACK_BASE_URL = 'https://api.paystack.co'

export async function verifyPaystackTransaction(
  reference: string,
): Promise<PaystackTransaction> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    throw new Error('PAYSTACK_SECRET_KEY is not configured')
  }

  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${secretKey}` } },
  )

  const payload = (await response.json().catch(() => null)) as
    | { status?: boolean; message?: string; data?: PaystackTransaction }
    | null

  if (!response.ok || !payload?.status || !payload.data) {
    throw new Error(payload?.message || `Paystack verification failed (${response.status})`)
  }

  return payload.data
}
