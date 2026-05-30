import { useState } from "react";
import { Link } from "react-router-dom";

const presetAmounts = [5000, 10000, 25000, 50000, 100000];

const allocations = [
  { key: "general", label: "General Fund", desc: "Where most needed" },
  { key: "youth", label: "Youth Programs", desc: "Workshops & mentorship" },
  { key: "events", label: "Community Events", desc: "Gatherings & outreach" },
  { key: "outreach", label: "Outreach", desc: "Dawah & charity drives" },
];

export default function Donate() {
  const [frequency, setFrequency] = useState("one-time");
  const [amount, setAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [allocation, setAllocation] = useState("general");
  const [step, setStep] = useState(1);

  const selectAmount = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  return (
    <main className="pt-18 pb-xl">
      {/* Hero */}
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
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-lg">
          {/* Give / Zakat Toggle */}
          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            {/* Frequency */}
            <div className="flex gap-sm mb-lg">
              <button
                onClick={() => setFrequency("one-time")}
                className={`flex-1 py-2 rounded-lg font-button text-button text-sm transition-all ${
                  frequency === "one-time"
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setFrequency("monthly")}
                className={`flex-1 py-2 rounded-lg font-button text-button text-sm transition-all ${
                  frequency === "monthly"
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFrequency("Yearly")}
                className={`flex-1 py-2 rounded-lg font-button text-button text-sm transition-all ${
                  frequency === "Yearly"
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                Yearly
              </button>
            </div>

            <p className="font-label-md text-label-md text-on-surface-variant mb-md">
              Select Amount ({frequency === "monthly" ? "per month" : ""})
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-sm mb-md">
              {presetAmounts.map((val) => (
                <button
                  key={val}
                  onClick={() => selectAmount(val)}
                  className={`py-3 rounded-lg font-button text-button text-sm transition-all ${
                    amount === val && !customAmount
                      ? "bg-primary text-on-primary shadow-md ring-2 ring-secondary-fixed"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant border border-outline-variant"
                  }`}
                >
                  ₦{val.toLocaleString()}
                </button>
              ))}
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute -translate-y-1/2 left-4 top-1/2 text-on-surface-variant font-button">
                  ₦
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(0);
                  }}
                  placeholder="Enter amount"
                  className="w-full py-3 pl-10 pr-4 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Allocation */}
          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-md">
              Where should your donation go?
            </h2>
            <div className="grid sm:grid-cols-2 gap-sm">
              {allocations.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setAllocation(a.key)}
                  className={`text-left p-md rounded-lg border transition-all ${
                    allocation === a.key
                      ? "border-secondary bg-secondary-fixed/20 ring-1 ring-secondary"
                      : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"
                  }`}
                >
                  <div className="font-button text-button text-primary">
                    {a.label}
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    {a.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Donor Info */}
          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-md">
              Your Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                  Full Name
                </label>
                <input
                  type="text"
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
                  className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="080 1234 5678"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                  Anonymous
                </label>
                <select className="w-full px-4 py-3 border rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none">
                  <option value="no">No — show my name</option>
                  <option value="yes">Yes — keep me anonymous</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-md">
              Payment Method
            </h2>
            <div className="grid sm:grid-cols-2 gap-sm mb-lg">
              {["Card", "Bank Transfer", "PayPal", "USSD"].map((method) => (
                <button
                  key={method}
                  className="flex items-center px-4 py-3 text-left transition-all border rounded-lg border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low gap-sm"
                >
                  <span className="material-symbols-outlined text-primary">
                    {method === "Card"
                      ? "credit_card"
                      : method === "Bank Transfer"
                        ? "account_balance"
                        : method === "PayPal"
                          ? "paypal"
                          : "smartphone"}
                  </span>
                  <span className="font-button text-button text-on-surface">
                    {method}
                  </span>
                </button>
              ))}
            </div>
            <button className="w-full py-4 rounded-xl bg-primary text-on-primary font-button text-button text-lg hover:bg-primary-container transition-all shadow-md active:scale-[0.99]">
              {frequency === "monthly"
                ? `Donate ₦${(customAmount || amount).toLocaleString()}/month`
                : `Donate ₦${(customAmount || amount).toLocaleString()}`}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-lg">
          {/* Trust */}
          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg space-y-md">
            <h3 className="font-headline-sm text-headline-sm text-primary">
              Your Gift Matters
            </h3>
            <div className="space-y-sm">
              {[
                { icon: "verified", text: "100% transparent reporting" },
                { icon: "shield", text: "Secure payment processing" },
                {
                  icon: "receipt_long",
                  text: "Tax-deductible receipt provided",
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

          {/* Testimonial */}
          <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg">
            <span className="block text-3xl opacity-50 material-symbols-outlined text-secondary-fixed mb-sm">
              format_quote
            </span>
            <p className="italic leading-relaxed font-body-md text-body-md text-on-surface-variant mb-sm">
              "I never imagined my small monthly donation could fund an entire
              leadership workshop. Noor Youth showed me exactly where my money
              went."
            </p>
            <p className="font-button text-button text-primary">— Fatima B.</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Monthly Donor
            </p>
          </div>
        </aside>
      </div>

      {/* FAQ */}
      <section className="mx-auto max-w-container-max px-gutter mt-xl">
        <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg md:p-xl">
          <h2 className="text-center font-headline-md text-headline-md text-primary mb-lg">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-md">
            {[
              {
                q: "Is my donation tax-deductible?",
                a: "Yes, Noor Youth Organization is a registered nonprofit. You will receive a tax-deductible receipt for your contribution.",
              },
              {
                q: "Can I donate Zakat here?",
                a: "Absolutely. Select the Zakat option and your funds will be disbursed according to Islamic guidelines to eligible recipients.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept credit/debit cards, bank transfers, PayPal, and USSD for Nigerian donors.",
              },
              {
                q: "Can I change or cancel my monthly donation?",
                a: "Yes, you can modify or cancel your recurring donation anytime by contacting us.",
              },
              {
                q: "How is my donation used?",
                a: "We provide detailed financial reports. You can also select a specific allocation area to direct your gift.",
              },
            ].map(({ q, a }) => (
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

      {/* CTA */}
      <section className="mx-auto text-center max-w-container-max px-gutter mt-xl">
        <p className="font-body-md text-body-md text-on-surface-variant mb-md">
          Want to contribute in other ways? We also accept volunteer time,
          in-kind donations, and corporate sponsorships.
        </p>
        <Link
          to="/join"
          className="inline-flex items-center transition-transform rounded-lg shadow-md gap-sm bg-secondary-fixed text-on-secondary-fixed font-button text-button px-lg py-md hover:scale-105"
        >
          Become a Volunteer
          <span className="material-symbols-outlined">handshake</span>
        </Link>
      </section>
    </main>
  );
}
