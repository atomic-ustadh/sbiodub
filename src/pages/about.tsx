import { about_hero } from '../assets'
import { aboutPage, leadershipProfiles, type AboutPillarStyle } from '../lib/content'

const pillarStyles: Record<AboutPillarStyle, string> = {
  default: 'border-t-4 border-secondary',
  primary: 'border-t-4 border-primary',
  wide: 'md:col-span-2 border-l-4 border-primary',
  full: 'md:col-span-4 border-b-4 border-secondary-fixed',
}

const purposeCards = [
  { icon: 'flag', title: aboutPage.missionTitle, content: aboutPage.missionContent },
  { icon: 'visibility', title: aboutPage.visionTitle, content: aboutPage.visionContent },
]

export default function About() {
  return (
    <main className="pt-18">
      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-center py-24">
        <div className="absolute inset-0 z-0">
          <img
            className="h-full w-full object-cover brightness-[0.32]"
            alt="Youth community"
            src={about_hero}
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-primary/20" />
          <div className="absolute inset-0 geometric-pattern opacity-[0.08]" />
        </div>
        <div className="container-shell relative z-10">
          <div className="max-w-2xl">
            <h1 className="mb-md font-display-lg text-display-lg-mobile text-secondary-fixed md:text-display-lg">
              Leadership Course Abuja
            </h1>
            <p className="mb-lg font-body-lg text-body-lg leading-relaxed text-on-primary/75">
              Leadership Course Abuja is more than an organization; it&rsquo;s a movement dedicated to nurturing the spiritual and
              professional growth of young Muslims globally.
            </p>
            <div className="flex flex-wrap gap-sm">
              <a href="#story" className="btn btn-gold">
                Our Story
                <span className="material-symbols-outlined">arrow_downward</span>
              </a>
              <a
                href="#team"
                className="btn border border-white/25 px-lg py-3 text-on-primary hover:border-secondary-fixed/60 hover:bg-white/10"
              >
                Meet The Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-surface py-xl" id="story">
        <div className="container-shell grid grid-cols-1 items-center gap-xl md:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 border-l-4 border-t-4 border-secondary-fixed/70" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary-fixed/20 blur-2xl" />
            <div className="relative z-10 overflow-hidden rounded-3xl shadow-float">
              <img
                className="h-full w-full object-cover"
                alt="Our founding story"
                src={aboutPage.journeyImage}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 z-20 h-20 w-20 rounded-2xl border border-secondary-fixed/40 bg-primary/80 backdrop-blur-sm" />
          </div>
          <div>
            <span className="eyebrow mb-xs">{aboutPage.journeyEyebrow}</span>
            <h2 className="mb-md font-headline-md text-headline-md text-primary">{aboutPage.journeyTitle}</h2>
            <div className="divider-gold mb-md" />
            <div
              className="font-body-md text-body-md leading-relaxed text-on-surface-variant [&_a]:text-secondary [&_a]:underline [&_p]:leading-relaxed [&_p+p]:mt-md [&_strong]:text-primary [&_ul]:list-disc [&_ul]:space-y-sm [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: aboutPage.journeyContent }}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden bg-primary py-xl">
        <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
        <div className="absolute left-1/2 top-0 h-64 w-2/3 -translate-x-1/2 rounded-full bg-secondary/15 blur-3xl" />
        <div className="container-shell relative z-10">
          <div className="mb-xl text-center">
            <span className="eyebrow mb-xs text-secondary-fixed">{aboutPage.purposeEyebrow}</span>
            <h2 className="mb-sm font-headline-md text-headline-md text-on-primary">{aboutPage.purposeTitle}</h2>
            <p className="mx-auto max-w-144 font-body-md text-body-md text-on-primary/65">
              {aboutPage.purposeIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-md md:grid-cols-2 md:gap-lg">
            {purposeCards.map((card) => (
              <article
                key={card.title}
                className="glass-dark group relative overflow-hidden rounded-3xl p-lg transition-all duration-300 md:p-xl hover:border-secondary-fixed/40 hover:bg-white/10"
              >
                <span className="material-symbols-outlined absolute -right-3 -top-6 text-[7rem] leading-none text-white/5 transition-colors duration-300 group-hover:text-secondary-fixed/10">
                  {card.icon}
                </span>
                <div className="relative">
                  <div className="mb-md flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-fixed/15 text-secondary-fixed ring-1 ring-secondary-fixed/30">
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                  <h3 className="mb-sm font-headline-sm text-headline-sm text-secondary-fixed">{card.title}</h3>
                  <div
                    className="font-body-md text-body-md leading-relaxed text-on-primary/70 [&_a]:text-secondary-fixed [&_a]:underline [&_p+p]:mt-sm [&_strong]:text-on-primary"
                    dangerouslySetInnerHTML={{ __html: card.content }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative overflow-hidden bg-surface-container-low py-xl">
        <div className="absolute inset-0 geometric-pattern opacity-[0.05]" />
        <div className="container-shell relative z-10">
          <div className="mb-xl text-center">
            <h2 className="mb-sm font-headline-md text-headline-md text-primary">{aboutPage.pillarsTitle}</h2>
            <p className="mx-auto max-w-144 font-body-md text-body-md text-on-surface-variant">
              {aboutPage.pillarsIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-md md:grid-cols-4">
            {aboutPage.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`card card-hover p-lg ${pillarStyles[pillar.style]}`}
              >
                <div className={pillar.image ? 'flex h-full flex-col items-center gap-lg md:flex-row' : ''}>
                  <div className={pillar.image ? 'flex-1' : ''}>
                    <span className="material-symbols-outlined mb-md block text-4xl text-primary">{pillar.icon}</span>
                    <h3 className="mb-sm font-headline-sm text-headline-sm text-primary">{pillar.title}</h3>
                    <p className="font-body-sm text-on-surface-variant md:font-body-md">{pillar.description}</p>
                  </div>
                  {pillar.image && (
                    <div className="w-full md:w-1/3">
                      <img className="h-48 w-full rounded-xl object-cover" alt={pillar.title} src={pillar.image} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-surface py-xl" id="team">
        <div className="container-shell">
          <div className="mb-xl flex flex-col items-end justify-between gap-md md:flex-row">
            <div>
              <h2 className="mb-sm font-headline-md text-headline-md text-primary">Leadership Profiles</h2>
              <p className="max-w-128 font-body-md text-body-md text-on-surface-variant">
                Meet the dedicated individuals working behind the scenes to drive our mission forward.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
            {leadershipProfiles.map((member) => (
              <div key={member.slug} className="group">
                <div className="relative mb-sm overflow-hidden rounded-2xl">
                  <img
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={member.name}
                    src={member.image}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">{member.name}</h4>
                <p className="mb-xs font-label-md text-label-md uppercase text-secondary">{member.role}</p>
                <p className="font-body-sm text-on-surface-variant">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
