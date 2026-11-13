import { Link } from 'react-router-dom'
import { faqItems } from '../lib/content'

export default function Faq() {
  return (
    <main className="min-h-screen bg-surface pb-xl pt-18">
      <section className="container-shell py-xl">
        <div className="mx-auto mb-xl max-w-3xl text-center">
          <div className="mx-auto mb-md flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary-fixed/40 ring-1 ring-secondary/15">
            <span className="material-symbols-outlined text-4xl text-secondary">help</span>
          </div>
          <h1 className="mb-sm font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
            Frequently Asked Questions
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Find answers to common questions about Leadership Course Abuja.
          </p>
        </div>

        {faqItems.length === 0 ? (
          <div className="card mx-auto max-w-3xl p-lg text-center">
            <p className="mb-md font-body-md text-body-md text-on-surface-variant">
              No Frequently Asked Questions for now.
            </p>
            <Link
              to="/"
              className="btn btn-primary"
            >
              <span className="material-symbols-outlined">home</span>
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-3xl space-y-md">
              {faqItems.map((item) => (
                <details
                  key={item.slug}
                  className="card group p-md transition-all open:border-secondary/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-md font-headline-sm text-headline-sm text-primary [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-low text-primary transition-transform group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <div
                    className="mt-md font-body-md text-on-surface-variant [&_a]:text-secondary [&_a]:underline [&_li]:leading-relaxed [&_p]:leading-relaxed [&_p+p]:mt-sm [&_ul]:list-disc [&_ul]:space-y-sm [&_ul]:pl-6"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </details>
              ))}
            </div>

            <div className="mt-xl text-center">
              <Link
                to="/"
                className="btn btn-outline"
              >
                <span className="material-symbols-outlined">home</span>
                Back to Home
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
