import { abu_hanifah, barr_sakeenah, arahman_arahim, umm_aadil, about_hero, about_integrity, about_journey } from '../assets'

const team = [
  {
    name: 'Abu Hanifah',
    role: 'Executive Director',
    desc: 'Visionary leader with 10+ years in youth development and community organizing.',
    img: abu_hanifah,
  },
  {
    name: 'Barr. Sakeenah',
    role: 'Head of Activities & Programs',
    desc: 'Educational strategist focused on curriculum development and mentorship programs.',
    img: barr_sakeenah,
  },
  {
    name: 'Abdurrahman Abdurraheem',
    role: 'Community Manager',
    desc: 'Ensuring the smooth execution of global initiatives and logistical excellence.',
    img: arahman_arahim,
  },
  {
    name: 'Ummu Aadil',
    role: 'Welfare and Wellness Coordinator',
    desc: 'Building bridges and fostering partnerships with local and international communities.',
    img: umm_aadil,
  },
]

const values = [
  {
    icon: 'temple_hindu',
    title: 'Faith',
    desc: 'Centering the Quran and Sunnah in everything we do, providing a spiritual compass for the modern world.',
    className: 'md:col-span-2 border-l-4 border-primary',
  },
  {
    icon: 'groups',
    title: 'Community',
    desc: 'Building a supportive ecosystem where every individual feels a profound sense of belonging.',
    className: 'border-t-4 border-secondary',
  },
  {
    icon: 'stars',
    title: 'Excellence',
    desc: 'Striving for Ihsan in our work, our studies, and our service to humanity.',
    className: 'border-t-4 border-primary',
  },
  {
    icon: 'verified_user',
    title: 'Integrity',
    desc: 'Upholding the highest moral and ethical standards in all interactions, fostering trust and transparency within our organization.',
    className: 'md:col-span-4 border-b-4 border-secondary-fixed',
    img: about_integrity,
  },
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
              src={about_journey}
            />
            <div className="absolute w-32 h-32 rounded-full -bottom-4 -right-4 bg-secondary-fixed/20 -z-10 blur-2xl" />
          </div>
          <div>
            <span className="block tracking-widest uppercase font-label-md text-label-md text-secondary mb-xs">
              Since 2012
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mb-md">Our Journey &amp; Vision</h2>
            <div className="leading-relaxed space-y-md text-on-surface-variant font-body-md text-body-md">
              <p>
                Founded by a group of passionate educators and community leaders, LCA began as a small weekend
                workshop in a local community center. Our goal was simple: to create a space where young Muslims could
                explore their identity without compromise.
              </p>
              <p>
                Today, we have grown into a nationwide organization, providing mentorship, educational resources, and
                community service opportunities to thousands. Our vision is to cultivate a generation that is spiritually
                grounded, intellectually curious, and socially responsible.
              </p>
              <p>
                We believe that when youth are equipped with the right tools&mdash;rooted in Islamic values and modern
                expertise&mdash;they become the architects of a better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative overflow-hidden py-xl bg-surface-container-low">
        <div className="absolute inset-0 geometric-pattern" />
        <div className="relative z-10 mx-auto max-w-container-max px-gutter">
          <div className="text-center mb-xl">
            <h2 className="font-headline-md text-headline-md text-primary mb-sm">The Pillars of LCA</h2>
            <p className="mx-auto font-body-md text-body-md text-on-surface-variant max-w-144">
              Our actions are guided by a core set of principles that define our culture and commitment to our members.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
            {values.map((v) => (
              <div
                key={v.title}
                className={`backdrop-blur-xl bg-white/80 border border-slate-100/50 p-lg rounded-xl hover:shadow-xl transition-all duration-300 ${v.className}`}
              >
                <div className={v.img ? 'flex flex-col md:flex-row items-center gap-lg h-full' : ''}>
                  <div className={v.img ? 'flex-1' : ''}>
                    <span className="block text-4xl material-symbols-outlined text-primary mb-md">{v.icon}</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">{v.title}</h3>
                    <p className="text-on-surface-variant font-body-sm md:font-body-md">{v.desc}</p>
                  </div>
                  {v.img && (
                    <div className="w-full md:w-1/3">
                      <img className="object-cover w-full h-48 rounded-lg" alt={v.title} src={v.img} />
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
            {team.map((m) => (
              <div key={m.name} className="group">
                <div className="relative overflow-hidden rounded-lg mb-sm">
                  <img
                    className="object-cover w-full transition-transform duration-500 aspect-square group-hover:scale-110"
                    alt={m.name}
                    src={m.img}
                  />
                  <div className="absolute inset-0 transition-opacity opacity-0 bg-primary/20 group-hover:opacity-100" />
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">{m.name}</h4>
                <p className="uppercase text-secondary font-label-md text-label-md mb-xs">{m.role}</p>
                <p className="text-on-surface-variant font-body-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-xl bg-primary text-on-primary">
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        <div className="relative z-10 mx-auto text-center max-w-container-max px-gutter">
          <h2 className="font-headline-md text-headline-md text-secondary-fixed mb-md">Ready to join the LCA?</h2>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg mb-lg opacity-90">
            Whether you&rsquo;re looking to learn, lead, or serve, there&rsquo;s a place for you in the LCA 
            family. Together, we can light the way for the next generation.
          </p>
          <div className="flex flex-col items-center justify-center sm:flex-row gap-md">
            <button className="w-full transition-all scale-95 rounded-lg sm:w-auto bg-secondary text-on-secondary px-xl py-sm font-button text-button hover:bg-secondary-container active:scale-90">
              Join Us Now
            </button>
            <button className="w-full transition-all scale-95 border-2 rounded-lg sm:w-auto border-on-primary px-xl py-sm font-button text-button hover:bg-on-primary hover:text-primary active:scale-90">
              Volunteer with Us
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
