import { Link } from 'react-router-dom'

export default function Faq() {
  return (
    <main className="min-h-screen pt-24 pb-xl bg-surface">
      <section className="mx-auto flex min-h-[60vh] max-w-container-max flex-col items-center justify-center px-gutter text-center">
        <div className="mb-md flex h-20 w-20 items-center justify-center rounded-full bg-primary-fixed">
          <span className="material-symbols-outlined text-4xl text-primary">help</span>
        </div>
        <h1 className="mb-sm font-display-lg text-display-lg text-primary">
          Frequently Asked Questions
        </h1>
        <p className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
          No Frequently Asked Questions for now 😎
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-sm rounded-lg bg-primary px-lg py-md font-button text-button text-on-primary transition-all hover:bg-primary-container active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">home</span>
          Back to Home
        </Link>
      </section>
    </main>
  )
}
