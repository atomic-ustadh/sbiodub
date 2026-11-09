import aboutData from "../content/about.json"
import donateData from "../content/donate.json"

export type PostType = "Guide" | "Article" | "Video"

export type PostCategory =
  | "Faith & Spirit"
  | "Professional Skills"
  | "Mental Wellness"
  | "Community Action"

export interface Post {
  slug: string
  title: string
  category: PostCategory
  type: PostType
  excerpt: string
  content: string
  author: string
  date: string
  featured: boolean
}

export interface Testimonial {
  slug: string
  name: string
  title: string
  quote: string
  image: string
  order: number
}

export interface LeadershipProfile {
  slug: string
  name: string
  role: string
  description: string
  image: string
  order: number
}

export interface FaqItem {
  slug: string
  question: string
  answer: string
  order: number
}

export interface LegalPage {
  slug: string
  title: string
  lastUpdated: string
  content: string
}

export interface DonationDestination {
  label: string
  description: string
}

export interface DonationFaq {
  question: string
  answer: string
}

export interface DonationPageContent {
  bankName: string
  accountName: string
  accountNumber: string
  whatsappNumber: string
  quote: string
  quoteAuthor: string
  quoteRole: string
  destinations: DonationDestination[]
  faqs: DonationFaq[]
}

export type AboutPillarStyle = "default" | "primary" | "wide" | "full"

export interface AboutPillar {
  icon: string
  title: string
  description: string
  style: AboutPillarStyle
  image?: string
}

export interface AboutPageContent {
  journeyEyebrow: string
  journeyTitle: string
  journeyImage: string
  journeyContent: string
  pillarsTitle: string
  pillarsIntro: string
  pillars: AboutPillar[]
}

export type EventCategory = "Educational" | "Social" | "Sports" | "Spiritual"

export interface CommunityEvent {
  id: string
  img: string
  category: EventCategory
  date: string
  time: string
  title: string
  desc: string
  location: string
}

const POST_CATEGORIES: PostCategory[] = [
  "Faith & Spirit",
  "Professional Skills",
  "Mental Wellness",
  "Community Action",
]

const POST_TYPES: PostType[] = ["Guide", "Article", "Video"]

const EVENT_CATEGORIES: EventCategory[] = [
  "Educational",
  "Social",
  "Sports",
  "Spiritual",
]

type RawRecord = Record<string, unknown>

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]

function isRecord(value: unknown): value is RawRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function slugFromPath(filePath: string): string {
  const filename = filePath.split("/").pop() ?? filePath
  return filename.replace(/\.json$/i, "")
}

function requireString(
  record: RawRecord,
  key: string,
  context: string,
): string {
  const value = record[key]
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${context}: "${key}" must be a non-empty string`)
  }
  return value
}

function requireEnum<T extends string>(
  record: RawRecord,
  key: string,
  allowed: readonly T[],
  context: string,
): T {
  const value = record[key]
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw new Error(
      `${context}: "${key}" must be one of ${allowed.map((item) => `"${item}"`).join(", ")}`,
    )
  }
  return value as T
}

function requireDate(record: RawRecord, key: string, context: string): string {
  const value = requireString(record, key, context)
  if (!ISO_DATE.test(value)) {
    throw new Error(`${context}: "${key}" must use the YYYY-MM-DD format`)
  }
  return value
}

function toPost(filePath: string, value: unknown): Post {
  const context = `src/content/resources/${slugFromPath(filePath)}.json`
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  const featured = value.featured
  if (typeof featured !== "boolean") {
    throw new Error(`${context}: "featured" must be true or false`)
  }
  return {
    slug: slugFromPath(filePath),
    title: requireString(value, "title", context),
    category: requireEnum(value, "category", POST_CATEGORIES, context),
    type: requireEnum(value, "type", POST_TYPES, context),
    excerpt: requireString(value, "excerpt", context),
    content: requireString(value, "content", context),
    author: requireString(value, "author", context),
    date: requireDate(value, "date", context),
    featured,
  }
}

function toTestimonial(filePath: string, value: unknown): Testimonial {
  const context = `src/content/testimonials/${slugFromPath(filePath)}.json`
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  const order = value.order
  if (typeof order !== "number" || !Number.isFinite(order)) {
    throw new Error(`${context}: "order" must be a number`)
  }
  return {
    slug: slugFromPath(filePath),
    name: requireString(value, "name", context),
    title: requireString(value, "title", context),
    quote: requireString(value, "quote", context),
    image: requireString(value, "image", context),
    order,
  }
}

function toLeadershipProfile(
  filePath: string,
  value: unknown,
): LeadershipProfile {
  const context = `src/content/leadership/${slugFromPath(filePath)}.json`
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  const order = value.order
  if (typeof order !== "number" || !Number.isFinite(order)) {
    throw new Error(`${context}: "order" must be a number`)
  }
  return {
    slug: slugFromPath(filePath),
    name: requireString(value, "name", context),
    role: requireString(value, "role", context),
    description: requireString(value, "description", context),
    image: requireString(value, "image", context),
    order,
  }
}

function toFaqItem(filePath: string, value: unknown): FaqItem {
  const context = `src/content/faq/${slugFromPath(filePath)}.json`
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  const order = value.order
  if (typeof order !== "number" || !Number.isFinite(order)) {
    throw new Error(`${context}: "order" must be a number`)
  }
  return {
    slug: slugFromPath(filePath),
    question: requireString(value, "question", context),
    answer: requireString(value, "answer", context),
    order,
  }
}

function toLegalPage(filePath: string, value: unknown): LegalPage {
  const context = `src/content/legal/${slugFromPath(filePath)}.json`
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  return {
    slug: requireString(value, "slug", context),
    title: requireString(value, "title", context),
    lastUpdated: requireDate(value, "lastUpdated", context),
    content: requireString(value, "content", context),
  }
}

function requireArray(
  record: RawRecord,
  key: string,
  context: string,
): unknown[] {
  const value = record[key]
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${context}: "${key}" must be a non-empty array`)
  }
  return value
}

function toDonationDestination(
  value: unknown,
  context: string,
): DonationDestination {
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  return {
    label: requireString(value, "label", context),
    description: requireString(value, "description", context),
  }
}

function toDonationFaq(value: unknown, context: string): DonationFaq {
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  return {
    question: requireString(value, "question", context),
    answer: requireString(value, "answer", context),
  }
}

function toDonationPage(value: unknown): DonationPageContent {
  const context = "src/content/donate.json"
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  return {
    bankName: requireString(value, "bankName", context),
    accountName: requireString(value, "accountName", context),
    accountNumber: requireString(value, "accountNumber", context),
    whatsappNumber: requireString(value, "whatsappNumber", context),
    quote: requireString(value, "quote", context),
    quoteAuthor: requireString(value, "quoteAuthor", context),
    quoteRole: requireString(value, "quoteRole", context),
    destinations: requireArray(value, "destinations", context).map(
      (item, index) =>
        toDonationDestination(item, `${context}: destinations[${index}]`),
    ),
    faqs: requireArray(value, "faqs", context).map((item, index) =>
      toDonationFaq(item, `${context}: faqs[${index}]`),
    ),
  }
}

const ABOUT_PILLAR_STYLES: AboutPillarStyle[] = [
  "default",
  "primary",
  "wide",
  "full",
]

function toAboutPillar(value: unknown, context: string): AboutPillar {
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  const image = value.image
  if (image !== undefined && image !== null && typeof image !== "string") {
    throw new Error(`${context}: "image" must be a string`)
  }
  return {
    icon: requireString(value, "icon", context),
    title: requireString(value, "title", context),
    description: requireString(value, "description", context),
    style: requireEnum(value, "style", ABOUT_PILLAR_STYLES, context),
    image:
      typeof image === "string" && image.trim() !== "" ? image : undefined,
  }
}

function toAboutPage(value: unknown): AboutPageContent {
  const context = "src/content/about.json"
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  return {
    journeyEyebrow: requireString(value, "journeyEyebrow", context),
    journeyTitle: requireString(value, "journeyTitle", context),
    journeyImage: requireString(value, "journeyImage", context),
    journeyContent: requireString(value, "journeyContent", context),
    pillarsTitle: requireString(value, "pillarsTitle", context),
    pillarsIntro: requireString(value, "pillarsIntro", context),
    pillars: requireArray(value, "pillars", context).map((item, index) =>
      toAboutPillar(item, `${context}: pillars[${index}]`),
    ),
  }
}

function toEvent(filePath: string, value: unknown): CommunityEvent {
  const context = `src/content/events/${slugFromPath(filePath)}.json`
  if (!isRecord(value)) {
    throw new Error(`${context}: expected a JSON object`)
  }
  const slug = slugFromPath(filePath)
  const explicitId = value.id
  return {
    id:
      typeof explicitId === "string" && explicitId.trim() !== ""
        ? explicitId
        : slug,
    img: requireString(value, "image", context),
    category: requireEnum(value, "category", EVENT_CATEGORIES, context),
    date: requireDate(value, "date", context),
    time: requireString(value, "time", context),
    title: requireString(value, "title", context),
    desc: requireString(value, "description", context),
    location: requireString(value, "location", context),
  }
}

const resourceModules = import.meta.glob("../content/resources/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>

const eventModules = import.meta.glob("../content/events/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>

const testimonialModules = import.meta.glob("../content/testimonials/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>

const leadershipModules = import.meta.glob("../content/leadership/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>

const faqModules = import.meta.glob("../content/faq/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>

const legalModules = import.meta.glob("../content/legal/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>

export const posts: Post[] = Object.entries(resourceModules)
  .map(([filePath, value]) => toPost(filePath, value))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

export const events: CommunityEvent[] = Object.entries(eventModules)
  .map(([filePath, value]) => toEvent(filePath, value))
  .sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title))

export const testimonials: Testimonial[] = Object.entries(testimonialModules)
  .map(([filePath, value]) => toTestimonial(filePath, value))
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))

export const leadershipProfiles: LeadershipProfile[] = Object.entries(
  leadershipModules,
)
  .map(([filePath, value]) => toLeadershipProfile(filePath, value))
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))

export const faqItems: FaqItem[] = Object.entries(faqModules)
  .map(([filePath, value]) => toFaqItem(filePath, value))
  .sort((a, b) => a.order - b.order || a.question.localeCompare(b.question))

export const legalPages: LegalPage[] = Object.entries(legalModules)
  .map(([filePath, value]) => toLegalPage(filePath, value))
  .sort((a, b) => a.title.localeCompare(b.title))

export const donationPage = toDonationPage(donateData)

export const aboutPage = toAboutPage(aboutData)

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getLegalPageBySlug(slug: string): LegalPage | undefined {
  return legalPages.find((page) => page.slug === slug)
}

export function formatContentDate(value: string): string {
  const match = value.match(ISO_DATE)
  if (!match) return value
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  if (month < 1 || month > 12) return value
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

export function getTodayIsoDate(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}
