import { neon } from '@neondatabase/serverless'
import type { PaystackTransaction } from './paystack'

export interface DonationRow {
  id: string
  reference: string
  amount: string | number
  type: string
  allocation: string
  created_at: string
}

function parseMetadata(metadata: unknown): Record<string, unknown> {
  if (!metadata) return {}
  if (typeof metadata === 'string') {
    try {
      const parsed = JSON.parse(metadata) as unknown
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {}
    } catch {
      return {}
    }
  }
  return typeof metadata === 'object' ? (metadata as Record<string, unknown>) : {}
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback
}

function asBoolean(value: unknown): boolean {
  return value === true || value === 'true'
}

/**
 * Records a Paystack transaction that has already been verified server-side.
 *
 * `userId` comes from a verified Clerk session token and is authoritative.
 * The webhook has no Clerk token, so it falls back to the client-supplied
 * `metadata.user_id` hint; `on conflict` keeps any id already stored.
 */
export async function recordVerifiedDonation(
  transaction: PaystackTransaction,
  userId: string | null,
): Promise<DonationRow> {
  if (transaction.status !== 'success') {
    throw new Error(`Transaction ${transaction.reference} is not successful`)
  }

  if (typeof transaction.amount !== 'number' || transaction.amount <= 0) {
    throw new Error('Transaction has an invalid amount')
  }

  const currency = (transaction.currency ?? 'NGN').toUpperCase()
  if (currency !== 'NGN') {
    throw new Error(`Unsupported currency: ${currency}`)
  }

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured')
  }

  const metadata = parseMetadata(transaction.metadata)
  const amount = transaction.amount / 100
  const allocation = (asString(metadata.allocation, 'General Fund') || 'General Fund').slice(0, 80)
  const fullName =
    asString(metadata.full_name) ||
    [transaction.customer?.first_name, transaction.customer?.last_name]
      .filter((part): part is string => typeof part === 'string' && part.length > 0)
      .join(' ')
  const email = transaction.customer?.email ?? asString(metadata.email)
  if (!email) {
    throw new Error('Transaction is missing a customer email')
  }
  const phone = asString(metadata.phone) || transaction.customer?.phone || null
  const anonymous = asBoolean(metadata.anonymous)
  const resolvedUserId = userId ?? (asString(metadata.user_id) || null)
  const paidAt = transaction.paid_at ?? transaction.paidAt ?? new Date().toISOString()
  const paystackId = transaction.id != null ? String(transaction.id) : null

  const sql = neon(databaseUrl)
  const rows = (await sql`
    insert into public.donations
      (reference, user_id, full_name, email, phone, amount, amount_kobo,
       currency, type, allocation, channel, paystack_id, anonymous, status, paid_at)
    values
      (${transaction.reference}, ${resolvedUserId}, ${fullName || null}, ${email},
       ${phone}, ${amount}, ${transaction.amount}, ${currency}, ${'donation'},
       ${allocation}, ${transaction.channel ?? null}, ${paystackId}, ${anonymous},
       ${'success'}, ${paidAt})
    on conflict (reference) do update set
      user_id = coalesce(excluded.user_id, public.donations.user_id),
      full_name = coalesce(excluded.full_name, public.donations.full_name),
      email = excluded.email,
      phone = coalesce(nullif(excluded.phone, ''), public.donations.phone),
      amount = excluded.amount,
      amount_kobo = excluded.amount_kobo,
      currency = excluded.currency,
      allocation = excluded.allocation,
      channel = excluded.channel,
      paystack_id = excluded.paystack_id,
      anonymous = public.donations.anonymous or excluded.anonymous,
      status = excluded.status,
      paid_at = coalesce(public.donations.paid_at, excluded.paid_at)
    returning id, reference, amount, type, allocation, created_at
  `) as DonationRow[]

  const row = rows[0]
  if (!row) {
    throw new Error('Failed to record donation')
  }
  return row
}
