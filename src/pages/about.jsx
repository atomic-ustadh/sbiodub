const team = [
  {
    name: 'Ahmad Khan',
    role: 'Executive Director',
    desc: 'Visionary leader with 10+ years in youth development and community organizing.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUSeWtEUFlCGH9I9t-Kq7DmJUqiC6uTPKevKSTEF_dgrRXTDVkKMogB3Og_E7KMmITHf9OFNOeaJscO-y-uD_kLOfImjt76IEnbPCjTflRsft4T4IlKSXasJy1oKR9gpNju6B6nSaVIiQGe7Ut5yBnJ-N7ElIj0v-vQxaL4HtySI6hRS9FnjGBsXZqQ3gBQKyav3oUVUR6_qGLjTv5I2EERnEFaLk3ZF_Ik15YF0NYilbWeicZNsUGAgYnmUTCCrHJZFG8PvwcMl7l',
  },
  {
    name: 'Layla Hassan',
    role: 'Head of Education',
    desc: 'Educational strategist focused on curriculum development and mentorship programs.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBG-i2SJIRcbXflMsbgKRyRwsf4jxNVUjFihojkeiDZh92QVePPqH3ZN06DXIzLXeGesUDYlXOx_cX9m681pGhHo9ow_yKBg4EDB_jGBuw81PgRX9B3IkTJzBuTcTsMBSN5qI-8D9-yaN2Fy6BN2Y7AVHUA96iWeAeh1KcMP3aDn5o3MbmRueYzGv0FqEquy_oB0blijw-kgtql7a6L2gRaE6Gw7CpPEDiEO-HX4HRCcK3O0OTBjXYiTaiPBhSFf-wo-aypWCy87UR',
  },
  {
    name: 'Omar Zaid',
    role: 'Operations Manager',
    desc: 'Ensuring the smooth execution of global initiatives and logistical excellence.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiip831uhko3JSSQzWhuYtgcF5pakdaAJhy9pPBK_VKLex09EgO0LLcJjI8ePgpSM8_sKq-om6hTOZ2xEqhgv2AjNFR7IYFenln2j93BljF0wmqTmHdiCR5ZPTholNWF4lbHOvGpuHbGm7E_PHN0ptJ8DjgoCh_6Ryz6XCHGDUN1w4A3_NSL-L4dYbmRM3IQJ2mZEA1jI52W3-LaEweAB10XOI2AvU7XmOqb0E8Yw2bcouK4Lf_IUT_EoMPwk4txSEMuqoPbDKsxrp',
  },
  {
    name: 'Sara Mahmoud',
    role: 'Community Engagement',
    desc: 'Building bridges and fostering partnerships with local and international communities.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAktPXcrDU85ELEGqhOYWMJXWhLU0zz3utVZX8r1zY_aTD_Z-mHWPnELeNE-8FMNxla-s3fforQts1RVHAbr315pIYjo8Wx19zrCjYocs9g2kzu3hiUcc2rjzkhyVqowz1aPgOgRvR53PzmzYwjVmNuJGvs6VqlqvR0gMgXoyTC0xyIunc-B-sIbku-FVKzak-9JT0s0jdpErxjsCCNXZFS5Aa_kKYKZe4qmfUVnYKf-mvziHnPNFUNRkhQVZ_-9AbvIzMyGi3gzpp',
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
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Fm_J5UxEKsh-8YQ8PFYJ76rroVquGWAbocVig1NU0iOYkRnHc6txTtEx0t9fcLJfDWocEV3cZ5yB8SxTJCN-ZbtYv9I9UWzKNiCSkra2vKHlEKgIeGKt4RfkDNQzNYCffYOC-BjOLGnVHQ6GQPj2K3M3KG5275uyn6qM9zqtvAWmilabnh_FWzQy9f3Xgg1Bqu1vP7g-eR8hJ209yKLrJiklsf6dHRj7tu5RFD8EWRJSZZdp_tXE3uQNVcj9PAN1fqTRRGuRGNS5',
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe7YbXNf2juFPO93gBGS2JACQLbaEeVG0sA58zohoNdthmx0f_2DCynOM6aMnaVMtDJxkLJylSdaU3R_tDLIV68a5c-SI92ksDoNHDV2P4Wcz-yViBGs_L_PsPBiTbOMiuc88FKuHMc1y9EcC6UUj7Gx3Yhsc67Um_WYJA8df2vTzpIkO4eysexCQkkxRz1zL2mmT9a4N-etaB6TEH7galYXcCowbJKbuVRuKzmgCLKR1AWNAX2CLD69oNGCVeaNx52bHxb3XLyXqX"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-transparent" />
          <div className="absolute inset-0 geometric-pattern" />
        </div>
        <div className="relative z-10 w-full mx-auto max-w-container-max px-gutter">
          <div className="max-w-128">
            <h1 className="font-display-lg text-display-lg text-secondary-fixed mb-md">
              Standard Bearers Islamic Organization
            </h1>
            <p className="leading-relaxed font-body-lg text-body-lg text-on-primary/90 mb-lg">
              Standard Bearers Islamic Organization is more than an organization; it&rsquo;s a movement dedicated to nurturing the spiritual and
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbYg4mT67vyMn029RViU6c5I6xrB6NHx42rQ4PTl0bdk4rJzVqyPxs04cm0xAmOkBMg6iRm_AvUqBTX1r-jEePOI0b3R-zaQrjn97VJkppB2euJEhbtAVgDGJJ1Q2eARHeNQw4U4TDlwRcR1FHb2b-Itv7_VbKw_lUHMjr8wqQaNs_ActKP6NvwfVu_N5wcPcEw_tvm8ujw1wz00_Rpfmq9qRo9Jj94k6vj-va1Tm1eKQTpS2B6FSqLUCvXFHVJZhAmwhLyP4Lf_mG"
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
                Founded by a group of passionate educators and community leaders, Noor Youth began as a small weekend
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
            <h2 className="font-headline-md text-headline-md text-primary mb-sm">The Pillars of Noor</h2>
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
            <button className="flex items-center transition-colors gap-xs font-button text-button text-primary hover:text-secondary-fixed-dim">
              Join the Leadership
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
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
          <h2 className="font-headline-md text-headline-md text-secondary-fixed mb-md">Ready to join the movement?</h2>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg mb-lg opacity-90">
            Whether you&rsquo;re looking to learn, lead, or serve, there&rsquo;s a place for you in the Noor Youth
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
