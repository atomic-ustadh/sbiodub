import { Link } from 'react-router-dom'
import { formatContentDate, getLegalPageBySlug } from '../lib/content'

export default function LegalPageContent({ slug }: { slug: string }) {
  const page = getLegalPageBySlug(slug)

  if (!page) {
    return (
      <main className="pt-24 pb-xl">
        <section className="mx-auto max-w-container-max px-gutter">
          <h1 className="mb-md font-display-lg text-display-lg text-primary">
            Page Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-sm font-button text-primary hover:underline"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-xl">
      <section className="mx-auto max-w-container-max px-gutter">
        <Link
          to="/"
          className="mb-lg inline-flex items-center gap-sm font-button text-primary hover:underline"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </Link>

        <h1 className="mb-lg font-display-lg text-display-lg text-primary">
          {page.title}
        </h1>
        <p className="mb-xl font-body-sm text-on-surface-variant">
          Last Updated: {formatContentDate(page.lastUpdated)}
        </p>

        <div
          className="max-w-3xl font-body-md text-on-surface-variant [&_h2]:mb-sm [&_h2]:mt-lg [&_h2]:font-headline-sm [&_h2]:text-headline-sm [&_h2]:text-primary [&_h2:first-child]:mt-0 [&_li]:leading-relaxed [&_p]:leading-relaxed [&_p+p]:mt-md [&_section]:mb-lg [&_strong]:text-primary [&_ul]:mt-sm [&_ul]:list-disc [&_ul]:space-y-sm [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </section>
    </main>
  )
}
