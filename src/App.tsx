/**
 * Application route table.
 * - `ScrollToTop` resets scroll on pathname changes.
 * - Most routes render inside `SiteLayout` (nav/footer/chrome); `/login`,
 *   `/forgot-password`, and `*` render standalone.
 * - Public pages are lazy-loaded; `SiteLayout` supplies the Suspense boundary for
 *   nested routes and `/login` wraps its own.
 * - Detail routes for involvement (items with `detail`) and resources are
 *   generated from content so unknown slugs are not matched here and fall
 *   through to the global `*` 404 route.
 * - Protected member routes (`/profile`, `/history`, legacy `/receipts`) are
 *   wrapped by `ProtectedRoute`.
 */
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import SiteLayout from './components/SiteLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PageLoader from './components/PageLoader'
import Home from './pages/index'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'
import { involvementItems } from './lib/involvement'
import { posts } from './lib/content'

const About = lazy(() => import('./pages/about'))
const Login = lazy(() => import('./pages/login'))
const Events = lazy(() => import('./pages/Events'))
const GetInvolved = lazy(() => import('./pages/GetInvolved'))
const InvolvementDetail = lazy(() => import('./pages/InvolvementDetail'))
const Resources = lazy(() => import('./pages/Resources'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const Faq = lazy(() => import('./pages/Faq'))
const Contact = lazy(() => import('./pages/Contact'))
const Donate = lazy(() => import('./pages/Donate'))
const Profile = lazy(() => import('./pages/Profile'))
const PaymentHistory = lazy(() => import('./pages/PaymentHistory'))

export default function App() {
  return (
    <>
      <ScrollToTop />
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
      <Route
        path="login"
        element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        }
      />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
