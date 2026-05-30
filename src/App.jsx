import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/index'
import About from './pages/about'
import Login from './pages/login'
import Events from './pages/Events'
import Join from './pages/Join'
import Resources from './pages/Resources'
import BlogPost from './pages/BlogPost'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Donate from './pages/Donate'
import Profile from './pages/Profile'
import Receipts from './pages/Receipts'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'
  const isNotFound = !['/', '/about', '/login', '/events', '/join', '/resources', '/privacy', '/terms', '/donate', '/profile', '/receipts'].includes(location.pathname) && !location.pathname.startsWith('/resources/')

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<><Navbar active="home" /><Home /></>} />
        <Route path="/about" element={<><Navbar active="about" /><About /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<><Navbar active="events" /><Events /></>} />
        <Route path="/join" element={<><Navbar active="membership" /><Join /></>} />
        <Route path="/resources" element={<><Navbar active="resources" /><Resources /></>} />
        <Route path="/resources/:slug" element={<><Navbar /><BlogPost /></>} />
        <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /></>} />
        <Route path="/terms" element={<><Navbar /><TermsOfService /></>} />
        <Route path="/donate" element={<><Navbar /><Donate /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /></>} />
        <Route path="/receipts" element={<><Navbar /><Receipts /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && !isNotFound && <Footer />}
    </div>
  )
}
