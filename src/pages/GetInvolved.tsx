import { Link } from 'react-router-dom'
import { involvementIntro, involvementItems } from '../lib/involvement'

export default function GetInvolved() {
  return (
    <main className="pt-18">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-gutter py-20">
        <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-container-max text-center">
          <span className="eyebrow mb-sm text-secondary-fixed">
            {involvementIntro.eyebrow}
          </span>
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-on-primary md:text-display-lg">
            {involvementIntro.title}
          </h1>
          <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-primary/70">
            {involvementIntro.description}
          </p>
        </div>
      </section>

      {/* Ways to get involved */}
      <section className="container-shell py-xl">
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          {involvementItems.map((item) =>
            item.slug === 'give' ? (
              <article
                key={item.slug}
                className="relative overflow-hidden rounded-3xl bg-primary p-lg text-on-primary shadow-float md:col-span-2 md:p-xl"
              >
                <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
                <div className="absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
                <div className="relative z-10 flex flex-col gap-lg md:flex-row md:items-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary-fixed/15 ring-1 ring-secondary-fixed/30">
                    <span className="material-symbols-outlined text-3xl text-secondary-fixed">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-sm font-headline-md text-headline-md text-secondary-fixed">
                      {item.title}
                    </h2>
                    <p className="max-w-2xl font-body-md text-body-md text-on-primary/70">
                      {item.summary}
                    </p>
                  </div>
                  <Link to={item.ctaTo} className="btn btn-gold shrink-0">
                    {item.ctaLabel}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </article>
            ) : (
              <article
                key={item.slug}
                className="card card-hover group flex flex-col p-lg"
              >
                <div className="mb-md flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-fixed text-primary transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-2xl">
                    {item.icon}
                  </span>
                </div>
                <h2 className="mb-sm font-headline-sm text-headline-sm text-primary">
                  {item.title}
                </h2>
                <p className="mb-lg font-body-md text-body-md text-on-surface-variant">
                  {item.summary}
                </p>
                <Link to={item.ctaTo} className="btn btn-outline mt-auto w-full py-2.5">
                  {item.ctaLabel}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </article>
            ),
          )}
        </div>
      </section>
    </main>
  )
}
