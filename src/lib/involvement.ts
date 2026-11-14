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
  sections: InvolvementSection[]
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
      sections: [
        {
          title: 'Why take a stall',
          body: 'Our events bring together young Muslims, professionals and families in a welcoming environment. A stall gives your business direct access to a loyal, engaged audience.',
        },
        {
          title: 'What you can offer',
          body: 'Stalls are suitable for a wide range of businesses and initiatives.',
          list: [
            'Food, fashion and lifestyle products',
            'Books, art and creative goods',
            'Professional and financial services',
            'Community and education initiatives',
          ],
        },
        {
          title: 'How to apply',
          body: 'Stall spaces are limited and allocated on a first-come basis. We will confirm availability, fees and event details when you apply.',
        },
      ],
    },
  },
]

export function getInvolvementItem(slug: string | undefined): InvolvementItem | undefined {
  return involvementItems.find((item) => item.slug === slug)
}
