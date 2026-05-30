import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <main className="pt-24 pb-xl">
      <section className="max-w-container-max mx-auto px-gutter">
        <Link
          to="/"
          className="inline-flex items-center gap-sm text-primary font-button hover:underline mb-lg"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </Link>

        <h1 className="font-display-lg text-display-lg text-primary mb-lg">
          Terms of Service
        </h1>
        <p className="text-on-surface-variant font-body-sm mb-xl">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="max-w-3xl space-y-lg">
          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">1. Acceptance of Terms</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              By accessing or using the Noor Youth Organization website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">2. Eligibility</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              You must be at least 13 years of age to use our services. If you are under 18, you must have parental or guardian consent. By using our services, you represent that you meet these eligibility requirements.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">3. User Conduct</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed mb-md">
              As a user of our platform, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-sm text-on-surface-variant font-body-md">
              <li>Provide accurate and truthful information when registering or participating in our programs.</li>
              <li>Use our services in a manner consistent with Islamic values and community standards.</li>
              <li>Refrain from posting or sharing harmful, abusive, or inappropriate content.</li>
              <li>Respect the privacy and rights of other community members.</li>
              <li>Not engage in any activity that disrupts or interferes with our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">4. Intellectual Property</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              All content on this website, including text, graphics, logos, images, and resources, is the property of Noor Youth Organization unless otherwise stated. You may not reproduce, distribute, or create derivative works without our explicit permission.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">5. Event Participation</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              By registering for our events, you agree to abide by our event guidelines and code of conduct. Noor Youth Organization reserves the right to refuse entry or remove participants who violate these guidelines without refund.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">6. Limitation of Liability</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              Noor Youth Organization shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or participation in our programs. Our total liability shall not exceed the amount you have paid to us, if any, in the past twelve months.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">7. Changes to Terms</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the new terms. We will make reasonable efforts to notify you of significant changes.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">8. Contact</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@nooryouth.org
              <br />
              Phone: 09065750161
              <br />
              Address: Banex Plaza, 2nd Floor, Suite 5, 123 Main Street, Abuja, Nigeria.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
