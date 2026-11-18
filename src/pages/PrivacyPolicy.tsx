/**
 * Privacy policy page (route `/privacy`).
 * - Thin wrapper: legal copy and layout live in `LegalPageContent`, keyed by the
 *   `privacy` record in `src/content/legal/`.
 */
import LegalPageContent from '../components/LegalPageContent'

/** Renders the CMS-backed privacy policy via the shared legal layout. */
export default function PrivacyPolicy() {
  return <LegalPageContent slug="privacy" />
}
