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

export const involvementIntro = {
  eyebrow: 'Ways to Serve',
  title: 'Get Involved',
  description:
    'There is a place for everyone in this work. Whether you give, serve, partner, sponsor or showcase your business, your contribution helps shape the next generation of Muslim leaders.',
}

export const involvementItems: InvolvementItem[] = [
  {
    slug: 'give',
    icon: 'volunteer_activism',
    title: 'Give',
    summary:
      'Support our programmes with a one-off or regular gift. Every donation funds mentorship, events and outreach.',
    ctaLabel: 'Give Now',
    ctaTo: '/donate',
  },
  {
    slug: 'volunteer',
    icon: 'groups',
    title: 'Volunteer',
    summary:
      'Share your time, skills and experience with young people who are eager to learn and grow.',
    ctaLabel: 'Explore Volunteering',
    ctaTo: '/get-involved/volunteer',
    detail: {
      title: 'Volunteer With Us',
      description:
        'From mentoring and event support to media and logistics, there are many ways to serve.',
      steps: [
        {
          title: 'Register',
          body: 'Fill in the form below. It takes about two minutes.',
        },
        {
          title: 'We confirm',
          body: 'Our Welfare & Logistics unit reviews and confirms you on the register.',
        },
        {
          title: 'You are deployed',
          body: 'When a duty matches your availability we contact you with the date, place and who to report to.',
        },
        {
          title: 'On the day',
          body: 'Your team lead checks you in. Some volunteers also work the gate, scanning tickets.',
        },
      ],
      sections: [
        {
          title: 'Why volunteer with LCA?',
          body: 'Volunteering with LCA is an opportunity to invest in the next generation while growing your own skills, network and sense of purpose. You will work alongside a committed team that values faith, excellence and service. Whether you can give a few hours at an event or commit to a longer programme, your contribution matters. We will help you find a role where you can serve confidently and make a real difference.',
        },
      ],
    },
  },
  {
    slug: 'partner',
    icon: 'handshake',
    title: 'Partner & Sponsor',
    summary:
      'Work with us on programmes and events that create lasting impact, or sponsor our work directly.',
    ctaLabel: 'Partner or Sponsor',
    ctaTo: '/contact',
  },
  {
    slug: 'take-a-stall',
    icon: 'storefront',
    title: 'Take a Stall',
    summary:
      'Showcase your business or products at our events and connect with a vibrant community.',
    ctaLabel: 'Reserve a Stall',
    ctaTo: '/get-involved/take-a-stall',
    detail: {
      title: 'Take a Stall at Our Events',
      description:
        'Bring your business, brand or service to an engaged community of young people and families.',
      steps: [
        {
          title: 'Apply',
          body: 'Fill in the form below. You may apply for only one stall slot.',
        },
        {
          title: 'We review',
          body: 'Our Stall Unit selects a mix of vendors that suit the event and its audience. Only selected vendors will be contacted. Please note that it may take up to three weeks after the EOI closes to receive an email.',
        },
        {
          title: 'Keep an eye on your mailbox',
          body: 'All notifications are sent only to the email address given in your application, so please check your inbox, spam and junk folders regularly.',
        },
        {
          title: 'Pay within 48 hours',
          body: 'The payment link is valid for 48 hours only. After that the stall is offered to another vendor, and any payment received after the deadline will not secure a stall — it will be treated as a charitable donation.',
        },
      ],
    },
  },
]

export function getInvolvementItem(slug: string | undefined): InvolvementItem | undefined {
  return involvementItems.find((item) => item.slug === slug)
}
