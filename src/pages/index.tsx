import { useState } from 'react'
import { Link } from 'react-router-dom'
import { home_hero } from '../assets'
import { events, formatContentDate, getTodayIsoDate, testimonials } from '../lib/content'

export default function Platform() {
  // Track which testimonial is currently shown in the carousel
  const [current, setCurrent] = useState(0)
  const t = testimonials[current] ?? testimonials[0]
  const today = getTodayIsoDate()
  const upcomingEvents = events
    .filter((event) => event.date >= today)
    .slice(0, 3)

  return (
    <main className="pt-18">
      {/* ===== Hero Section ===== */}
      <section className="hero-gradient relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden py-xl">
        <div className="pattern-dots-light absolute inset-0 opacity-40" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 h-72 w-72 rounded-full bg-primary-fixed/10 blur-3xl" />

        <div className="container-shell relative z-10 grid items-center gap-xl lg:grid-cols-[1.05fr_0.95fr]">
          {/* Hero text */}
          <div className="max-w-2xl space-y-md">
            <h1 className="font-display-lg text-display-lg-mobile text-on-primary md:text-display-lg">
              Empowering the{" "}
              <span className="text-gold-gradient">Next Generation</span> of
              Muslim Leaders
            </h1>
            <p className="max-w-144 font-body-lg text-body-lg leading-relaxed text-on-primary/75">
              Building a vibrant community rooted in faith, service, and
              excellence. We provide the tools and support for young Muslims to
              thrive and lead in a modern world.
            </p>
            <div className="flex flex-wrap gap-sm pt-base">
              <Link to="/get-involved" className="btn btn-gold">
                Join the Movement
              </Link>
              <Link
                to="/about"
                className="btn border border-white/25 px-lg py-3 text-on-primary hover:border-secondary-fixed/60 hover:bg-white/10"
              >
                About LCA
              </Link>
            </div>
          </div>

          {/* Hero image with stat badge */}
          <div className="relative mx-auto hidden w-full max-w-128 lg:block">
            <div className="absolute -inset-4 rotate-3 rounded-4xl border border-secondary-fixed/25" />
            <div className="absolute -inset-4 -rotate-2 rounded-4xl border border-white/10" />
            <div className="relative overflow-hidden rounded-3xl shadow-float">
              <img
                className="aspect-4/5 w-full object-cover"
                alt="A diverse group of energetic young adults collaborating"
                src={home_hero}
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-transparent to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/30 bg-secondary-fixed p-md shadow-gold">
              <div className="flex items-center gap-sm">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
                <div>
                  <div className="font-headline-sm text-primary">500+</div>
                  <div className="font-body-sm text-primary/80">
                    Active Members
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Core Pillars Section ===== */}
      <section className="pattern-bg py-xl">
        <div className="container-shell">
          <div className="mb-xl">
            <h2 className="section-heading">Our Core Pillars</h2>
            <div className="divider-gold mt-sm" />
          </div>
          {/* Map over pillars array to render 3 cards */}
          <div className="grid gap-md md:grid-cols-3">
            {[
              {
                icon: "groups",
                title: "Community",
                desc: "Fostering lifelong bonds through brotherhood and sisterhood in a safe, inclusive environment.",
              },
              {
                icon: "mosque",
                title: "Faith",
                desc: "Deepening our connection to Allah through spiritual growth, education, and shared reflection.",
                bg: "bg-secondary-fixed/30",
                iconColor: "text-secondary",
              },
              {
                icon: "volunteer_activism",
                title: "Service",
                desc: "Giving back to the wider community through dedicated activism and impactful charity work.",
              },
            ].map(
              ({
                icon,
                title,
                desc,
                bg = "bg-primary-fixed/30",
                iconColor = "text-primary",
              }) => (
                <div
                  key={title}
                  className="card card-hover group p-lg text-center"
                >
                  <div
                    className={`mx-auto mb-md flex h-16 w-16 items-center justify-center rounded-2xl ${bg} ${iconColor} transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {icon}
                    </span>
                  </div>
                  <h3 className="mb-sm font-headline-sm text-headline-sm text-primary">
                    {title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {desc}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ===== Upcoming Events Section ===== */}
      <section className="bg-surface-container-low py-xl">
        <div className="container-shell">
          {/* Section header with "View All" link */}
          <div className="mb-xl flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-heading">Upcoming Events</h2>
              <p className="mt-xs text-on-surface-variant">
                Don&rsquo;t miss out on our latest gatherings.
              </p>
            </div>
            <Link
              to="/events"
              className="group inline-flex items-center gap-xs font-button text-button text-primary"
            >
              View All{" "}
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className="card px-lg py-xl text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                No upcoming events are scheduled right now.
              </p>
              <Link
                to="/events"
                className="mt-md inline-flex items-center gap-xs font-button text-button text-primary hover:underline"
              >
                View past events
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          ) : (
            <div className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="card card-hover group flex flex-col overflow-hidden"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={event.title}
                      src={event.img}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/55 via-transparent to-transparent" />
                    <div className="chip absolute left-md top-md bg-secondary-container text-on-secondary-container shadow-sm">
                      {event.category}
                    </div>
                  </div>
                  <div className="flex grow flex-col space-y-sm p-lg">
                    <div className="flex items-center gap-xs text-secondary">
                      <span className="material-symbols-outlined text-[18px]">
                        calendar_today
                      </span>
                      <span className="font-body-sm text-body-sm font-medium">
                        {formatContentDate(event.date)} &middot; {event.time}
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-primary">
                      {event.title}
                    </h4>
                    <p className="line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">
                      {event.desc}
                    </p>
                    <Link
                      to="/events"
                      className="btn btn-outline mt-auto w-full py-2.5"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== Impact Stories (Testimonials Carousel) Section ===== */}
      {t && (
        <section className="relative overflow-hidden bg-primary py-xl">
          <div className="absolute inset-0 geometric-pattern opacity-[0.08]" />
          <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
          <div className="container-shell relative z-10">
            <div className="mb-xl text-center">
              <h2 className="font-headline-md text-headline-md text-secondary-fixed">
                Voices of Our Youth
              </h2>
              <p className="mt-xs text-on-primary/60">
                Real stories from the heart of our community.
              </p>
            </div>
            <div className="grid items-center gap-xl md:grid-cols-2">
              {/* Testimonial author image */}
              <div className="relative mx-auto w-full max-w-112">
                <div className="absolute -inset-3 -rotate-2 rounded-3xl border border-secondary-fixed/25" />
                <div className="relative overflow-hidden rounded-3xl shadow-float">
                  <img
                    className="aspect-4/5 w-full object-cover"
                    alt={t.name}
                    src={t.image}
                  />
                </div>
              </div>
              {/* Testimonial quote + navigation controls */}
              <div className="space-y-md">
                <span className="material-symbols-outlined text-6xl text-secondary-fixed/70">
                  format_quote
                </span>
                <blockquote
                  key={current}
                  className="animate-[fadeIn_0.3s_ease-in-out] font-headline-sm text-headline-sm italic leading-relaxed text-on-primary"
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-body-md font-semibold text-secondary-fixed">
                    {t.name}
                  </p>
                  <p className="text-body-sm text-on-primary/60">{t.title}</p>
                </div>
                {/* Prev / Next buttons */}
                <div className="flex items-center gap-base pt-sm">
                  <button
                    onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-on-primary transition-colors hover:border-secondary-fixed/60 hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <span className="font-body-sm text-body-sm text-on-primary/60">
                    {current + 1} / {testimonials.length}
                  </span>
                  <button
                    onClick={() => setCurrent((current + 1) % testimonials.length)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-on-primary transition-colors hover:border-secondary-fixed/60 hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== Get Involved (CTA) Section ===== */}
      <section className="py-xl">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-4xl bg-primary-container p-lg shadow-float md:p-xl">
            <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
            <div className="relative z-10 grid items-center gap-xl md:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-md">
                <h2 className="font-display-lg text-headline-md text-on-primary md:text-display-lg">
                  Make an Impact Today
                </h2>
                <p className="font-body-lg text-body-lg text-on-primary-container">
                  Whether you have time to volunteer or wish to support our
                  mission through a donation, your contribution helps us grow the
                  next generation of leaders.
                </p>
                <div className="flex flex-wrap gap-sm pt-base">
                  <Link to="/get-involved" className="btn btn-gold">
                    Get Involved
                  </Link>
                  <Link
                    to="/donate"
                    className="btn border border-white/25 px-lg py-3 text-on-primary hover:border-secondary-fixed/60 hover:bg-white/10"
                  >
                    Make a Donation
                  </Link>
                </div>
              </div>
              {/* Decorative hexagon icons */}
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-sm">
                  <div
                    className="flex h-28 w-28 items-center justify-center bg-primary-fixed/95 shadow-lg md:h-32 md:w-32"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    <span className="material-symbols-outlined text-4xl text-primary">
                      favorite
                    </span>
                  </div>
                  <div
                    className="flex h-28 w-28 translate-y-md items-center justify-center bg-secondary-fixed shadow-lg md:h-32 md:w-32"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    <span className="material-symbols-outlined text-4xl text-on-secondary-fixed">
                      handshake
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
