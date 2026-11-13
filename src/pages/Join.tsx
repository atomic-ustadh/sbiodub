import { Link } from 'react-router-dom'

export default function Join() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-18">
      <div className="pattern-bg absolute inset-0 opacity-60" />
      <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <section className="container-shell relative z-10 py-xl">
        <div className="mb-xl max-w-3xl">
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">Become a Part of LCA, Abuja</h1>
          <div className="divider-gold mb-md" />
          <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">Shape the future of our community through active engagement, spiritual development, and collaborative service.</p>
        </div>
        <div className="grid grid-cols-1 items-start gap-xl lg:grid-cols-2">
          <div className="space-y-md">
            <div className="grid grid-cols-1 gap-md md:grid-cols-2">
              <div className="card card-hover group p-lg">
                <div className="mb-md flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-primary">groups</span>
                </div>
                <h3 className="mb-sm font-headline-sm text-headline-sm text-primary">Mentorship</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Connect with experienced professionals and spiritual guides committed to your personal growth and career success.</p>
              </div>
              <div className="card card-hover group p-lg">
                <div className="mb-md flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-fixed transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-secondary">hub</span>
                </div>
                <h3 className="mb-sm font-headline-sm text-headline-sm text-primary">Networking</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Join a vibrant ecosystem of like-minded youth, entrepreneurs, and community leaders across the region.</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-primary p-lg text-on-primary shadow-float">
              <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
              <div className="relative z-10">
                <div className="mb-md flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-fixed/15">
                  <span className="material-symbols-outlined text-secondary-fixed">volunteer_activism</span>
                </div>
                <h3 className="mb-sm font-headline-sm text-headline-sm text-secondary-fixed">Community Service</h3>
                <p className="font-body-md text-body-md text-on-primary/70">Lead impactful initiatives that address local needs and foster a spirit of giving back to society.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute right-10 top-5 h-24 w-24 rounded-full border-4 border-secondary-fixed/15" />
            </div>
          </div>

          <div className="card relative overflow-hidden p-lg md:p-xl">
            <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-secondary via-secondary-fixed to-transparent" />
            <div className="mx-auto mb-md flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-fixed">
              <span className="material-symbols-outlined text-3xl text-primary">login</span>
            </div>
            <h2 className="mb-sm text-center font-headline-md text-headline-md text-primary">Ready to Join?</h2>
            <p className="mb-lg text-center font-body-md text-body-md text-on-surface-variant">
              Create an account or sign in on our login page to become part of the LCA, Abuja community.
            </p>
            <Link
              to="/login"
              className="btn btn-primary w-full"
            >
              Continue to Sign Up
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <p className="mt-md text-center font-body-sm text-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary hover:underline">
                Log in
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
