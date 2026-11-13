import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatContentDate } from '../lib/content'

function formatAmount(amount: number): string {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function PaymentHistory() {
  const { donations } = useAuth()
  const [searchParams] = useSearchParams()
  const highlightedId = searchParams.get('donation')

  const total = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const highlighted = highlightedId
    ? donations.find((donation) => donation.id === highlightedId)
    : undefined

  if (!donations.length) {
    return (
      <main className="flex min-h-screen items-center justify-center px-gutter">
        <div className="space-y-md text-center">
          <h1 className="font-headline-md text-headline-md text-primary">
            No donations yet
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Your donation and payment history will appear here once you give.
          </p>
          <Link
            to="/donate"
            className="inline-block rounded-lg bg-primary px-lg py-md font-button text-button text-on-primary"
          >
            Make a donation
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-surface-container-low pt-24 pb-xl">
      <div className="mx-auto max-w-container-max px-gutter">
        <div className="mb-lg flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display-lg text-display-lg text-primary">
              Donation &amp; Payment History
            </h1>
            <p className="mt-sm font-body-md text-body-md text-on-surface-variant">
              Every verified donation and payment on your account.
            </p>
          </div>
          <div className="flex gap-sm">
            <button
              onClick={() => window.print()}
              className="rounded-lg border border-outline-variant px-md py-sm font-button text-button text-primary transition-colors hover:bg-surface-container-low print:hidden"
            >
              <span className="material-symbols-outlined align-middle">print</span>{' '}
              Print history
            </button>
            <Link
              to="/donate"
              className="rounded-lg bg-primary px-md py-sm font-button text-button text-on-primary transition-all hover:bg-primary-container print:hidden"
            >
              Donate again
            </Link>
          </div>
        </div>

        {highlightedId && highlighted && (
          <div className="mb-lg rounded-xl border border-outline-variant bg-primary-fixed px-md py-sm font-body-sm text-body-sm text-on-primary-fixed">
            Payment confirmed — {highlighted.reference ?? `#${highlighted.id.slice(0, 8)}`}{' '}
            for &#8358;{formatAmount(highlighted.amount)}.
          </div>
        )}

        {highlightedId && !highlighted && (
          <div className="mb-lg rounded-xl border border-outline-variant bg-surface-container-low px-md py-sm font-body-sm text-body-sm text-on-surface-variant">
            We could not find that payment on this account yet. It may still be
            confirming — refresh in a moment.
          </div>
        )}

        <div className="mb-lg grid gap-md sm:grid-cols-3">
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
            <p className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Total given
            </p>
            <p className="mt-sm font-headline-sm text-headline-sm text-primary">
              &#8358;{formatAmount(total)}
            </p>
          </div>
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
            <p className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Payments
            </p>
            <p className="mt-sm font-headline-sm text-headline-sm text-primary">
              {donations.length}
            </p>
          </div>
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
            <p className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Latest
            </p>
            <p className="mt-sm font-headline-sm text-headline-sm text-primary">
              {formatContentDate(donations[0].date)}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
          <table className="min-w-full text-left">
            <thead className="bg-surface-container-low">
              <tr className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
                <th className="px-md py-sm">Date</th>
                <th className="px-md py-sm">Reference</th>
                <th className="px-md py-sm">Type</th>
                <th className="px-md py-sm">Allocation</th>
                <th className="px-md py-sm">Channel</th>
                <th className="px-md py-sm text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {donations.map((donation) => {
                const isHighlighted = donation.id === highlightedId
                return (
                  <tr
                    key={donation.id}
                    className={`font-body-sm text-body-sm text-on-surface ${
                      isHighlighted ? 'bg-primary-fixed/50' : ''
                    }`}
                  >
                    <td className="whitespace-nowrap px-md py-sm">
                      {formatContentDate(donation.date)}
                    </td>
                    <td className="whitespace-nowrap px-md py-sm font-mono text-xs text-on-surface-variant">
                      {donation.reference ?? `#${donation.id.slice(0, 8)}`}
                    </td>
                    <td className="whitespace-nowrap px-md py-sm capitalize">
                      {donation.type}
                    </td>
                    <td className="whitespace-nowrap px-md py-sm">
                      {donation.allocation}
                    </td>
                    <td className="whitespace-nowrap px-md py-sm capitalize text-on-surface-variant">
                      {donation.channel?.replace(/_/g, ' ') ?? '—'}
                    </td>
                    <td className="whitespace-nowrap px-md py-sm text-right font-bold text-primary">
                      &#8358;{formatAmount(donation.amount)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-md font-body-sm text-body-sm text-on-surface-variant print:hidden">
          Only verified payments appear here. Donations made while signed out are
          not linked to your account.
        </p>
      </div>
    </main>
  )
}
