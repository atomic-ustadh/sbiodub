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
  const { donations, dataError, refreshDonations } = useAuth()
  const [searchParams] = useSearchParams()
  const highlightedId = searchParams.get('donation')

  const total = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const highlighted = highlightedId
    ? donations.find((donation) => donation.id === highlightedId)
    : undefined

  if (!donations.length) {
    return (
      <main className="flex min-h-screen items-center justify-center px-gutter pt-18">
        <div className="card w-full max-w-2xl space-y-md p-lg text-center">
          {dataError ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-container/40 text-secondary">
                <span className="material-symbols-outlined text-3xl">cloud_off</span>
              </div>
              <h1 className="font-headline-md text-headline-md text-primary">
                Donation history unavailable
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {dataError}
              </p>
              <button
                onClick={() => void refreshDonations()}
                className="btn btn-primary"
              >
                Try again
              </button>
            </>
          ) : (
            <>
              <h1 className="font-headline-md text-headline-md text-primary">
                No donations yet
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Your donation and payment history will appear here once you give.
              </p>
              <Link
                to="/donate"
                className="btn btn-primary"
              >
                Make a donation
              </Link>
            </>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-surface-container-low pb-xl pt-18">
      <div className="mx-auto w-full max-w-container-max px-gutter py-xl">
        <div className="mb-lg flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
              Donation &amp; Payment History
            </h1>
            <p className="mt-sm font-body-md text-body-md text-on-surface-variant">
              Every verified donation and payment on your account.
            </p>
          </div>
          <div className="flex flex-wrap gap-sm">
            <button
              onClick={() => window.print()}
              className="btn btn-outline px-md py-sm print:hidden"
            >
              <span className="material-symbols-outlined align-middle">print</span>{' '}
              Print history
            </button>
            <Link
              to="/donate"
              className="btn btn-primary px-md py-sm print:hidden"
            >
              Donate again
            </Link>
          </div>
        </div>

        {highlightedId && highlighted && (
          <div className="mb-lg rounded-2xl border border-primary/15 bg-primary-fixed px-md py-sm font-body-sm text-body-sm text-on-primary-fixed">
            Payment confirmed — {highlighted.reference ?? `#${highlighted.id.slice(0, 8)}`}{' '}
            for &#8358;{formatAmount(highlighted.amount)}.
          </div>
        )}

        {highlightedId && !highlighted && (
          <div className="mb-lg rounded-2xl border border-outline-variant bg-surface-container-low px-md py-sm font-body-sm text-body-sm text-on-surface-variant">
            We could not find that payment on this account yet. It may still be
            confirming — refresh in a moment.
          </div>
        )}

        {dataError && (
          <div className="mb-lg flex flex-col gap-sm rounded-2xl border border-secondary/25 bg-secondary-container/40 px-md py-sm font-body-sm text-body-sm text-on-secondary-container sm:flex-row sm:items-center sm:justify-between">
            <span>{dataError} Showing the last records we loaded.</span>
            <button
              onClick={() => void refreshDonations()}
              className="shrink-0 rounded-full border border-secondary/30 px-sm py-xs font-button text-button text-secondary transition-colors hover:bg-secondary/10"
            >
              Try again
            </button>
          </div>
        )}

        <div className="mb-lg grid gap-md sm:grid-cols-3">
          <div className="card p-md">
            <p className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Total
            </p>
            <p className="mt-sm font-headline-sm text-headline-sm text-primary">
              &#8358;{formatAmount(total)}
            </p>
          </div>
          <div className="card p-md">
            <p className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Payments
            </p>
            <p className="mt-sm font-headline-sm text-headline-sm text-primary">
              {donations.length}
            </p>
          </div>
          <div className="card p-md">
            <p className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant">
              Latest
            </p>
            <p className="mt-sm font-headline-sm text-headline-sm text-primary">
              {formatContentDate(donations[0].date)}
            </p>
          </div>
        </div>

        <div className="card overflow-x-auto">
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
