import { useState } from "react";
import { donationConfig } from "../config/donation";

const allocations = [
  { key: "general", label: "General Fund", desc: "Where most needed" },
  { key: "youth", label: "Youth Programs", desc: "Workshops & mentorship" },
  { key: "events", label: "Community Events", desc: "Gatherings & outreach" },
  { key: "outreach", label: "Outreach", desc: "Dawah & charity drives" },
];

const faqs = [
  {
    q: "How do I make a donation?",
    a: "Transfer the amount to the bank account shown on this page, then send your bank transfer receipt to us on WhatsApp so we can verify it.",
  },
  {
    q: "Do you collect card details?",
    a: "No. We are currently using bank transfers only. Do not send card numbers, expiry dates, CVV codes, PINs, or banking passwords to anyone.",
  },
  {
    q: "How do I get a donation receipt?",
    a: "Send the transfer receipt from your bank app on WhatsApp. After we confirm the credit, we will acknowledge your donation. Contact us if you need a formal acknowledgement.",
  },
  {
    q: "Can I donate monthly?",
    a: "Yes. You can set up a standing order with your bank, or contact us on WhatsApp and we can advise on recurring giving. Recurring payments are not automated on this website.",
  },
  {
    q: "Where does my donation go?",
    a: "Donations support our General Fund, Youth Programs, Community Events, and Outreach work. Contact us on WhatsApp if you want to direct your gift to a specific area.",
  },
];

export default function Donate() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [transferReference, setTransferReference] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copyDetail = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const whatsappNumber = donationConfig.whatsappNumber.replace(/\D/g, "");
  const whatsappReady =
    !donationConfig.whatsappNumber.startsWith("REPLACE_WITH_") &&
    whatsappNumber.length > 0;
  const whatsappMessage = [
    "Hello LCA Abuja, I have made a donation.",
    `Name: ${donorName || "Not provided"}`,
    `Email: ${donorEmail || "Not provided"}`,
    `Phone: ${donorPhone || "Not provided"}`,
    `Bank reference: ${transferReference || "Not provided"}`,
    "Please find my transfer receipt attached.",
  ].join("\n");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const accountDetails = [
    { label: "Bank", value: donationConfig.bankName },
    { label: "Account name", value: donationConfig.accountName },
    { label: "Account number", value: donationConfig.accountNumber },
  ];

  return (
    <main className="pt-18 pb-xl">
      <section className="relative overflow-hidden bg-primary py-xl mb-xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-conic-gradient(#ffe088 0% 25%, transparent 0% 50%)",
            backgroundSize: "80px 80px",
            opacity: 0.05,
          }}
        />
        <div className="relative z-10 mx-auto text-center max-w-container-max px-gutter">
          <h1 className="font-display-lg text-display-lg text-secondary-fixed-dim mb-md">
            Make a Donation
          </h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-primary-container">
            Your contributions help us empower the next generation of Muslim
            leaders through faith, service, and excellence.
          </p>
        </div>
      </section>

      <div className="grid mx-auto max-w-container-max px-gutter lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 space-y-lg">
          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-md">
              Bank Transfer Details
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              Transfer directly from your bank app. No card details are
              collected on this website.
            </p>
            <div className="divide-y divide-outline-variant rounded-lg border border-outline-variant">
              {accountDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-between gap-md p-md"
                >
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      {detail.label}
                    </p>
                    <p className="font-button text-button text-primary break-all">
                      {detail.value}
                    </p>
                  </div>
                  <button
                    onClick={() => copyDetail(detail.label, detail.value)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-outline-variant text-primary transition-colors hover:bg-surface-container-low"
                    aria-label={`Copy ${detail.label}`}
                  >
                    <span className="material-symbols-outlined">
                      {copied === detail.label ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-md font-body-sm text-body-sm text-on-surface-variant">
              Use your full name as the transfer narration, for example:{" "}
              <span className="font-bold text-primary">
                DONATION - {donorName || "YOUR NAME"}
              </span>
              .
            </p>
          </div>

          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-md">
              Where does your donation go?
            </h2>
            <div className="grid sm:grid-cols-2 gap-sm">
              {allocations.map((a) => (
                <div
                  key={a.key}
                  className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md"
                >
                  <div className="font-button text-button text-primary">
                    {a.label}
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    {a.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-md">
              Confirm Your Donation on WhatsApp
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              After transferring, send your receipt to us on WhatsApp so we can
              verify the payment and acknowledge your donation.
            </p>
            <div className="grid sm:grid-cols-2 gap-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="e.g. Ahmed Musa"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                  Email
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="ahmed@example.com"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                  Phone
                </label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="080 1234 5678"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                  Bank Reference
                </label>
                <input
                  type="text"
                  value={transferReference}
                  onChange={(e) => setTransferReference(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="From your bank receipt"
                />
              </div>
            </div>

            {whatsappReady ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-lg flex w-full items-center justify-center gap-sm rounded-xl bg-primary px-lg py-4 font-button text-button text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.99]"
              >
                <span className="material-symbols-outlined">chat</span>
                Send Receipt on WhatsApp
              </a>
            ) : (
              <button
                disabled
                className="mt-lg flex w-full cursor-not-allowed items-center justify-center gap-sm rounded-xl bg-surface-container-high px-lg py-4 font-button text-button text-on-surface-variant"
              >
                <span className="material-symbols-outlined">chat</span>
                WhatsApp contact not configured
              </button>
            )}

            <p className="mt-md font-body-sm text-body-sm text-on-surface-variant">
              Never send card numbers, CVV codes, PINs, or banking passwords.
              Only send your bank transfer receipt.
            </p>
          </div>
        </div>

        <aside className="space-y-lg">
          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg space-y-md">
            <h3 className="font-headline-sm text-headline-sm text-primary">
              Your Gift Matters
            </h3>
            <div className="space-y-sm">
              {[
                { icon: "verified", text: "100% transparent reporting" },
                { icon: "account_balance", text: "Direct bank transfer" },
                { icon: "credit_card_off", text: "No card details collected" },
                {
                  icon: "receipt_long",
                  text: "Receipts verified manually",
                },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-sm">
                  <span className="text-sm material-symbols-outlined text-secondary">
                    {item.icon}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            <span className="block text-3xl opacity-50 material-symbols-outlined text-secondary-fixed mb-sm">
              format_quote
            </span>
            <p className="italic leading-relaxed font-body-md text-body-md text-on-surface-variant mb-sm">
              &ldquo;I never imagined my small monthly donation could fund an
              entire leadership workshop. LCA, Abuja showed me exactly where my
              money went.&rdquo;
            </p>
            <p className="font-button text-button text-primary">— Fatima B.</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Monthly Donor
            </p>
          </div>
        </aside>
      </div>

      <section className="mx-auto max-w-container-max px-gutter mt-xl">
        <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg md:p-xl">
          <h2 className="text-center font-headline-md text-headline-md text-primary mb-lg">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-md">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="transition-all border rounded-lg group border-outline-variant p-md open:bg-surface-container-low"
              >
                <summary className="flex items-center justify-between list-none cursor-pointer font-button text-button text-primary">
                  {q}
                  <span className="transition-transform material-symbols-outlined group-open:rotate-180 text-primary">
                    expand_more
                  </span>
                </summary>
                <p className="leading-relaxed mt-md font-body-md text-body-md text-on-surface-variant">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
