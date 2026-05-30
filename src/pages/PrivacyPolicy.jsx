import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-on-surface-variant font-body-sm mb-xl">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="max-w-3xl space-y-lg">
          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">1. Introduction</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              Noor Youth Organization ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">2. Information We Collect</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed mb-md">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-sm text-on-surface-variant font-body-md">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and other information you voluntarily provide when registering or contacting us.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referral sources.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and IP address for analytics and security purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">3. How We Use Your Information</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed mb-md">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-sm text-on-surface-variant font-body-md">
              <li>To provide and maintain our services and programs.</li>
              <li>To communicate with you about events, updates, and opportunities.</li>
              <li>To improve our website and tailor content to your interests.</li>
              <li>To comply with legal obligations and protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">4. Data Protection</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">5. Third-Party Services</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              We may use third-party services for analytics, communication, or payment processing. These providers have their own privacy policies governing the use of your information. We encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">6. Your Rights</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed mb-md">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-sm text-on-surface-variant font-body-md">
              <li>The right to access, update, or delete your personal information.</li>
              <li>The right to withdraw consent at any time.</li>
              <li>The right to object to processing of your data.</li>
              <li>The right to data portability.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">7. Contact Us</h2>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@nooryouth.org
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
