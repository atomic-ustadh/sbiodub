import { useEffect } from 'react'

const SITE_NAME = 'Leadership Course Abuja'
const SITE_DESCRIPTION =
  'Leadership Course Abuja (LCA) empowers the next generation of Muslim leaders through faith, community, and service.'
const SITE_TITLE = `${SITE_NAME} | Empowering the Next Generation of Muslim Leaders`
const DEFAULT_IMAGE = '/media/about/journey.png'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function absoluteUrl(pathOrUrl: string, origin: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${origin}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

export default function Seo({
  title,
  description = SITE_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE
    const url = `${window.location.origin}${window.location.pathname}`
    const imageUrl = absoluteUrl(image, window.location.origin)

    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:url', url)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)
    upsertLink('canonical', url)
  }, [title, description, image, type, noindex])

  return null
}
