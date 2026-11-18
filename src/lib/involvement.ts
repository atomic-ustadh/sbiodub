/**
 * Get Involved content loader (build-time).
 *
 * - Intro comes from `get-involved-intro.json`; items are loaded from the
 *   `get-involved/*.json` collection via `import.meta.glob` and sorted by `order`.
 * - Button destinations (`ctaTo`) are code-controlled in `involvementRoutes` (not
 *   CMS-editable) to keep navigation/route behavior stable; CMS controls labels/copy.
 * - `applications` window config for Take a Stall is CMS data but evaluated at
 *   runtime in the page component so availability flips without a rebuild.
 */
import introData from '../content/get-involved-intro.json'

export interface InvolvementSection {
  title: string
  body: string
  list?: string[]
}

export interface InvolvementStep {
  title: string
  body: string
}

export type ApplicationMode = 'scheduled' | 'open' | 'closed'

export interface StallApplications {
  mode?: ApplicationMode
  opensAt?: string
  closesAt?: string
  timezone?: string
  notYetOpenMessage?: string
  closedMessage?: string
}

export interface InvolvementDetail {
  title: string
  description: string
  applications?: StallApplications
  sections?: InvolvementSection[]
  steps?: InvolvementStep[]
}

interface InvolvementItemData {
  slug: string
  icon: string
  title: string
  summary: string
  ctaLabel: string
  order: number
  detail?: InvolvementDetail
}

export interface InvolvementItem extends InvolvementItemData {
  ctaTo: string
}

/** Code-owned CTA destinations keyed by item slug (kept out of CMS). */
const involvementRoutes: Record<string, string> = {
  give: '/donate',
  volunteer: '/get-involved/volunteer',
  partner: '/contact',
  'take-a-stall': '/get-involved/take-a-stall',
}

/** Hero/intro copy for the Get Involved page. */
export const involvementIntro = introData as {
  eyebrow: string
  title: string
  description: string
}

const itemModules = import.meta.glob('../content/get-involved/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

/** Involvement items sorted by `order` with code-controlled `ctaTo` merged in. */
export const involvementItems: InvolvementItem[] = Object.values(itemModules)
  .map((value) => value as InvolvementItemData)
  .sort((a, b) => a.order - b.order)
  .map((item) => ({
    ...item,
    ctaTo: involvementRoutes[item.slug] ?? '/get-involved',
  }))

/** Looks up an involvement item by slug (used for detail routing/rendering). */
export function getInvolvementItem(
  slug: string | undefined,
): InvolvementItem | undefined {
  return involvementItems.find((item) => item.slug === slug)
}
