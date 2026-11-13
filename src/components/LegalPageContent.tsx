import { Link } from 'react-router-dom'
import { formatContentDate, getLegalPageBySlug } from '../lib/content'

export default function LegalPageContent({ slug }: { slug: string }) {
  const page = getLegalPageBySlug(slug)

  if (!page) {
    return (
      <main className="pb-xl pt-18">
        <section className="container-shell py-xl">
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
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
    <main className="pb-xl pt-18">
      <section className="container-shell py-xl">
        <Link
          to="/"
          className="mb-lg inline-flex items-center gap-sm font-button text-primary hover:underline"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </Link>

        <div className="card mx-auto max-w-4xl p-lg md:p-xl">
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
            {page.title}
          </h1>
          <div className="divider-gold mb-md" />
          <p className="mb-xl font-body-sm text-on-surface-variant">
            Last Updated: {formatContentDate(page.lastUpdated)}
          </p>

          <div
            className="article-prose max-w-3xl"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </main>
  )
}
