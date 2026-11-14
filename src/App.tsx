import { Routes, Route } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/index'
import About from './pages/about'
import Login from './pages/login'
import Events from './pages/Events'
import GetInvolved from './pages/GetInvolved'
import InvolvementDetail from './pages/InvolvementDetail'
import Resources from './pages/Resources'
import BlogPost from './pages/BlogPost'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import Profile from './pages/Profile'
import PaymentHistory from './pages/PaymentHistory'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'
import { involvementItems } from './lib/involvement'
import { posts } from './lib/content'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="get-involved" element={<GetInvolved />} />
        {involvementItems
          .filter((item) => item.detail)
          .map((item) => (
            <Route
              key={item.slug}
              path={`get-involved/${item.slug}`}
              element={<InvolvementDetail slug={item.slug} />}
            />
          ))}
        <Route path="resources" element={<Resources />} />
        {posts.map((post) => (
          <Route
            key={post.slug}
            path={`resources/${post.slug}`}
            element={<BlogPost slug={post.slug} />}
          />
        ))}
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="donate" element={<Donate />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<PaymentHistory />} />
          <Route path="receipts" element={<PaymentHistory />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
