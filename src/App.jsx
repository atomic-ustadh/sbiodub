import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/index'
import About from './pages/about'
import Login from './pages/login'
import Events from './pages/Events'
import Join from './pages/Join'
import Resources from './pages/Resources'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'
  const isNotFound = !['/', '/about', '/login', '/events', '/join', '/resources'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<><Navbar active="home" /><Home /></>} />
        <Route path="/about" element={<><Navbar active="about" /><About /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<><Navbar active="events" /><Events /></>} />
        <Route path="/join" element={<><Navbar active="membership" /><Join /></>} />
        <Route path="/resources" element={<><Navbar active="resources" /><Resources /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && !isNotFound && <Footer />}
    </div>
  )
}
