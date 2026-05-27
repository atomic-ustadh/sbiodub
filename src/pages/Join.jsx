import { useState } from "react";

export default function Join() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const next = () => {
    if (step < totalSteps) setStep((s) => s + 1);
    else {
      alert("Thank you for joining Noor Youth! We will contact you soon.");
      window.location.reload();
    }
  };
  const prev = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const stepTitle =
    step === 1
      ? "Personal Details"
      : step === 2
        ? "Choose Your Path"
        : "Finalize Registration";
  const stepSubtitle =
    step === 1
      ? "Tell us about yourself so we can get to know you better."
      : step === 2
        ? "Select how you would like to participate in our community."
        : "Review your selection and join the Noor Youth family.";

  return (
    <main className="pt-[80px] min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#735c00 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
          opacity: 0.05,
        }}
      />
      <section className="max-w-container-max mx-auto px-gutter py-xl">
        <div className="mb-xl text-center md:text-left">
          <h1 className="font-display-lg text-display-lg text-primary mb-md">
            Become a Part of Noor Youth
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Shape the future of our community through active engagement,
            spiritual development, and collaborative service.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
          {/* Left: Benefits */}
          <div className="space-y-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary">
                    groups
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
                  Mentorship
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Connect with experienced professionals and spiritual guides
                  committed to your personal growth and career success.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary">
                    hub
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
                  Networking
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Join a vibrant ecosystem of like-minded youth, entrepreneurs,
                  and community leaders across the region.
                </p>
              </div>
            </div>
            <div className="bg-primary p-lg rounded-xl text-on-primary relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-on-primary-container">
                    volunteer_activism
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm mb-sm text-primary-fixed">
                  Community Service
                </h3>
                <p className="font-body-md text-body-md text-on-primary-container">
                  Lead impactful initiatives that address local needs and foster
                  a spirit of giving back to society.
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-primary-container opacity-20" />
              <div className="absolute right-10 top-5 w-24 h-24 border-4 border-primary-fixed/20 rounded-full" />
            </div>
            <div className="relative h-75 rounded-xl overflow-hidden shadow-md">
              <img
                className="w-full h-full object-cover"
                alt="Youth community"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMq-2GnpirD7vA11pTV8LokP4V6dKfmm39tm83TCf76qg3cQMDRx5WtVjF7IJEqnc1fRX6bqNiavHqaS5MvkS0LZQqTxetPzLR9YneFn9k0BwiJY3JmYdBw5Zkc3_jxNM9hCOOoXWX8mRKbB8OPXgkNUFW4IrDjzXjKYeBGoBxEh_rttMhnXqhVXNRlkrvp_LpjS0Jr3_cu2i35fYBWqhSSv79DBEzhvU87igYwuguD6TBKrG63H1WDMOBxW8wc9Aka3YS61DfJQSP"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent flex items-end p-lg">
                <p className="font-body-lg text-body-lg text-white font-semibold italic">
                  &ldquo;Joining Noor Youth was the best decision for my
                  spiritual and professional journey.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right: Multi-step Form */}
          <div className="backdrop-blur-xl bg-white/70 border border-slate-100/50 px-sm md:px-lg py-lg rounded-xl shadow-lg">
            <div className="mb-lg">
              <div className="flex items-center gap-xs mb-sm">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-surface-variant"}`}
                  />
                ))}
              </div>
              <h2 className="font-headline-md text-headline-md text-primary">
                {stepTitle}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {stepSubtitle}
              </p>
            </div>

            <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
              {step === 1 && (
                <div className="transition-all duration-400">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">
                        Full Name
                      </label>
                      <input
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-secondary-fixed-dim focus:border-primary outline-none transition-all"
                        placeholder="Enter your name"
                        type="text"
                      />
                    </div>
                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">
                        Email Address
                      </label>
                      <input
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-secondary-fixed-dim focus:border-primary outline-none transition-all"
                        placeholder="name@example.com"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="mt-md space-y-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">
                      Interest Area
                    </label>
                    <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-secondary-fixed-dim focus:border-primary outline-none transition-all">
                      <option>Community Service</option>
                      <option>Educational Programs</option>
                      <option>Spiritual Growth</option>
                      <option>Leadership Training</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="transition-all duration-400">
                  <p className="font-label-md text-label-md text-on-surface-variant mb-sm">
                    Choose your primary path:
                  </p>
                  <div className="grid grid-cols-1 gap-md">
                    {["Member", "Volunteer"].map((role) => (
                      <label
                        key={role}
                        className="flex items-start p-md border border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors group"
                      >
                        <input
                          className="mt-1 text-primary focus:ring-primary h-4 w-4"
                          name="path"
                          type="radio"
                        />
                        <div className="ml-md">
                          <span className="block font-headline-sm text-headline-sm text-primary mb-xs">
                            {role}
                          </span>
                          <span className="block font-body-sm text-body-sm text-on-surface-variant">
                            {role === "Member"
                              ? "Access all resources, events, and formal mentorship programs."
                              : "Contribute your skills to manage events and outreach initiatives."}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="transition-all duration-400 text-center py-lg">
                  <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-md">
                    <span
                      className="material-symbols-outlined text-primary text-4xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      check_circle
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-sm">
                    Ready to Join?
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    By clicking submit, you agree to our community guidelines
                    and mission statement.
                  </p>
                </div>
              )}

              <div className="pt-lg flex items-center justify-between">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 1}
                  className={`font-button text-button text-primary flex items-center transition-all ${step === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                >
                  <span className="material-symbols-outlined mr-xs">
                    chevron_left
                  </span>{" "}
                  Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="font-button text-button bg-primary text-on-primary px-md md:px-xl py-2 rounded-full hover:shadow-lg transition-all flex items-center"
                >
                  {step < 3 ? (
                    <>
                      Continue{" "}
                      <span className="material-symbols-outlined ml-xs">
                        chevron_right
                      </span>
                    </>
                  ) : (
                    <>
                      Submit{" "}
                      <span className="material-symbols-outlined ml-xs">
                        send
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
