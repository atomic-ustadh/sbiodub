import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import posts from '../data/posts'

export default function BlogPost() {
  const { user, isBookmarked, toggleBookmark } = useAuth()
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-gutter">
        <h1 className="font-headline-md text-headline-md text-primary mb-md">Post Not Found</h1>
        <Link to="/resources" className="rounded-lg bg-primary text-on-primary px-lg py-md font-button">
          Back to Resources
        </Link>
      </main>
    )
  }

  return (
    <main className="pt-18 pb-xl">
      <article>
        {/* Hero */}
        <div className="relative overflow-hidden h-96 md:h-144">
          <img
            className="object-cover w-full h-full"
            src={post.image}
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto p-gutter max-w-container-max">
            <div className="flex gap-xs mb-md">
              <span className="px-3 py-1 rounded bg-secondary text-on-secondary font-label-md text-label-md">
                {post.type}
              </span>
              <span className="px-3 py-1 rounded bg-surface/20 text-on-primary font-label-md text-label-md backdrop-blur-sm">
                {post.category}
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-primary mb-sm">
              {post.title}
            </h1>
            <div className="flex items-center gap-md text-on-primary/80 font-body-sm">
              <span>By {post.author}</span>
              <span className="w-1 h-1 rounded-full bg-on-primary/40" />
              <span>{post.date}</span>
              {user && (
                <>
                  <span className="w-1 h-1 rounded-full bg-on-primary/40" />
                  <button onClick={() => toggleBookmark(post.slug)} className="flex items-center gap-xs hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">{isBookmarked(post.slug) ? 'bookmark' : 'bookmark_border'}</span>
                    {isBookmarked(post.slug) ? 'Saved' : 'Save'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-container-max px-gutter py-xl">
          <div className="max-w-3xl mx-auto">
            <p className="leading-relaxed font-body-lg text-body-lg text-on-surface-variant mb-lg">
              {post.excerpt}
            </p>
            <div
              className="prose prose-lg max-w-none prose-headings:font-headline-md prose-headings:text-headline-md prose-headings:text-primary prose-headings:mt-xl prose-headings:mb-md prose-p:text-body-md prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:mb-md prose-li:text-body-md prose-li:text-on-surface-variant prose-ul:space-y-sm prose-ul:mb-lg prose-ol:space-y-sm prose-ol:mb-lg prose-strong:text-primary prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-hr:border-outline-variant"
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
