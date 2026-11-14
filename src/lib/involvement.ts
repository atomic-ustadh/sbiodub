export interface InvolvementSection {
  title: string
  body: string
  list?: string[]
}

export interface InvolvementDetail {
  title: string
  description: string
  sections: InvolvementSection[]
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
      sections: [
        {
          title: 'Why volunteer with LCA?',
          body: 'Volunteering with LCA is an opportunity to invest in the next generation while growing your own skills, network and sense of purpose. You will work alongside a committed team that values faith, excellence and service.',
        },
        {
          title: 'Ways you can serve',
          body: 'We match volunteers with roles that fit their skills and availability.',
          list: [
            'Mentor or facilitate a session',
            'Support events and logistics',
            'Photography, design and social media',
            'Outreach, hospitality and administration',
          ],
        },
        {
          title: 'What to expect',
          body: 'Whether you can give a few hours at an event or commit to a longer programme, your contribution matters. We will help you find a role where you can serve confidently and make a real difference.',
        },
      ],
    },
  },
  {
    slug: 'partner',
    icon: 'handshake',
    title: 'Partner',
    summary:
      'Work with us on programmes, events and initiatives that create lasting impact for young Muslims.',
    ctaLabel: 'Partner With Us',
    ctaTo: '/get-involved/partner',
    detail: {
      title: 'Partner With Us',
      description:
        'Collaborate with LCA on programmes and events that serve young people and strengthen our community.',
      sections: [
        {
          title: 'Who we partner with',
          body: 'We work with organisations that share our commitment to faith, excellence and service.',
          list: [
            'Schools and educational institutions',
            'Mosques and community organisations',
            'Businesses and professional networks',
            'Non-profits and development partners',
          ],
        },
        {
          title: 'What partnership looks like',
          body: 'We build partnerships around shared goals: co-hosting programmes, sharing expertise, reaching new communities and creating opportunities for young Muslims.',
        },
        {
          title: 'Start a conversation',
          body: 'Tell us about your organisation and the impact you would like to create. Together we can shape a partnership that is practical, respectful and lasting.',
        },
      ],
    },
  },
  {
    slug: 'sponsor',
    icon: 'diamond',
    title: 'Sponsor',
    summary:
      'Fund a programme, event or resource and help us reach more young people across Nigeria.',
    ctaLabel: 'Become a Sponsor',
    ctaTo: '/get-involved/sponsor',
    detail: {
      title: 'Sponsor Our Work',
      description:
        'Directly support the programmes, events and resources that equip young Muslims to lead.',
      sections: [
        {
          title: 'Where your sponsorship goes',
          body: 'Sponsorship gives us the confidence to plan and deliver meaningful work.',
          list: [
            'Leadership programmes and workshops',
            'Events and community gatherings',
            'Learning resources and mentorship',
            'Outreach and charity initiatives',
          ],
        },
        {
          title: 'Recognition and reporting',
          body: 'We work with sponsors to agree recognition that fits their goals and provide clear reporting on how funds were used.',
        },
        {
          title: 'Make it meaningful',
          body: 'A sponsorship can be one-off or ongoing. Whatever the scale, your support helps us reach more young people and deliver programmes with excellence.',
        },
      ],
    },
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
