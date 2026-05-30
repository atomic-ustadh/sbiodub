import { useState } from 'react'

// Testimonials data — displayed in the "Impact Stories" carousel section
const testimonials = [
  {
    quote: 'Noor Youth provided me with more than just a place to hang out; it gave me a purpose. I found mentors who looked like me and friends who shared my values. It has completely transformed my outlook on my role in society.',
    name: 'Sara Al-Farsi',
    title: 'Member since 2021',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVGjjnZZd6Oc0JXrtfMw2JfDbK-_ELOAiz211YSjCJpdz9ZivkWYp5lmDCtX8R2jtR7c3kvigwOKwfrMDR_YH0yXWqWMtka8J10yQZXr26nsCNk-2Qo2X6iU354Vx1eM2g_5-28iso1DHIOi9ol3gT_OWR2aU_XAc7uHcliW3tUI06J3EDVztbsDcP7nNXsr4zqedswLCRGReauNI0OyuIH8E44Lr7FVCUo_Up8FIRwM5TwAZuD7HdCCmthZDkEg29BpCguUyU6fBW',
  },
  {
    quote: 'Before joining, I felt disconnected from my faith and my community. Noor Youth gave me a brotherhood that pushed me to grow spiritually and professionally. I went from being shy to leading our monthly community service projects.',
    name: 'Ahmed Hassan',
    title: 'Member since 2020',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVGjjnZZd6Oc0JXrtfMw2JfDbK-_ELOAiz211YSjCJpdz9ZivkWYp5lmDCtX8R2jtR7c3kvigwOKwfrMDR_YH0yXWqWMtka8J10yQZXr26nsCNk-2Qo2X6iU354Vx1eM2g_5-28iso1DHIOi9ol3gT_OWR2aU_XAc7uHcliW3tUI06J3EDVztbsDcP7nNXsr4zqedswLCRGReauNI0OyuIH8E44Lr7FVCUo_Up8FIRwM5TwAZuD7HdCCmthZDkEg29BpCguUyU6fBW',
  },
  {
    quote: 'The workshops and mentorship programs here are unmatched. I secured my first internship using skills I learned from a Noor Youth professional development session. This community genuinely invests in your future.',
    name: 'Layla Rahman',
    title: 'Member since 2022',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVGjjnZZd6Oc0JXrtfMw2JfDbK-_ELOAiz211YSjCJpdz9ZivkWYp5lmDCtX8R2jtR7c3kvigwOKwfrMDR_YH0yXWqWMtka8J10yQZXr26nsCNk-2Qo2X6iU354Vx1eM2g_5-28iso1DHIOi9ol3gT_OWR2aU_XAc7uHcliW3tUI06J3EDVztbsDcP7nNXsr4zqedswLCRGReauNI0OyuIH8E44Lr7FVCUo_Up8FIRwM5TwAZuD7HdCCmthZDkEg29BpCguUyU6fBW',
  },
  {
    quote: 'What I love most about Noor Youth is that it is a judgment-free zone where you can ask hard questions about faith, life, and purpose. The leaders are approachable, and the community genuinely cares about each member.',
    name: 'Yusuf Patel',
    title: 'Member since 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVGjjnZZd6Oc0JXrtfMw2JfDbK-_ELOAiz211YSjCJpdz9ZivkWYp5lmDCtX8R2jtR7c3kvigwOKwfrMDR_YH0yXWqWMtka8J10yQZXr26nsCNk-2Qo2X6iU354Vx1eM2g_5-28iso1DHIOi9ol3gT_OWR2aU_XAc7uHcliW3tUI06J3EDVztbsDcP7nNXsr4zqedswLCRGReauNI0OyuIH8E44Lr7FVCUo_Up8FIRwM5TwAZuD7HdCCmthZDkEg29BpCguUyU6fBW',
  },
]

export default function Platform() {
  // Track which testimonial is currently shown in the carousel
  const [current, setCurrent] = useState(0)
  const t = testimonials[current]

  return (
    <main className="pt-18">
      {/* ===== Hero Section ===== */}
      <section className="relative min-h-150 flex items-center overflow-hidden">
        {/* Background with animated pattern overlay */}
        <div className="absolute inset-0 z-0 bg-primary overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-conic-gradient(#ffe088 0% 25%, transparent 0% 50%)",
              backgroundSize: "80px 80px",
              animation: "pulse 10s infinite linear",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary/60 to-primary" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter grid lg:grid-cols-2 gap-xl items-center">
          {/* Hero text */}
          <div className="text-left space-y-md">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary">
              Empowering the{" "}
              <span className="text-secondary-fixed">Next Generation</span> of
              Muslim Leaders
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-144">
              Building a vibrant community rooted in faith, service, and
              excellence. We provide the tools and support for young Muslims to
              thrive and lead in a modern world.
            </p>
            <div className="flex flex-wrap gap-md pt-base">
              <button className="bg-secondary-container text-on-secondary-container font-button text-button px-lg py-md rounded-lg shadow-lg hover:translate-y-0.5 transition-all">
                Join the Movement
              </button>
              <button className="border border-primary-fixed text-on-primary-container font-button text-button px-lg py-md rounded-lg shadow-lg hover:translate-y-0.5 transition-all">
                About SBIO
              </button>
            </div>
          </div>
          {/* Hero image with stat badge */}
          <div className="hidden lg:block relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-700">
              <img
                className="w-full h-full object-cover"
                alt="A diverse group of energetic young adults collaborating"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW1wZVJsltSdAHvUqqMXsfag_jEwiLzM4se6Nhzh8hEP7WkUy7HRWb1sxXp8yAXs3BEV9bayxyDW2xd2fN8P6mkp_d6dB8KZrTuiKLIxUU28DsCMkGslCc3OFjltqhR571QiuL6eYNtrdkucPvokkOB7erByTGWbpU4lbYI-8D12rVpvr7KS6qOzzKSbcSihqnm0nwkLbgCaxztITnJVkB1scKRt1dWw4DDCa5J72DkxnN4r_UHxtMH2luQt9xQBPXTEfnp2pFlMJp"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-md -left-md bg-secondary-fixed p-md rounded-xl shadow-xl">
              <div className="flex items-center gap-sm">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
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
      <section className="py-lg pattern-bg">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-md">
            <h2 className="font-headline-md text-headline-md text-primary">
              Our Core Pillars
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-base" />
          </div>
          {/* Map over pillars array to render 3 cards */}
          <div className="grid md:grid-cols-3 gap-md">
            {[
              {
                icon: "groups",
                title: "Community",
                desc: "Fostering lifelong bonds through brotherhood and sisterhood in a safe, inclusive environment.",
              },
              {
                icon: "temple_hindu",
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
                  className="backdrop-blur-xl bg-white/80 border border-slate-100/50 p-md rounded-xl text-center group hover:border-primary transition-all duration-500"
                >
                  <div
                    className={`w-20 h-20 ${bg} rounded-full flex items-center justify-center mx-auto mb-md group-hover:scale-110 transition-transform`}
                  >
                    <span
                      className={`material-symbols-outlined ${iconColor} text-4xl`}
                    >
                      {icon}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
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
      <section className="py-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter">
          {/* Section header with "View All" link */}
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary">
                Upcoming Events
              </h2>
              <p className="text-on-surface-variant mt-xs">
                Don&rsquo;t miss out on our latest gatherings.
              </p>
            </div>
            <span className="text-primary font-bold hover:underline flex items-center gap-xs cursor-pointer">
              View All{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </span>
          </div>
          {/* Map over events array to render 3 event cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
            {[
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZg8D9d2eomHs4DeCSjHbhkU4W3iRz-FjEdJ37AK7zWLmRO-toJV4JzJB_btVSHRD3wr65Tl7mb-huHyZU1n-paFlDqjJ-TA7RD8cryJt-aL6Nt0NQT6z7cqQ4rIwOkyA3shvv2_DVG6GYZhFtoSYyhOVnv8B1EF-HbG9vAiU7RL_P2xqo25jUJQ2pvmWfzoJdqqHALuus6Wjd9ZOjON2uPTkbQfdQpZ0I2hcMaff5Yh-LyFYkUb-I2lcy0Udnsq7FkkBUFiSbuXkb",
                tag: "Education",
                date: "Sat, Oct 12 \u2022 6:00 PM",
                title: "Youth Leadership Workshop",
                desc: "Develop practical leadership skills rooted in Islamic ethics and modern management principles.",
              },
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzHdsd0cbuAeHZJLm3ngRRkYh2ISr2o6QmidaMZ6n10fRMDomHUd7LmlVq4Bv9XGYPOt6MAsZAldzdSuJxB_nFmxjtlmoIGtVmtSv2ujcbg5JmC5cI5pwGtUDwB0jYSjQoKDpjH3JGWpIKJDYEtT950WaFsWtTOVoVFiXT72mMcTQSg3HeNg_bBXH2uLI0K41EBjGFC4VCzDBWTZT-l0YF_8dQVKFFLwcQuS31Kq6d9WE-BMnkwkVodLEKPG7zBNF5tSBqfUVDB0YG",
                tag: "Social",
                date: "Fri, Oct 18 \u2022 7:30 PM",
                title: "Community BBQ & Games",
                desc: "A casual evening of food, fun, and networking with fellow youth in the local park.",
              },
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJQL1CtdYO_MLvj-BZp16IiY2HjPufmRDB-L-vIplr4yklOEokcS6gciNYeX_PNJ2PLgz6xg_LNervVd-lgTeE6FZSEUO7RO2fx4gSbbsCrBm_rIN8sS4eyI_V1yT_k5piFczzFiYHGBL3n0pE15R3VRn73-bUThJx59jXmBQi9km-u53RTrJCNXpu5GhNMhu0tZ3hkQpCriOXW0n9phYAWLyqsefNSHMvc0iNzy-CE2w6BPxHYOHMJY6zrfYeNnZRF7LbsleQoU61",
                tag: "Spirituality",
                date: "Sun, Oct 20 \u2022 10:00 AM",
                title: "Tafsir for Today's World",
                desc: "Exploring Quranic insights and their relevance to the challenges of the 21st century.",
              },
            ].map(({ img, tag, date, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group"
              >
                {/* Event card image with tag overlay */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={title}
                    src={img}
                  />
                  <div className="absolute top-md left-md bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-md text-label-md">
                    {tag}
                  </div>
                </div>
                {/* Event card details */}
                <div className="p-md space-y-sm">
                  <div className="flex items-center text-secondary text-sm gap-xs">
                    <span className="material-symbols-outlined text-sm">
                      calendar_today
                    </span>
                    <span>{date}</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary">
                    {title}
                  </h4>
                  <p className="font-body-sm text-sm text-on-surface-variant line-clamp-2">
                    {desc}
                  </p>
                  <button className="w-full mt-md py-sm border-2 border-primary text-primary font-button rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Impact Stories (Testimonials Carousel) Section ===== */}
      <section className="py-xl bg-white relative overflow-hidden">
        {/* Decorative blurred background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-fixed/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <div className="text-center mb-xl">
            <h2 className="font-headline-md text-headline-md text-primary">
              Voices of Our Youth
            </h2>
            <p className="text-on-surface-variant">
              Real stories from the heart of our community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-lg items-center">
            {/* Testimonial author image */}
            <div className="relative">
              <div className="aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt={t.name}
                  src={t.image}
                />
              </div>
            </div>
            {/* Testimonial quote + navigation controls */}
            <div className="space-y-sm">
              <span className="material-symbols-outlined text-secondary-fixed text-6xl opacity-50">
                format_quote
              </span>
              <blockquote
                key={current}
                className="font-headline-sm text-headline-xs md:text-headline-sm text-primary italic leading-relaxed animate-[fadeIn_0.3s_ease-in-out]"
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-bold text-primary">{t.name}</p>
                <p className="text-on-surface-variant">{t.title}</p>
              </div>
              {/* Prev / Next buttons */}
              <div className="flex gap-base items-center">
                <button
                  onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="font-body-sm text-on-surface-variant">
                  {current + 1} / {testimonials.length}
                </span>
                <button
                  onClick={() => setCurrent((current + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Get Involved (CTA) Section ===== */}
      <section className="py-xl">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="bg-primary-container rounded-4xl p-lg md:p-xl flex flex-col md:flex-row items-center gap-xl relative overflow-hidden">
            <div className="relative z-10 md:w-3/5 text-left space-y-md">
              <h2 className="font-display-lg text-on-primary">
                Make an Impact Today
              </h2>
              <p className="font-body-lg text-on-primary-container">
                Whether you have time to volunteer or wish to support our
                mission through a donation, your contribution helps us grow the
                next generation of leaders.
              </p>
              <div className="flex flex-wrap gap-md pt-base">
                <button className="bg-secondary-fixed text-on-secondary-fixed font-button text-button px-lg py-md rounded-xl hover:scale-105 transition-transform shadow-lg">
                  Become a Volunteer
                </button>
                <button className="bg-surface/10 text-on-primary font-button text-button px-lg py-md rounded-xl backdrop-blur-md border border-white/20 hover:bg-surface/20 transition-all">
                  Make a Donation
                </button>
              </div>
            </div>
            {/* Decorative hexagon icons */}
            <div className="md:w-2/5 flex justify-center items-center">
              <div className="grid grid-cols-2 gap-sm">
                <div
                  className="w-32 h-32 bg-primary-fixed rounded-2xl shadow-lg flex items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <span className="material-symbols-outlined text-primary text-4xl">
                    favorite
                  </span>
                </div>
                <div
                  className="w-32 h-32 bg-secondary-fixed-dim rounded-2xl shadow-lg flex items-center justify-center translate-y-md"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <span className="material-symbols-outlined text-on-secondary-fixed text-4xl">
                    handshake
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
