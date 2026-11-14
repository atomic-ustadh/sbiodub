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

export interface InvolvementItem {
  slug: string
  icon: string
  title: string
  summary: string
  ctaLabel: string
  ctaTo: string
  detail?: InvolvementDetail
}

export interface InvolvementContent {
  intro: {
    eyebrow: string
    title: string
    description: string
  }
  items: InvolvementItem[]
}

const involvementContent = data as InvolvementContent

export const involvementIntro = involvementContent.intro
export const involvementItems = involvementContent.items

export function getInvolvementItem(slug: string | undefined): InvolvementItem | undefined {
  return involvementItems.find((item) => item.slug === slug)
}
