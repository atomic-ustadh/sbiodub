import { createServer } from 'node:http'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const distDir = path.join(root, 'dist')
const contentDir = path.join(root, 'src', 'content')

const STATIC_ROUTES = [
  '/',
  '/about',
  '/events',
  '/get-involved',
  '/resources',
  '/faq',
  '/contact',
  '/donate',
  '/privacy',
  '/terms',
]

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function jsonFiles(dir) {
  return readdir(dir).then((files) => files.filter((file) => file.endsWith('.json')))
}

async function buildRoutes() {
  const resourceFiles = await jsonFiles(path.join(contentDir, 'resources'))
  const involvementFiles = await jsonFiles(path.join(contentDir, 'get-involved'))

  const involvementSlugs = []
  for (const file of involvementFiles) {
    const data = JSON.parse(await readFile(path.join(contentDir, 'get-involved', file), 'utf8'))
    if (data.detail) involvementSlugs.push(file.replace(/\.json$/, ''))
  }

  return [...new Set([
    ...STATIC_ROUTES,
    ...resourceFiles.map((file) => `/resources/${file.replace(/\.json$/, '')}`),
    ...involvementSlugs.map((slug) => `/get-involved/${slug}`),
  ])]
}

function outputPaths(route) {
  const clean = route === '/' ? '' : route.replace(/^\//, '')
  if (!clean) return [path.join(distDir, 'index.html')]
  return [
    path.join(distDir, `${clean}.html`),
    path.join(distDir, clean, 'index.html'),
  ]
}

function resolveStaticFile(urlPath) {
  const decoded = decodeURIComponent(urlPath)
  const candidate = path.join(distDir, decoded)

  if (decoded.endsWith('/')) {
    const indexFile = path.join(candidate, 'index.html')
    if (existsSync(indexFile)) return indexFile
  } else {
    if (existsSync(candidate) && !existsSync(candidate + path.sep)) return candidate
    if (existsSync(candidate + '.html')) return candidate + '.html'
    const indexFile = path.join(candidate, 'index.html')
    if (existsSync(indexFile)) return indexFile
  }

  return path.join(distDir, 'index.html')
}

function startServer() {
  const server = createServer(async (request, response) => {
    try {
      const urlPath = new URL(request.url ?? '/', 'http://127.0.0.1').pathname
      const filePath = resolveStaticFile(urlPath)
      const body = await readFile(filePath)
      response.writeHead(200, {
        'Content-Type': MIME_TYPES[path.extname(filePath)] ?? 'application/octet-stream',
      })
      response.end(body)
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Not found')
    }
  })

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server))
  })
}

async function prerenderRoute(page, baseUrl, route, siteUrl) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForFunction(
    () => {
      const rootElement = document.querySelector('#root')
      return Boolean(rootElement && rootElement.children.length > 0)
    },
    { timeout: 30000 },
  )
  await page.waitForFunction(() => document.title.includes('|'), { timeout: 5000 }).catch(() => {})
  await new Promise((resolve) => setTimeout(resolve, 300))

  const html = await page.evaluate(() => `<!doctype html>\n${document.documentElement.outerHTML}`)
  const output = html.replaceAll(baseUrl, siteUrl)
  for (const filePath of outputPaths(route)) {
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, output)
  }
}

async function main() {
  if (!existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found. Run vite build before prerendering.')
  }

  const shell = await readFile(path.join(distDir, 'index.html'))
  await writeFile(path.join(distDir, '_spa.html'), shell)

  if (process.env.PRERENDER === 'false') {
    console.log('Prerender skipped (PRERENDER=false).')
    return
  }

  const routes = await buildRoutes()
  const server = await startServer()
  const { port } = server.address()
  const baseUrl = `http://127.0.0.1:${port}`
  const siteUrl = (process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || '').replace(/\/$/, '')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 900 })

    for (const route of routes) {
      try {
        await prerenderRoute(page, baseUrl, route, siteUrl)
        console.log(`Prerendered ${route}`)
      } catch (error) {
        console.error(`Failed to prerender ${route}:`, error)
        process.exitCode = 1
      }
    }
  } finally {
    await browser.close()
    await new Promise((resolve) => server.close(resolve))
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
