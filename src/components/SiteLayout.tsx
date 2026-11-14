import { Link, Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function SiteLayout() {
  const { pathname } = useLocation()
  const showFaqButton = !pathname.startsWith('/get-involved') && pathname !== '/faq'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
      {showFaqButton && (
        <Link
          to="/faq"
          aria-label="Frequently asked questions"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-gold ring-4 ring-secondary/15 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary-fixed-dim active:scale-95 print:hidden"
        >
          <span className="material-symbols-outlined">help</span>
        </Link>
      )}
    </div>
  )
}
