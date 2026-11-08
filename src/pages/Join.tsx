import { Link } from 'react-router-dom'

export default function Join() {
  return (
    <main className="pt-[80px] min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#735c00 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', opacity: 0.05 }} />
      <section className="mx-auto max-w-container-max px-gutter py-xl">
        <div className="text-center mb-xl md:text-left">
          <h1 className="font-display-lg text-display-lg text-primary mb-md">Become a Part of LCA, Abuja</h1>
          <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">Shape the future of our community through active engagement, spiritual development, and collaborative service.</p>
        </div>
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-xl">
          <div className="space-y-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="transition-shadow border shadow-sm bg-surface-container-lowest p-md rounded-xl border-outline-variant/30 hover:shadow-md group">
                <div className="flex items-center justify-center w-12 h-12 transition-transform rounded-lg bg-primary-fixed mb-md group-hover:scale-110">
                  <span className="material-symbols-outlined text-primary">groups</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">Mentorship</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Connect with experienced professionals and spiritual guides committed to your personal growth and career success.</p>
              </div>
              <div className="transition-shadow border shadow-sm bg-surface-container-lowest p-md rounded-xl border-outline-variant/30 hover:shadow-md group">
                <div className="flex items-center justify-center w-12 h-12 transition-transform rounded-lg bg-secondary-fixed mb-md group-hover:scale-110">
                  <span className="material-symbols-outlined text-secondary">hub</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">Networking</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Join a vibrant ecosystem of like-minded youth, entrepreneurs, and community leaders across the region.</p>
              </div>
            </div>
            <div className="relative overflow-hidden shadow-lg bg-primary p-lg rounded-xl text-on-primary">
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-container mb-md">
                  <span className="material-symbols-outlined text-on-primary-container">volunteer_activism</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm mb-sm text-primary-fixed">Community Service</h3>
                <p className="font-body-md text-body-md text-on-primary-container">Lead impactful initiatives that address local needs and foster a spirit of giving back to society.</p>
              </div>
              <div className="absolute w-48 h-48 rounded-full -right-10 -bottom-10 bg-primary-container opacity-20" />
              <div className="absolute w-24 h-24 border-4 rounded-full right-10 top-5 border-primary-fixed/20" />
            </div>
          </div>

          <div className="border shadow-lg backdrop-blur-xl bg-white/70 border-slate-100/50 p-lg rounded-xl">
            <div className="mx-auto mb-md flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed">
              <span className="material-symbols-outlined text-3xl text-primary">login</span>
            </div>
            <h2 className="text-center font-headline-md text-headline-md text-primary mb-sm">Ready to Join?</h2>
            <p className="text-center font-body-md text-body-md text-on-surface-variant mb-lg">
              Create an account or sign in on our login page to become part of the LCA, Abuja community.
            </p>
            <Link
              to="/login"
              className="flex w-full items-center justify-center gap-sm rounded-lg bg-primary px-lg py-md font-button text-button text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98]"
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
