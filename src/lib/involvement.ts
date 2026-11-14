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

export interface InvolvementDetail {
  title: string
  description: string
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

const involvementRoutes: Record<string, string> = {
  give: '/donate',
  volunteer: '/get-involved/volunteer',
  partner: '/contact',
  'take-a-stall': '/get-involved/take-a-stall',
}

export const involvementIntro = introData as {
  eyebrow: string
  title: string
  description: string
}

const itemModules = import.meta.glob('../content/get-involved/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

export const involvementItems: InvolvementItem[] = Object.values(itemModules)
  .map((value) => value as InvolvementItemData)
  .sort((a, b) => a.order - b.order)
  .map((item) => ({
    ...item,
    ctaTo: involvementRoutes[item.slug] ?? '/get-involved',
  }))

export function getInvolvementItem(
  slug: string | undefined,
): InvolvementItem | undefined {
  return involvementItems.find((item) => item.slug === slug)
}
