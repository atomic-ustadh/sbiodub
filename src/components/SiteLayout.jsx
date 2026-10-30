import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
