import data from '../content/contact.json'

interface ContactDetail {
  icon: string
  label: string
  lines: string[]
}

interface EmailContact {
  label: string
  email: string
}

interface ContactContent {
  hero: {
    eyebrow: string
    title: string
    description: string
  }
  contactDetails: ContactDetail[]
  emailHeading: string
  emailContacts: EmailContact[]
  form: {
    title: string
    description: string
    enquiryOptions: string[]
    messagePlaceholder: string
    submitLabel: string
  }
}

const contact = data as ContactContent
const { hero, contactDetails, emailHeading, emailContacts, form } = contact

export default function Contact() {
  return (
    <main className="pt-18">
      <section className="relative overflow-hidden bg-primary px-gutter py-20">
        <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-container-max text-center">
          <span className="eyebrow mb-sm text-secondary-fixed">{hero.eyebrow}</span>
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-on-primary md:text-display-lg">
            {hero.title}
          </h1>
          <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-primary/70">
            {hero.description}
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
                  {emailHeading}
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
              {form.title}
            </h2>
            <p className="mb-lg font-body-md text-body-md text-on-surface-variant">
              {form.description}
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
                  {form.enquiryOptions.map((option) => (
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
                  placeholder={form.messagePlaceholder}
                  className="field resize-none"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full py-3 sm:col-span-2">
                {form.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
