import { useState } from 'react'
import { Link } from 'react-router-dom'
import SubscribeForm from '../components/SubscribeForm'
import posts from '../data/posts'

const categories = [
  'All Resources',
  'Faith & Spirit',
  'Professional Skills',
  'Mental Wellness',
  'Community Action',
]

export default function Resources() {
  const [activeCat, setActiveCat] = useState('All Resources')

  const filtered = activeCat === 'All Resources'
    ? posts
    : posts.filter((p) => p.category === activeCat)

  const featured = posts.find((p) => p.featured)

  return (
    <main className="pt-24 pb-xl">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-xl mb-xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/aida-public/AB6AXuChevT9sfRU9Ibfph95Q509PSc9OXi2yVQxLCrqY6O2oRm10toAW3HLv4r1t7g29h1lVMNf4aO2IjZ7VJgWg0RTd-0-_RNa3zpd2PXUOAA0bfXFBTkn1AyXlC-Z-K0Cxo_AD3hgjFFGTUAurvRIIMD4ou8NwptmedqJPhn1Fxsq1vkYrzWD8V9xTxJ35qHohkEa1TcEBTg6xq5-osxeDZaFR52cGrzoD5C4hh2RYMoeQYrM0t54vZTZLATsa0cbq9q1I7IeQnSUeNQ5)",
            opacity: 0.05,
          }}
        />
        <div className="relative z-10 px-2 mx-auto text-center max-w-container-max">
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-secondary-fixed-dim mb-md">
            Empowerment Resources
          </h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-primary-container mb-lg">
            Discover a curated library of guides, articles, and videos designed
            to fuel your spiritual, professional, and personal growth.
          </p>
          <div className="relative mx-auto max-w-144 group">
            <input
              className="w-full px-12 py-4 transition-all border rounded-full shadow-lg bg-surface-container-lowest border-outline/30 focus:ring-2 focus:ring-secondary focus:outline-none text-on-surface"
              placeholder="Search for faith, career, or mental health topics..."
              type="text"
            />
            <span className="absolute -translate-y-1/2 material-symbols-outlined left-4 top-1/2 text-primary">
              search
            </span>
            <button className="absolute px-6 py-2 transition-colors -translate-y-1/2 rounded-full right-2 top-1/2 bg-secondary text-on-primary font-button text-button hover:bg-primary">
              Find
            </button>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="mx-auto max-w-container-max px-gutter mb-xl">
          <Link
            to={`/resources/${featured.slug}`}
            className="flex flex-col overflow-hidden transition-shadow duration-500 border shadow-md md:flex-row bg-surface-container-lowest rounded-xl border-outline-variant hover:shadow-xl"
          >
            <div className="relative md:w-1/2 min-h-75">
              <img
                className="absolute inset-0 object-cover w-full h-full"
                alt={featured.title}
                src={featured.image}
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1 rounded-full shadow-sm bg-secondary-container text-on-secondary-container font-label-md text-label-md">
                  Featured Guide
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center md:w-1/2 p-lg">
              <h2 className="font-headline-md text-headline-md text-primary mb-md">
                {featured.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-md">
                <span className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-on-primary font-button text-button group">
                  Read Guide{" "}
                  <span className="transition-transform material-symbols-outlined group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </span>
                <span className="font-label-md text-label-md text-outline">
                  {featured.readTime}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Filters */}
      <section className="mx-auto max-w-container-max px-gutter mb-lg">
        <div className="flex flex-wrap items-center gap-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={
                activeCat === cat
                  ? "bg-primary text-on-primary px-6 py-2 rounded-full font-button text-button"
                  : "bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-button text-button hover:bg-surface-variant transition-colors"
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Resource Grid */}
      <section className="mx-auto max-w-container-max px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {filtered.filter((p) => !p.featured).map((post) => (
            <Link
              key={post.slug}
              to={`/resources/${post.slug}`}
              className="flex flex-col overflow-hidden transition-all border rounded-lg bg-surface-container-lowest border-outline-variant hover:shadow-lg group"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  alt={post.title}
                  src={post.image}
                />
                <div className="absolute flex bottom-2 left-2 gap-xs">
                  <span className={`px-3 py-1 rounded font-label-md text-label-md ${
                    post.type === 'Video'
                      ? 'bg-tertiary text-on-tertiary'
                      : 'bg-secondary text-on-secondary'
                  }`}>
                    {post.type}
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-md grow">
                <span className="text-secondary font-label-md text-label-md mb-xs">
                  {post.category}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">
                  {post.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto border-t pt-md border-outline-variant">
                  <span className="flex items-center gap-1 text-primary font-button text-button">
                    {post.type === 'Video' ? 'Watch Now' : post.type === 'Guide' ? 'Read Guide' : 'Learn More'}{" "}
                    <span className="text-sm material-symbols-outlined">
                      {post.type === 'Video' ? 'play_arrow' : post.type === 'Guide' ? 'description' : 'open_in_new'}
                    </span>
                  </span>
                  <span className="text-outline font-label-md text-label-md">
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-container-max px-gutter mt-xl">
        <div className="flex flex-col items-center justify-between bg-surface-container-highest rounded-2xl p-lg md:flex-row gap-lg">
          <div className="md:w-1/2">
            <h2 className="font-headline-md text-headline-md text-primary mb-sm">
              Stay Updated
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Get the latest resources and event invitations delivered straight
              to your inbox weekly.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* FAB */}
      <button className="fixed z-40 flex items-center justify-center transition-all rounded-full shadow-lg bottom-gutter right-gutter bg-secondary text-on-secondary w-14 h-14 hover:scale-110 active:scale-95">
        <span className="material-symbols-outlined">help</span>
      </button>
    </main>
  )
}
