/**
 * Client-side Paystack Inline integration.
 * - Lazily loads the Paystack Inline script once and opens the checkout iframe.
 * - Uses NGN and expects `amount` in kobo (as required by Paystack).
 * - Resolves with the transaction reference on success; rejects if cancelled or
 *   unavailable. Server-side verification/persistence is handled by Netlify Functions.
 */

/** Minimal shape of the Paystack Inline success callback payload. */
interface PaystackSuccessResponse {
  reference: string
}

interface PaystackHandler {
  openIframe(): void
}

interface PaystackSetupOptions {
  key: string
  email: string
  amount: number
  currency?: string
  ref: string
  metadata?: Record<string, unknown>
  callback: (response: PaystackSuccessResponse) => void
  onClose: () => void
}

interface PaystackPop {
  setup(options: PaystackSetupOptions): PaystackHandler
}

declare global {
  interface Window {
    PaystackPop?: PaystackPop
  }
}

const SCRIPT_URL = 'https://js.paystack.co/v1/inline.js'
let loadPromise: Promise<void> | null = null

/** Ensures the Paystack Inline script is loaded in the browser. */
export function loadPaystack(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Paystack requires a browser'))
  }
  if (window.PaystackPop) return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      loadPromise = null
      reject(new Error('Failed to load Paystack'))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}

/**
 * Opens Paystack Inline checkout and resolves with the successful reference.
 * @param options.amount Amount in kobo.
 * @param options.reference Unique transaction reference (used for verify/webhook idempotency).
 */
export async function payWithPaystack(options: {
  publicKey: string
  email: string
  amount: number
  reference: string
  metadata?: Record<string, unknown>
}): Promise<string> {
  await loadPaystack()

  const paystack = window.PaystackPop
  if (!paystack) {
    throw new Error('Paystack is unavailable')
  }

  return new Promise((resolve, reject) => {
    const handler = paystack.setup({
      key: options.publicKey,
      email: options.email,
      amount: options.amount,
      currency: 'NGN',
      ref: options.reference,
      metadata: options.metadata,
      callback: (response) => resolve(response.reference),
      onClose: () => reject(new Error('Payment cancelled')),
    })
    handler.openIframe()
  })
}
