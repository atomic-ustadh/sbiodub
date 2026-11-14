import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth as useClerkAuth } from "@clerk/react";
import { donationPage } from "../lib/content";
import { payWithPaystack } from "../lib/paystack";
import { useAuth } from "../context/AuthContext";

const PRESET_AMOUNTS = [5000, 20000, 42000, 126000];

export default function Donate() {
  const navigate = useNavigate();
  const { user, refreshDonations } = useAuth();
  const { getToken } = useClerkAuth();
  const [donorName, setDonorName] = useState(user?.name ?? "");
  const [donorEmail, setDonorEmail] = useState(user?.email ?? "");
  const [donorPhone, setDonorPhone] = useState(user?.phone ?? "");
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(42000);
  const [customAmount, setCustomAmount] = useState("");
  const [allocation, setAllocation] = useState(
    donationPage.destinations[0]?.label ?? "General Fund",
  );
  const [anonymous, setAnonymous] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFallback, setPaymentFallback] = useState(false);

  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const amountValue =
    selectedAmount === "custom" ? Number(customAmount) : selectedAmount;
  const selectedDestination = donationPage.destinations.find(
    (destination) => destination.label === allocation,
  );
  const donationKind = selectedDestination?.kind ?? "donation";

  useEffect(() => {
    if (!user) return;
    setDonorName((current) => current || user.name);
    setDonorEmail((current) => current || user.email);
    setDonorPhone((current) => current || user.phone);
  }, [user]);

  const copyDetail = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const handleOnlineDonation = async () => {
    setPaymentError(null);
    setPaymentSuccess(false);
    setPaymentFallback(false);

    if (!paystackPublicKey) {
      setPaymentError("Online payments are not configured yet.");
      return;
    }
    if (!donorEmail.trim()) {
      setPaymentError("Enter the email address that should receive your receipt.");
      return;
    }
    if (!Number.isFinite(amountValue) || amountValue < 100) {
      setPaymentError("Enter a donation amount of at least ₦100.");
      return;
    }

    setPaying(true);
    try {
      const reference = `lca_${crypto.randomUUID()}`;
      const token = user ? await getToken() : null;
      const paidReference = await payWithPaystack({
        publicKey: paystackPublicKey,
        email: donorEmail.trim(),
        amount: Math.round(amountValue * 100),
        reference,
        metadata: {
          full_name: donorName.trim(),
          phone: donorPhone.trim(),
          allocation,
          type: donationKind,
          anonymous,
          ...(user?.id ? { user_id: user.id } : {}),
        },
      });

      const response = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ reference: paidReference }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { donation?: { id: string }; error?: string; code?: string }
        | null;

      if (!response.ok || !payload?.donation) {
        if (payload?.code === "database_unavailable" || response.status === 503) {
          setPaymentFallback(true);
          return;
        }
        throw new Error(payload?.error || "We could not confirm the payment.");
      }

      if (user) {
        await refreshDonations();
        navigate(`/history?donation=${encodeURIComponent(payload.donation.id)}`);
      } else {
        setPaymentSuccess(true);
      }
    } catch (error) {
      setPaymentError(
        error instanceof Error ? error.message : "Payment failed. Please try again.",
      );
    } finally {
      setPaying(false);
    }
  };

  const whatsappNumber = donationPage.whatsappNumber.replace(/\D/g, "");
  const whatsappReady =
    !donationPage.whatsappNumber.startsWith("REPLACE_WITH_") &&
    whatsappNumber.length > 0;
  const whatsappMessage = [
    "Assalamu Alaikum LCA Abuja, I have made a donation.",
    `Name: ${donorName || "Not provided"}`,
    `Email: ${donorEmail || "Not provided"}`,
    `Phone: ${donorPhone || "Not provided"}`,
    "I have attached my transfer receipt.",
  ].join("\n");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const accountDetails = [
    { label: "Bank", value: donationPage.bankName },
    { label: "Account name", value: donationPage.accountName },
    { label: "Account number", value: donationPage.accountNumber },
  ];

  return (
    <main className="pt-18 pb-xl">
      <section className="hero-gradient relative mb-xl overflow-hidden py-20">
        <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-container-max px-gutter text-center">
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-secondary-fixed md:text-display-lg">
            Make a Donation
          </h1>
          <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-primary/70">
            Your contributions help us empower the next generation of Muslim
            leaders through faith, service, and excellence.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-container-max gap-xl px-gutter lg:grid-cols-3">
        <div className="space-y-lg lg:col-span-2">
          <div className="card p-md md:p-lg">
            <h2 className="mb-md font-headline-sm text-headline-sm text-primary">
              Donate online
            </h2>
            <p className="mb-md font-body-md text-body-md text-on-surface-variant">
              Pay securely by card, bank transfer or USSD. Payment is handled by
              Paystack — we never see or store your card details, and your
              receipt is available immediately.
            </p>

            <p className="mb-sm font-label-md text-label-md uppercase text-secondary">
              Choose an amount
            </p>
            <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
              {PRESET_AMOUNTS.map((amount) => {
                const active = selectedAmount === amount;
                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setSelectedAmount(amount)}
                    className={`rounded-xl border px-md py-sm font-button text-button transition-all ${
                      active
                        ? "border-primary bg-primary text-on-primary shadow-sm"
                        : "border-outline-variant text-primary hover:border-secondary/50 hover:bg-surface-container-low"
                    }`}
                  >
                    &#8358;{amount.toLocaleString()}
                  </button>
                );
              })}
            </div>

            <div className="mt-sm flex flex-col gap-sm sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setSelectedAmount("custom")}
                className={`rounded-xl border px-md py-sm font-button text-button transition-all ${
                  selectedAmount === "custom"
                    ? "border-primary bg-primary text-on-primary shadow-sm"
                    : "border-outline-variant text-primary hover:border-secondary/50 hover:bg-surface-container-low"
                }`}
              >
                Another amount
              </button>
              {selectedAmount === "custom" && (
                <input
                  type="number"
                  min={100}
                  step={100}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Amount in naira"
                  className="field min-w-0 sm:flex-1"
                />
              )}
            </div>

            <div className="mt-md grid gap-md sm:grid-cols-2">
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Where should it go?
                </label>
                <select
                  value={allocation}
                  onChange={(e) => setAllocation(e.target.value)}
                  className="field"
                >
                  {donationPage.destinations.map((destination) => (
                    <option key={destination.label} value={destination.label}>
                      {destination.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Full name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Ahmed Musa"
                  className="field"
                />
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Email
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="field"
                />
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Phone
                </label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="080 1234 5678"
                  className="field"
                />
              </div>
            </div>

            <label className="mt-md flex items-start gap-sm font-body-sm text-body-sm text-on-surface-variant">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="mt-1 h-4 w-4 rounded accent-primary"
              />
              Give anonymously. Your name will not be shown publicly.
            </label>

            {paymentSuccess && (
              <p className="mt-md rounded-xl bg-primary-fixed px-md py-sm font-body-sm text-body-sm text-on-primary-fixed">
                Thank you — your payment was received and Paystack has emailed
                your receipt. To keep donation history in your dashboard, sign
                in before giving.
              </p>
            )}

            {paymentFallback && (
              <p className="mt-md rounded-xl border border-secondary/25 bg-secondary-container/40 px-md py-sm font-body-sm text-body-sm text-on-secondary-container">
                Your payment went through, but we could not reach our donation
                records right now. Paystack has emailed your receipt — please
                keep it. If this donation does not appear in your history later,
                contact us with your receipt.
              </p>
            )}

            {paymentError && (
              <p className="mt-md rounded-xl bg-error-container px-md py-sm font-body-sm text-body-sm text-on-error-container">
                {paymentError}
              </p>
            )}

            <button
              type="button"
              onClick={handleOnlineDonation}
              disabled={paying}
              className="btn btn-primary mt-lg w-full py-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="material-symbols-outlined">lock</span>
              {paying
                ? "Processing..."
                : `Give ₦${(Number.isFinite(amountValue) ? amountValue : 0).toLocaleString()}`}
            </button>
            <p className="mt-md font-body-sm text-body-sm text-on-surface-variant">
              Secure payment by Paystack. If you are signed in, the payment is
              saved to your history; otherwise Paystack emails your receipt.
            </p>
          </div>

          <div className="card p-md md:p-lg">
            <h2 className="mb-md font-headline-sm text-headline-sm text-primary">
              Bank Transfer Details
            </h2>
            <p className="mb-md font-body-md text-body-md text-on-surface-variant">
              Transfer directly from your bank app. No card details are
              collected on this website.
            </p>
            <div className="divide-y divide-outline-variant overflow-hidden rounded-xl border border-outline-variant">
              {accountDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-between gap-md bg-surface-container-lowest p-md"
                >
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md uppercase text-on-surface-variant">
                      {detail.label}
                    </p>
                    <p className="break-all font-button text-button text-primary">
                      {detail.value}
                    </p>
                  </div>
                  <button
                    onClick={() => copyDetail(detail.label, detail.value)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-outline-variant text-primary transition-colors hover:bg-surface-container-low"
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

          <div className="card p-md md:p-lg">
            <h2 className="mb-md font-headline-sm text-headline-sm text-primary">
              Where does your donation go?
            </h2>
            <div className="grid gap-sm sm:grid-cols-2">
              {donationPage.destinations.map((destination) => (
                <div
                  key={destination.label}
                  className="rounded-xl border border-outline-variant bg-surface-container-low p-md"
                >
                  <div className="font-button text-button text-primary">
                    {destination.label}
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    {destination.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-md md:p-lg">
            <h2 className="mb-md font-headline-sm text-headline-sm text-primary">
              Confirm Your Donation on WhatsApp
            </h2>
            <p className="mb-md font-body-md text-body-md text-on-surface-variant">
              After transferring, tap the button below to open WhatsApp with
              your details filled in. Attach your bank receipt in the chat
              before sending so we can verify and acknowledge your donation.
            </p>
            <div className="grid gap-md sm:grid-cols-2">
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Full Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="field"
                  placeholder="e.g. Ahmed Musa"
                />
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Email
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="field"
                  placeholder="ahmed@example.com"
                />
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Phone
                </label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="field"
                  placeholder="080 1234 5678"
                />
              </div>
            </div>

            {whatsappReady ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-lg w-full py-4"
              >
                <span className="material-symbols-outlined">chat</span>
                Send Receipt on WhatsApp
              </a>
            ) : (
              <button
                disabled
                className="btn mt-lg w-full cursor-not-allowed bg-surface-container-high py-4 text-on-surface-variant"
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
          <div className="card space-y-md p-lg">
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
                  <span className="material-symbols-outlined text-sm text-secondary">
                    {item.icon}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-lg">
            <span className="material-symbols-outlined mb-sm block text-3xl text-secondary-fixed">
              format_quote
            </span>
            <p className="mb-sm font-body-md text-body-md italic leading-relaxed text-on-surface-variant">
              &ldquo;{donationPage.quote}&rdquo;
            </p>
            <p className="font-button text-button text-primary">
              — {donationPage.quoteAuthor}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {donationPage.quoteRole}
            </p>
          </div>
        </aside>
      </div>

      <section className="mx-auto mt-xl max-w-container-max px-gutter">
        <div className="card p-md md:p-lg">
          <h2 className="mb-lg text-center font-headline-md text-headline-md text-primary">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl space-y-md">
            {donationPage.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-outline-variant p-md transition-all open:bg-surface-container-low"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-button text-button text-primary">
                  {faq.question}
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-md font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
