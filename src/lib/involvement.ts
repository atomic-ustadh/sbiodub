import data from '../content/get-involved.json'

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
  detail?: InvolvementDetail
}

export interface InvolvementItem extends InvolvementItemData {
  ctaTo: string
}

interface InvolvementContent {
  intro: {
    eyebrow: string
    title: string
    description: string
  }
  items: InvolvementItemData[]
}

const involvementRoutes: Record<string, string> = {
  give: '/donate',
  volunteer: '/get-involved/volunteer',
  partner: '/contact',
  'take-a-stall': '/get-involved/take-a-stall',
}

const involvementContent = data as InvolvementContent

export const involvementIntro = involvementContent.intro
export const involvementItems: InvolvementItem[] = involvementContent.items.map(
  (item) => ({
    ...item,
    ctaTo: involvementRoutes[item.slug] ?? '/get-involved',
  }),
)

export function getInvolvementItem(slug: string | undefined): InvolvementItem | undefined {
  return involvementItems.find((item) => item.slug === slug)
}
