/**
 * Terms of service page (route `/terms`).
 * - Thin wrapper: legal copy and layout live in `LegalPageContent`, keyed by the
 *   `terms` record in `src/content/legal/`.
 */
import LegalPageContent from '../components/LegalPageContent'

/** Renders the CMS-backed terms of service via the shared legal layout. */
export default function TermsOfService() {
  return <LegalPageContent slug="terms" />
}
