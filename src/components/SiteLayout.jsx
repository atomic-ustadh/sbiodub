import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function SiteLayout() {
  const { pathname } = useLocation()
  const showFaqButton = pathname !== '/join'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
      {showFaqButton && (
        <button
          type="button"
          aria-label="Frequently asked questions"
          className="fixed z-40 flex items-center justify-center transition-all rounded-full shadow-lg bottom-gutter right-gutter bg-secondary text-on-secondary w-14 h-14 hover:scale-110 active:scale-95"
        >
          <span className="material-symbols-outlined">help</span>
        </button>
      )}
    </div>
  )
}
