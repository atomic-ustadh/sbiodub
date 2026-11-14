import { useParams, Link } from 'react-router-dom'
import { posts, formatContentDate, type PostType } from '../lib/content'
import NotFound from './NotFound'

const typeIcons: Record<PostType, string> = {
  Guide: 'menu_book',
  Article: 'article',
  Video: 'play_circle',
}

export default function BlogPost({ slug: slugProp }: { slug?: string }) {
  const { slug: slugParam } = useParams()
  const slug = slugProp ?? slugParam
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return <NotFound />
  }

  return (
    <main className="pt-18 pb-xl">
      <article>
        {/* Hero */}
        <div className="relative overflow-hidden bg-primary">
          <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,209,138,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(159,210,189,0.16),transparent_45%)]" />
          <span className="material-symbols-outlined absolute -right-8 -top-10 text-[220px] text-on-primary/10">
            {typeIcons[post.type]}
          </span>
          <div className="relative z-10 mx-auto max-w-container-max px-gutter py-16 md:py-24">
            <div className="mb-md flex flex-wrap items-center gap-xs">
              <span className="chip bg-secondary-container text-on-secondary-container">
                {post.type}
              </span>
              <span className="chip bg-on-primary/10 text-on-primary backdrop-blur-sm">
                {post.category}
              </span>
            </div>
            <h1 className="mb-sm max-w-4xl font-display-lg text-display-lg-mobile text-on-primary md:text-display-lg">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-md font-body-sm text-on-primary/70">
              <span>By {post.author}</span>
              <span className="h-1 w-1 rounded-full bg-on-primary/40" />
              <span>{formatContentDate(post.date)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-container-max px-gutter py-xl">
          <div className="mx-auto max-w-3xl">
            <p className="mb-lg font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              {post.excerpt}
            </p>
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* Back + More Posts */}
      <section className="mx-auto max-w-container-max px-gutter">
        <div className="flex flex-col items-start justify-between border-t border-outline-variant pt-lg sm:flex-row sm:items-center gap-md">
          <Link
            to="/resources"
            className="flex items-center gap-sm text-primary font-button hover:underline"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Resources
          </Link>
          <div className="flex flex-wrap gap-md">
            {posts.filter((p) => p.slug !== post.slug).slice(0, 2).map((p) => (
              <Link
                key={p.slug}
                to={`/resources/${p.slug}`}
                className="text-sm transition-colors text-on-surface-variant hover:text-primary"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
