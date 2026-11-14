import { Link, useParams } from 'react-router-dom'
import StallForm from '../components/StallForm'
import VolunteerForm from '../components/VolunteerForm'
import { getInvolvementItem } from '../lib/involvement'
import NotFound from './NotFound'

export default function InvolvementDetail({ slug: slugProp }: { slug?: string }) {
  const { slug: slugParam } = useParams()
  const slug = slugProp ?? slugParam
  const item = getInvolvementItem(slug)
  const detail = item?.detail

  if (!item || !detail) {
    return <NotFound />
  }

  return (
    <main className="pt-18">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-gutter py-20">
        <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-container-max">
          <div className="mb-md flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-fixed/15 ring-1 ring-secondary-fixed/30">
            <span className="material-symbols-outlined text-3xl text-secondary-fixed">
              {item.icon}
            </span>
          </div>
          <span className="eyebrow mb-sm text-secondary-fixed">Get Involved</span>
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-on-primary md:text-display-lg">
            {detail.title}
          </h1>
          <p className="max-w-2xl font-body-lg text-body-lg text-on-primary/70">
            {detail.description}
          </p>
        </div>
      </section>

      <section className="container-shell py-md">
        <div className="grid items-start gap-xl lg:grid-cols-[1.4fr_0.6fr]">
          {/* Detail content */}
          <div className="space-y-md">
            {item.slug === 'volunteer' && <VolunteerForm />}
            {item.slug === 'take-a-stall' && <StallForm />}
            {detail.sections?.map((section) => (
              <article key={section.title} className="card p-lg md:p-xl">
                <h2 className="mb-sm font-headline-sm text-headline-sm text-primary">
                  {section.title}
                </h2>
                <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {section.body}
                </p>
                {section.list && (
                  <ul className="mt-md space-y-sm">
                    {section.list.map((entry) => (
                      <li key={entry} className="flex items-start gap-sm">
                        <span className="material-symbols-outlined mt-0.5 text-[20px] text-secondary">
                          check_circle
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {entry}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          {/* Sidebar CTA */}
          <aside className="sticky top-24 space-y-md">
            {detail.steps ? (
              <>
                <div className="card p-md">
                  <span className="mb-sm block font-label-md text-label-md uppercase text-secondary">
                    How it works
                  </span>
                  <ol className="space-y-md">
                    {detail.steps.map((step, index) => (
                      <li key={step.title} className="flex items-start gap-sm">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-fixed font-button text-button text-primary">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-button text-button text-primary">
                            {step.title}
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                {item.slug === 'volunteer' && (
                  <blockquote className="card bg-primary p-lg text-on-primary">
                    <p className="font-body-md text-body-md italic text-on-primary/80">
                      “And cooperate in righteousness and piety, but do not
                      cooperate in sin and aggression.”
                    </p>
                    <cite className="mt-sm block font-label-md text-label-md not-italic text-secondary-fixed">
                      Qur’an 5:2
                    </cite>
                  </blockquote>
                )}
                {item.slug === 'take-a-stall' && (
                  <div className="card bg-primary p-lg text-on-primary">
                    <p className="font-body-md text-body-md text-on-primary/85">
                      We choose vendors whose work sits comfortably alongside
                      ours, and we try to keep a spread of categories rather than
                      ten of the same thing. Being turned down is not a judgement
                      on your business.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="card p-lg">
                <span className="mb-sm block font-label-md text-label-md uppercase text-secondary">
                  Next Step
                </span>
                <h2 className="mb-sm font-headline-sm text-headline-sm text-primary">
                  Ready to get started?
                </h2>
                <p className="mb-lg font-body-sm text-body-sm text-on-surface-variant">
                  Speak with our team about {item.title.toLowerCase()} and we will
                  help you find the right next step.
                </p>
                <div className="space-y-sm">
                  <a href="tel:09065750161" className="btn btn-primary w-full">
                    <span className="material-symbols-outlined">call</span>
                    Talk to the Team
                  </a>
                  <Link to="/donate" className="btn btn-outline w-full">
                    Support with a Donation
                  </Link>
                </div>
                <Link
                  to="/get-involved"
                  className="mt-md inline-flex items-center gap-xs font-button text-button text-on-surface-variant transition-colors hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>
                  Back to Get Involved
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}
