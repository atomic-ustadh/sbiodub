import { Routes, Route } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import ProtectedRoute from './components/ProtectedRoute'
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
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="join" element={<Join />} />
        <Route path="resources" element={<Resources />} />
        <Route path="resources/:slug" element={<BlogPost />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="donate" element={<Donate />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="receipts" element={<Receipts />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
