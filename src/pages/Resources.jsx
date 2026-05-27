import { useState } from 'react'
import SubscribeForm from '../components/SubscribeForm'

const categories = ['All Resources', 'Faith & Spirit', 'Professional Skills', 'Mental Wellness', 'Community Action']

export default function Resources() {
  const [activeCat, setActiveCat] = useState('All Resources')

  return (
    <main className="pt-24 pb-xl">
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden py-xl mb-xl">
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuChevT9sfRU9Ibfph95Q509PSc9OXi2yVQxLCrqY6O2oRm10toAW3HLv4r1t7g29h1lVMNf4aO2IjZ7VJgWg0RTd-0-_RNa3zpd2PXUOAA0bfXFBTkn1AyXlC-Z-K0Cxo_AD3hgjFFGTUAurvRIIMD4ou8NwptmedqJPhn1Fxsq1vkYrzWD8V9xTxJ35qHohkEa1TcEBTg6xq5-osxeDZaFR52cGrzoD5C4hh2RYMoeQYrM0t54vZTZLATsa0cbq9q1I7IeQnSUeNQ5)',
            opacity: 0.05,
          }}
        />
        <div className="max-w-container-max mx-auto px-gutter relative z-10 text-center">
          <h1 className="font-display-lg text-display-lg text-secondary-fixed-dim mb-md">Empowerment Resources</h1>
          <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-lg">
            Discover a curated library of guides, articles, and videos designed to fuel your spiritual, professional, and
            personal growth.
          </p>
          <div className="max-w-144 mx-auto relative group">
            <input
              className="w-full bg-surface-container-lowest border border-outline/30 rounded-full px-12 py-4 focus:ring-2 focus:ring-secondary focus:outline-none transition-all shadow-lg text-on-surface"
              placeholder="Search for faith, career, or mental health topics..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-on-primary px-6 py-2 rounded-full font-button text-button hover:bg-primary transition-colors">
              Find
            </button>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-container-max mx-auto px-gutter mb-xl">
        <div className="flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-md border border-outline-variant hover:shadow-xl transition-shadow duration-500">
          <div className="md:w-1/2 relative min-h-75">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt="A serene photograph of a young professional Muslim woman sitting in a modern, sunlit co-working space"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvS4qWFyfbHWyEzORLwSw0EIfT8f8b644AwRZRGsDXstow9oWgj47vwjRbhF0sQyNyhmpGcqr0Oa8IS3pUV8MTR3MqI5vN2X_2mprJXSnVakSB64OA6FiXkQYy9hEo6fIegyXAtMIpZrkSLzhZfex4QGws1ujRKqxtzUkQuqIRKgr3fD_q39G4ReaGFvOnWSVe_sD7vGl61yGQi7dZ9fREEbHkXQ2tcBMDkzW5nVyeqcX-ZMwNVQNlff6iXGYPZSBvMC0l7yYxjjbg"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-md text-label-md shadow-sm">Featured Guide</span>
            </div>
          </div>
          <div className="md:w-1/2 p-lg flex flex-col justify-center">
            <h2 className="font-headline-md text-headline-md text-primary mb-md">Navigating Your Career Path with Faith</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
              Learn how to align your professional ambitions with your spiritual values. This comprehensive guide covers
              ethical decision-making, finding purpose, and maintaining balance in the modern workplace.
            </p>
            <div className="flex items-center gap-md">
              <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-button text-button flex items-center gap-2 group">
                Read Guide{' '}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <span className="font-label-md text-label-md text-outline">12 Min Read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-container-max mx-auto px-gutter mb-lg">
        <div className="flex flex-wrap items-center gap-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={
                activeCat === cat
                  ? 'bg-primary text-on-primary px-6 py-2 rounded-full font-button text-button'
                  : 'bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-button text-button hover:bg-surface-variant transition-colors'
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Resource Grid */}
      <section className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {/* Card 1 */}
          <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-all group">
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="An open book with elegant calligraphy"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfRqfCx08cOF09NvGb1A4T2tYYq9qEhR1uF0iWxCTbvDHNiQe7n07yULSfREX6jiKXMvllUJqsTjqmPj4wzg8ktrNplxY_stAmmDYPCiabPnyScFjwMRAz9y2oWP0pXChI8jMCdq4qVOBlfjPqy18WWJ1FQiL6OpT_dBkF4F5YmV2pdWwZB70qRToLO4aPL2VTkSZr2MUaNk09KTp1ZGIuJ07FdhiQFF_I5pcLPNuvd4IcmY0Zj-VFY2-kL87ta4Nzrn7AhGIJjrtd"
              />
              <div className="absolute bottom-2 left-2 flex gap-xs">
                <span className="bg-secondary text-on-secondary px-3 py-1 rounded font-label-md text-label-md">Article</span>
              </div>
            </div>
            <div className="p-md grow flex flex-col">
              <span className="text-secondary font-label-md text-label-md mb-xs">Faith & Spirit</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Morning Rituals for Spiritual Clarity</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg line-clamp-3">
                Discover the transformative power of a consistent morning routine rooted in spiritual mindfulness and
                gratitude.
              </p>
              <div className="mt-auto pt-md border-t border-outline-variant flex justify-between items-center">
                <span className="text-primary font-button text-button flex items-center gap-1 cursor-pointer">
                  Learn More <span className="material-symbols-outlined text-sm">open_in_new</span>
                </span>
                <span className="text-outline font-label-md text-label-md">June 12</span>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-all group">
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="A tranquil mountain lake at dawn"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8tKVJPuv6HLsWqBA13U4ChAd7_gWISQg1SYXSutcd5A1sqY3Vdx2n2dBakiP5fL9wJPNyv547OyF5ow7vvvTFSBasvkoHL6JIpZu2OaUu302_sqDyWfRYNNwwJfOVPOnhcAlsDVkU85dKBbWWz961Uhh1ogAeOnPylllnbKhPHrtKaQvIPIXzG8wf9Rnkvnf_W0X1gyAaeaNVOHnkH_TV8kZd40RWsPJkrWnY08qfN8Ow1m7AMWjDaTQH7lt6lrSYr6Es5yIdLpE_"
              />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="material-symbols-outlined text-on-primary text-6xl" style={{ fontVariationSettings: '"FILL" 1' }}>play_circle</span>
              </div>
              <div className="absolute bottom-2 left-2 flex gap-xs">
                <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded font-label-md text-label-md">Video</span>
              </div>
            </div>
            <div className="p-md grow flex flex-col">
              <span className="text-secondary font-label-md text-label-md mb-xs">Mental Wellness</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Managing Anxiety: A Holistic Approach</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg line-clamp-3">
                Expert advice on combining psychological techniques with spiritual practices to find inner peace.
              </p>
              <div className="mt-auto pt-md border-t border-outline-variant flex justify-between items-center">
                <span className="text-primary font-button text-button flex items-center gap-1 cursor-pointer">
                  Watch Now <span className="material-symbols-outlined text-sm">play_arrow</span>
                </span>
                <span className="text-outline font-label-md text-label-md">15:20 min</span>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-all group">
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="A modern desk setup with laptop and notebook"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlylZN_KfbuRZe9guw70xBE78xQH6e9Wz1MxVWJQDjH-gEQwi6j1WLvvPqF4WFDz5xxc91ys5a0px4gSmTas7lbrOVhlwk6P1B0RSWwGZKncaBPLoBiFFwUcTikUJLvagGZbKgOunlg0JbTNbShNmeQBSyMWbCPKfyAR8M6lJalqfEdCfFa_UqLyU2XuOPaEkcL5q59_sUoYBCKth_HNC-9Q16PFIQik4DNbXhEMTZ4dXrB89bbzs5mf88-2ONlbQm_-b9VRJougcD"
              />
              <div className="absolute bottom-2 left-2 flex gap-xs">
                <span className="bg-secondary text-on-secondary px-3 py-1 rounded font-label-md text-label-md">Guide</span>
              </div>
            </div>
            <div className="p-md grow flex flex-col">
              <span className="text-secondary font-label-md text-label-md mb-xs">Professional Skills</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Mastering the Art of Public Speaking</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg line-clamp-3">
                A step-by-step workbook for youth leaders to build confidence and deliver impactful messages to any
                audience.
              </p>
              <div className="mt-auto pt-md border-t border-outline-variant flex justify-between items-center">
                <span className="text-primary font-button text-button flex items-center gap-1 cursor-pointer">
                  Download PDF <span className="material-symbols-outlined text-sm">download</span>
                </span>
                <span className="text-outline font-label-md text-label-md">2.4 MB</span>
              </div>
            </div>
          </article>

          {/* Card 4 - wide */}
          <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-all group lg:col-span-2">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Diverse young adults collaborating around a table"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcuOTr-C1r02tBmFgJ0_XkyTLfxN2KZC6Ge76lXQ5qBY2YAunLlkC5oQY46E7ktLTKeXjBeAVX30TSZyB04LUllnr4QX5NqgepDigz5EgINF2uPcr2800X_BMIZhMmWX3EOBWLK7dpRSuT3XhtrJT3TxRkZ3gQ6Ks5gtu54mhdAn5lPTb6gHXUAEr0qKAjF2adSJHBDPX1trw0Bcc6Gk_dC9UNonHitIKvxBMMcZz4d2d681wmp6UYd7qTk68Ys-NZxeWg8mqSz2fp"
                />
              </div>
              <div className="md:w-3/5 p-md flex flex-col">
                <span className="text-secondary font-label-md text-label-md mb-xs">Community Action</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Launching Your First Community Project</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                  From conceptualization to execution, this long-form guide provides the tools you need to make a tangible
                  impact in your local neighborhood.
                </p>
                <div className="mt-auto pt-md border-t border-outline-variant flex justify-between items-center">
                  <span className="text-primary font-button text-button flex items-center gap-1 cursor-pointer">
                    Read Article <span className="material-symbols-outlined text-sm">article</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                    <span className="text-outline font-label-md text-label-md">Premium Content</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-container-max mx-auto px-gutter mt-xl">
        <div className="bg-surface-container-highest rounded-2xl p-lg flex flex-col md:flex-row items-center justify-between gap-lg">
          <div className="md:w-1/2">
            <h2 className="font-headline-md text-headline-md text-primary mb-sm">Stay Updated</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Get the latest resources and event invitations delivered straight to your inbox weekly.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* FAB */}
      <button className="fixed bottom-gutter right-gutter bg-secondary text-on-secondary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined">help</span>
      </button>
    </main>
  )
}
