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
      <section className="relative flex items-center min-h-130 pt-lg pb-lg">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Youth community"
            src={about_hero}
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-transparent" />
          <div className="absolute inset-0 geometric-pattern" />
        </div>
        <div className="relative z-10 w-full mx-auto max-w-container-max px-gutter">
          <div className="max-w-128">
            <h1 className="font-display-lg text-display-lg text-secondary-fixed mb-md">
              Leadership Course Abuja
            </h1>
            <p className="leading-relaxed font-body-lg text-body-lg text-on-primary/90 mb-lg">
              Leadership Course Abuja is more than an organization; it&rsquo;s a movement dedicated to nurturing the spiritual and
              professional growth of young Muslims globally.
            </p>
            <div className="flex flex-wrap gap-md">
              <a
                href="#story"
                className="flex items-center transition-all rounded-lg bg-secondary text-on-secondary px-lg py-sm font-button text-button hover:bg-secondary-container gap-xs"
              >
                Our Story
                <span className="material-symbols-outlined">arrow_downward</span>
              </a>
              <a
                href="#team"
                className="transition-all border-2 rounded-lg border-on-primary text-on-primary px-lg py-sm font-button text-button hover:bg-on-primary hover:text-primary"
              >
                Meet The Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-xl bg-surface" id="story">
        <div className="grid items-center grid-cols-1 mx-auto max-w-container-max px-gutter md:grid-cols-2 gap-xl">
          <div className="relative">
            <div className="absolute w-24 h-24 border-t-4 border-l-4 opacity-50 -top-4 -left-4 border-secondary-fixed" />
            <img
              className="relative z-10 shadow-lg rounded-xl"
              alt="Our founding story"
              src={aboutPage.journeyImage}
            />
            <div className="absolute w-32 h-32 rounded-full -bottom-4 -right-4 bg-secondary-fixed/20 -z-10 blur-2xl" />
          </div>
          <div>
            <span className="block tracking-widest uppercase font-label-md text-label-md text-secondary mb-xs">
              {aboutPage.journeyEyebrow}
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mb-md">{aboutPage.journeyTitle}</h2>
            <div
              className="leading-relaxed text-on-surface-variant font-body-md text-body-md [&_a]:text-secondary [&_a]:underline [&_p]:leading-relaxed [&_p+p]:mt-md [&_strong]:text-primary [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-sm"
              dangerouslySetInnerHTML={{ __html: aboutPage.journeyContent }}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-xl overflow-hidden bg-primary">
        <div className="absolute inset-0 geometric-pattern opacity-[0.06]" />
        <div className="absolute w-2/3 h-64 -translate-x-1/2 rounded-full top-0 left-1/2 bg-secondary-fixed/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-container-max px-gutter">
          <div className="text-center mb-xl">
            <span className="block tracking-widest uppercase font-label-md text-label-md text-secondary-fixed mb-xs">
              {aboutPage.purposeEyebrow}
            </span>
            <h2 className="font-headline-md text-headline-md text-on-primary mb-sm">{aboutPage.purposeTitle}</h2>
            <p className="mx-auto font-body-md text-body-md text-on-primary/70 max-w-144">
              {aboutPage.purposeIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-md md:grid-cols-2 md:gap-lg">
            {purposeCards.map((card) => (
              <article
                key={card.title}
                className="relative p-lg overflow-hidden transition-all duration-300 border group rounded-xl border-white/10 bg-white/5 backdrop-blur-xl md:p-xl hover:border-secondary-fixed/40 hover:bg-white/10"
              >
                <span className="absolute -top-6 -right-3 text-[7rem] leading-none material-symbols-outlined text-white/5 transition-colors duration-300 group-hover:text-secondary-fixed/10">
                  {card.icon}
                </span>
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 mb-md rounded-full bg-secondary-fixed/15 text-secondary-fixed ring-1 ring-secondary-fixed/30">
                    <span className="text-2xl material-symbols-outlined">{card.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-secondary-fixed mb-sm">{card.title}</h3>
                  <div
                    className="leading-relaxed text-on-primary/75 font-body-md text-body-md [&_a]:text-secondary-fixed [&_a]:underline [&_p+p]:mt-sm [&_strong]:text-on-primary"
                    dangerouslySetInnerHTML={{ __html: card.content }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative overflow-hidden py-xl bg-surface-container-low">
        <div className="absolute inset-0 geometric-pattern" />
        <div className="relative z-10 mx-auto max-w-container-max px-gutter">
          <div className="text-center mb-xl">
            <h2 className="font-headline-md text-headline-md text-primary mb-sm">{aboutPage.pillarsTitle}</h2>
            <p className="mx-auto font-body-md text-body-md text-on-surface-variant max-w-144">
              {aboutPage.pillarsIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
            {aboutPage.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`backdrop-blur-xl bg-white/80 border border-slate-100/50 p-lg rounded-xl hover:shadow-xl transition-all duration-300 ${pillarStyles[pillar.style]}`}
              >
                <div className={pillar.image ? 'flex flex-col md:flex-row items-center gap-lg h-full' : ''}>
                  <div className={pillar.image ? 'flex-1' : ''}>
                    <span className="block text-4xl material-symbols-outlined text-primary mb-md">{pillar.icon}</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">{pillar.title}</h3>
                    <p className="text-on-surface-variant font-body-sm md:font-body-md">{pillar.description}</p>
                  </div>
                  {pillar.image && (
                    <div className="w-full md:w-1/3">
                      <img className="object-cover w-full h-48 rounded-lg" alt={pillar.title} src={pillar.image} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-xl bg-surface" id="team">
        <div className="mx-auto max-w-container-max px-gutter">
          <div className="flex flex-col items-end justify-between md:flex-row mb-xl gap-md">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-sm">Leadership Profiles</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-128">
                Meet the dedicated individuals working behind the scenes to drive our mission forward.
              </p>
            </div>
            {/*<button className="flex items-center transition-colors gap-xs font-button text-button text-primary hover:text-secondary-fixed-dim">
              Join the Leadership
              <span className="material-symbols-outlined">chevron_right</span>
            </button> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
            {leadershipProfiles.map((member) => (
              <div key={member.slug} className="group">
                <div className="relative overflow-hidden rounded-lg mb-sm">
                  <img
                    className="object-cover w-full transition-transform duration-500 aspect-square group-hover:scale-110"
                    alt={member.name}
                    src={member.image}
                  />
                  <div className="absolute inset-0 transition-opacity opacity-0 bg-primary/20 group-hover:opacity-100" />
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">{member.name}</h4>
                <p className="uppercase text-secondary font-label-md text-label-md mb-xs">{member.role}</p>
                <p className="text-on-surface-variant font-body-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
