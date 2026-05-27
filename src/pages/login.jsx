import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interest, setInterest] = useState("");
  const [terms, setTerms] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full overflow-x-hidden relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-gutter md:top-25 left-3 md:left-gutter z-50 flex items-center gap-sm text-on-primary px-sm py-xs rounded-lg hover:bg-white/30 transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">
          arrow_back
        </span>
        <span className="font-button text-button hidden sm:inline">Back</span>
      </button>

      {/* ---- LEFT: Visual / Inspiration ---- */}
      <section className="relative w-full md:w-1/2 flex items-center justify-center overflow-hidden bg-primary min-h-102 md:min-h-screen">
        {mode === "signup" ? (
          <div className="relative z-10 px-gutter text-center md:text-left max-w-120">
            <div className="mb-md mt-md ">
              <span className="inline-block px-sm py-xs bg-secondary text-on-secondary font-label-md text-label-md rounded-full mb-sm">
                Noor Youth Community
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary-fixed leading-tight">
                Illuminate Your Potential.
              </h1>
            </div>
            <p className="font-body-lg text-body-lg text-on-primary/90 max-w-3xl">
              Join a movement dedicated to spiritual growth, community service,
              and youth empowerment. Your journey begins here.
            </p>
            <div className="mt-md md:mt-lg flex items-center gap-sm">
              <div className="flex space-x-[-12px] overflow-hidden">
                <img
                  alt="Member 1"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2njxIygCe1ZpDVHv3I1yHuMq9jVqVASjiKTE5R6VbT_CLksgCQ3MmTboNOSUWv7hVY127qRSrgrCfgZ8fV4lQr73x5m2yqo54gwJvHIFHwfHFPze_Se2EmEqW-lcfuBCkz_1ly5V5VacjIZ7PHgaN_BUr6d2Q19UK34CYrZkwcS8MAc9x0S6N8RuHNY3X-ZwMuGCM_l2QUkVHLDbmSQ4Rka9lWYfmthjXyRxt8hR1rUSvid1N57OD2aAlkQCPiJjKEe8wSxUA-B6e"
                />
                <img
                  alt="Member 2"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiK95LsX9ZL2ZZ11TycutHBWQ6H5mTEMLphb63GASjINVk_mOgnf7HmeYfQIPQN4k8NHQ3xzQHGI1bn4rerd-ULuragt00ZXf1lXCb4po-NAIw-YTjZS1_yr93SauhU-y_-C-rWH0sPRTj3buj_9HRmmibuZNRcv7J9VUvuLxXwco4CBAse7lw4o-0ZRjkW9Ev0ls6hEeCBOP5iH1qb1J1M2jOu2dLl97_AeY7K5nu3gNUMX4xUH__rzJ_4CIb-j0ea-58C1ed_i2y"
                />
                <img
                  alt="Member 3"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBriPffv_6w60ycnplrf4tDb3T2qAEIM0RHfKPx2haJfxr2xudN9wnJMf-rF2G53F3QfJMT5Ua2wsJIcrEpgO1hWBP-xWv-Xor6FU6Tl_a0H9K66CcGY21iuCBoyFxSKisMK0L5sP22xoSeki6YVO36pmREVV6EFgE7EkABKJbANJ7AGAdD4P2exbqtjEQOUaw9qopSuXpdHR73GXBrwdbSKSuWuiyxyEv52FtjWHq7BSwxWtBi97_E4aNewj95FEJhFZTaZM6Ok1Ct"
                />
              </div>
              <p className="font-body-sm text-body-sm text-on-primary/80">
                Join 2,000+ youth members
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="relative z-10 flex flex-col justify-end px-xl py-sm text-on-primary max-w-120">
              <div className="py-sm mt-md">
                <span className="inline-block px-sm py-xs bg-secondary-fixed text-on-secondary-fixed rounded-full text-label-md font-label-md mb-lg">
                  WISDOM & GROWTH
                </span>
                <h1 className="font-display-lg text-display-lg mb-lg text-secondary-fixed">
                  &ldquo;Read, in the name of your Lord who created.&rdquo;
                </h1>
                <p className="font-body-lg text-body-lg text-on-primary/90 italic leading-normal md:leading-loose">
                  Knowledge is the light that guides the path of the youth
                  towards a brighter, more purposeful future. Join our community
                  of seekers and achievers.
                </p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ---- RIGHT: Form ---- */}
      <section className="w-full md:w-1/2 flex items-center justify-center bg-surface px-gutter">
        <div className="w-full max-w-144">
          {mode === "signup" ? (
            <>
              <div className="mb-lg mt-md">
                <h2 className="font-headline-md text-headline-md text-primary font-bold mb-xs">
                  Noor Youth
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Create your account to join the community.
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="full_name"
                  >
                    Full Name
                  </label>
                  <div className="relative group form-glow rounded-lg">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">
                      person
                    </span>
                    <input
                      className="w-full pl-lg pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all duration-200"
                      id="full_name"
                      placeholder="Enter your full name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative group form-glow rounded-lg">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">
                      mail
                    </span>
                    <input
                      className="w-full pl-lg pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all duration-200"
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative group form-glow rounded-lg">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">
                      lock
                    </span>
                    <input
                      className="w-full pl-lg pr-lg py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all duration-200"
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-sm pt-sm">
                  <div className="flex items-center h-5">
                    <input
                      className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary-container"
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                    />
                  </div>
                  <div className="text-sm mb-lg">
                    <label
                      className="font-body-sm text-body-sm text-on-surface-variant"
                      htmlFor="terms"
                    >
                      I agree to the{" "}
                      <a
                        className="text-primary font-bold hover:underline"
                        href="#"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        className="text-primary font-bold hover:underline"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                </div>

                <button
                  className="w-full bg-primary text-on-primary font-button text-button py-sm rounded-lg shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-sm"
                  type="submit"
                >
                  Create Account
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </form>

              <div className="mt-sm pt-md border-t border-outline-variant text-center">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Already a member?
                  <button
                    className="text-secondary font-bold hover:text-primary transition-colors ml-xs"
                    onClick={() => setMode("signin")}
                  >
                    Log In
                  </button>
                </p>
              </div>

              <div className="mt-md mb-md text-center">
                <p className="font-body-sm text-body-sm text-outline">
                  &copy; 2026 Noor Youth Organization. All rights reserved.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-lg mt-md">
                <h2 className="font-headline-md text-headline-md text-primary mb-xs">
                  Welcome Back
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Access your dashboard and continue your journey.
                </p>
              </div>

              <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative form-glow rounded-lg">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">
                      mail
                    </span>
                    <input
                      className="w-full pl-lg pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all duration-200"
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-xs">
                  <div className="flex justify-between items-center">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a
                      className="font-body-sm text-body-sm text-primary hover:text-secondary-fixed-dim transition-colors"
                      href="#"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative form-glow rounded-lg">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">
                      lock
                    </span>
                    <input
                      className="w-full pl-lg pr-lg py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all duration-200"
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-sm">
                  <input
                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label
                    className="font-body-sm text-body-sm text-on-surface-variant"
                    htmlFor="remember"
                  >
                    Keep me signed in
                  </label>
                </div>

                <button
                  className="w-full bg-primary text-on-primary font-button text-button py-sm rounded-lg shadow-sm hover:bg-primary-container transition-all active:scale-[0.98]"
                  type="submit"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-lg relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-md bg-surface text-outline font-label-md text-label-md">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              <div className="mt-lg">
                <button className="w-full flex items-center justify-center gap-md py-sm px-md border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors font-button text-button text-on-surface">
                  <img alt="Google" className="w-5 h-5" src="#" />
                  <span>Continue with Google</span>
                </button>
              </div>

              <p className="mt-md mb-md text-center font-body-md text-body-md text-on-surface-variant">
                Don&rsquo;t have an account?
                <button
                  className="text-primary font-bold hover:underline decoration-secondary-fixed decoration-2 underline-offset-4 ml-xs"
                  onClick={() => setMode("signup")}
                >
                  Join Us Today
                </button>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
