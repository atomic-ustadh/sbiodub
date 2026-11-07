import { Link } from 'react-router-dom'
import { faqItems } from '../lib/content'

export default function Faq() {
  return (
    <main className="min-h-screen bg-surface pt-24 pb-xl">
      <section className="mx-auto max-w-container-max px-gutter">
        <div className="mx-auto mb-xl max-w-3xl text-center">
          <div className="mx-auto mb-md flex h-20 w-20 items-center justify-center rounded-full bg-primary-fixed">
            <span className="material-symbols-outlined text-4xl text-primary">help</span>
          </div>
          <h1 className="mb-sm font-display-lg text-display-lg text-primary">
            Frequently Asked Questions
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Find answers to common questions about Leadership Course Abuja.
          </p>
        </div>

        {faqItems.length === 0 ? (
          <div className="mx-auto max-w-3xl rounded-xl border border-outline-variant bg-white p-lg text-center">
            <p className="mb-md font-body-md text-body-md text-on-surface-variant">
              No Frequently Asked Questions for now.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-sm rounded-lg bg-primary px-lg py-md font-button text-button text-on-primary transition-all hover:bg-primary-container active:scale-[0.98]"
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
                  className="group rounded-xl border border-outline-variant bg-white p-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-md font-headline-sm text-headline-sm text-primary [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                      expand_more
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
                className="inline-flex items-center gap-sm rounded-lg bg-primary px-lg py-md font-button text-button text-on-primary transition-all hover:bg-primary-container active:scale-[0.98]"
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
