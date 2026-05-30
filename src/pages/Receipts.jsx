import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ReceiptRow({ d }) {
  return (
    <div className="border border-outline-variant rounded-lg p-md bg-surface-container-lowest print:border print:shadow-none">
      <div className="flex items-center justify-between mb-sm">
        <span className="font-headline-sm text-headline-sm text-primary">Noor Youth Organization</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">Receipt #{d.id?.slice(0, 8)}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md font-body-md">
        <div>
          <span className="font-label-md text-label-md text-on-surface-variant block">Date</span>
          <span className="text-on-surface">{new Date(d.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div>
          <span className="font-label-md text-label-md text-on-surface-variant block">Amount</span>
          <span className="text-on-surface font-bold">&#8358;{d.amount.toLocaleString()}</span>
        </div>
        <div>
          <span className="font-label-md text-label-md text-on-surface-variant block">Type</span>
          <span className="text-on-surface-variant capitalize">{d.type}</span>
        </div>
        <div>
          <span className="font-label-md text-label-md text-on-surface-variant block">Allocation</span>
          <span className="text-on-surface-variant capitalize">{d.allocation}</span>
        </div>
      </div>
      <div className="mt-md flex justify-end">
        <button onClick={() => window.print()} className="flex items-center gap-sm text-primary font-button text-button hover:underline print:hidden">
          <span className="material-symbols-outlined">print</span> Print Receipt
        </button>
      </div>
    </div>
  )
}

export default function Receipts() {
  const { donations } = useAuth()
  const [searchParams] = useSearchParams()
  const singleId = searchParams.get('donation')

  const displayed = singleId ? donations.filter((d) => d.id === singleId) : donations

  if (!donations.length) {
    return (
      <main className="min-h-screen flex items-center justify-center px-gutter">
        <div className="text-center space-y-md">
          <h1 className="font-headline-md text-headline-md text-primary">No Donations Yet</h1>
          <Link to="/donate" className="inline-block bg-primary text-on-primary px-lg py-md rounded-lg font-button">Make a Donation</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-xl min-h-screen bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex items-center justify-between mb-lg">
          <div>
            <h1 className="font-display-lg text-display-lg text-primary">Donation Receipts</h1>
            <p className="text-on-surface-variant font-body-md">{displayed.length} receipt{displayed.length !== 1 ? 's' : ''}</p>
          </div>
          {singleId && (
            <Link to="/receipts" className="text-primary font-button hover:underline">View All</Link>
          )}
        </div>
        <div className="space-y-md">
          {displayed.map((d) => (
            <ReceiptRow key={d.id} d={d} />
          ))}
        </div>
        {!singleId && (
          <div className="mt-xl text-center">
            <Link to="/donate" className="inline-flex items-center gap-sm bg-primary text-on-primary font-button text-button px-lg py-md rounded-lg hover:opacity-90 transition-all">
              <span className="material-symbols-outlined">add</span> Make Another Donation
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
