interface ContactDetail {
  icon: string
  label: string
  lines: string[]
}

const contactDetails: ContactDetail[] = [
  {
    icon: 'location_on',
    label: 'Visit us',
    lines: ['Banex Plaza, 2nd Floor, Suite 5,', '123 Main Street, Abuja, Nigeria.'],
  },
  {
    icon: 'call',
    label: 'Call us',
    lines: ['09065750161', '08105185369', '09041520412'],
  },
  {
    icon: 'schedule',
    label: 'Office hours',
    lines: ['Monday – Friday', '9:00am – 5:00pm'],
  },
]

const emailContacts = [
  {
    label: 'Partnerships & sponsorship',
    email: 'partnerships@leadershipcourseabuja.org',
  },
  {
    label: 'General enquiries',
    email: 'info@leadershipcourseabuja.org',
  },
  {
    label: 'Legal',
    email: 'legal@leadershipcourseabuja.org',
  },
]

const enquiryOptions = ['Partnership', 'Sponsorship', 'General enquiry']

export default function Contact() {
  return (
    <main className="pt-18">
      <section className="relative overflow-hidden bg-primary px-gutter py-20">
        <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-container-max text-center">
          <span className="eyebrow mb-sm text-secondary-fixed">Get in touch</span>
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-on-primary md:text-display-lg">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-primary/70">
            Interested in partnering with or sponsoring LCA, or simply want to
            learn more? Send us a message and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="container-shell py-lg">
        <div className="grid items-start gap-xl lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-md">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="card flex items-start gap-sm p-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                  <span className="material-symbols-outlined">{detail.icon}</span>
                </div>
                <div>
                  <h2 className="mb-xs font-label-md text-label-md uppercase text-secondary">
                    {detail.label}
                  </h2>
                  {detail.lines.map((line) => (
                    <p
                      key={line}
                      className="font-body-sm text-body-sm text-on-surface-variant"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="card flex items-start gap-sm p-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="min-w-0">
                <h2 className="mb-xs font-label-md text-label-md uppercase text-secondary">
                  Email us
                </h2>
                <ul className="space-y-sm">
                  {emailContacts.map(({ label, email }) => (
                    <li key={email}>
                      <span className="block font-body-sm text-body-sm text-on-surface-variant">
                        {label}
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="break-all font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-primary hover:underline"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <form
            className="card p-md md:p-lg"
            onSubmit={(event) => event.preventDefault()}
          >
            <h2 className="mb-sm font-headline-md text-headline-md text-primary">
              Send us a message
            </h2>
            <p className="mb-lg font-body-md text-body-md text-on-surface-variant">
              Tell us a little about yourself and how you would like to work with
              us.
            </p>

            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
              <div>
                <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
                  Full name*
                </label>
                <input type="text" name="fullName" placeholder="Yusuf Bello" className="field" required />
              </div>

              <div>
                <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
                  Email*
                </label>
                <input type="email" name="email" placeholder="you@email.com" className="field" required />
              </div>

              <div>
                <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
                  Phone
                </label>
                <input type="tel" name="phone" placeholder="0803 000 0000" className="field" />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
                  How can we help?*
                </label>
                <select name="enquiry" className="field" defaultValue="" required>
                  <option value="" disabled>
                    Please choose
                  </option>
                  {enquiryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-sm block font-label-md text-label-md text-on-surface-variant">
                  Message*
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us how you would like to partner with or sponsor LCA."
                  className="field resize-none"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full py-3 sm:col-span-2">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
