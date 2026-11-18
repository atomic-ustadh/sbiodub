# Content and CMS Schema Reference

This document describes every CMS-managed content source in the repository, how
it is validated and loaded, and which fields are coupled to code. It is the
Stage 5 reference for editors (Pages CMS) and developers changing content shapes.

For the high-level data flow, see [`ARCHITECTURE.md`](./ARCHITECTURE.md). For
product setup and environment variables, see [`../README.md`](../README.md).

## Source of truth and build pipeline

- Editable content lives in `src/content/**/*.json`; media lives in
  `public/media/` and is served from `/media/...`.
- Pages CMS reads/writes those files using the schema in `../.pages.yml`.
- Content is imported at **build time** (`import.meta.glob(..., { eager: true })`
  or static JSON imports). There is no runtime CMS fetch.
- Saving in Pages CMS commits to Git; the change appears only after a successful
  Netlify rebuild/deploy (and locally after pulling + restarting/HMR).
- Rich-text fields contain trusted HTML and are rendered with
  `dangerouslySetInnerHTML`. Do not paste untrusted HTML into the CMS.

| Content | Loader / export | Primary consumers |
| --- | --- | --- |
| `resources/*.json` | `src/lib/content.ts` → `posts` | `Resources`, `BlogPost` |
| `events/*.json` | `src/lib/content.ts` → `events` | `Events`, home upcoming events |
| `testimonials/*.json` | `src/lib/content.ts` → `testimonials` | home carousel |
| `leadership/*.json` | `src/lib/content.ts` → `leadershipProfiles` | `about` team grid |
| `faq/*.json` | `src/lib/content.ts` → `faqItems` | `Faq` |
| `legal/*.json` | `src/lib/content.ts` → `legalPages` | `LegalPageContent` via `/privacy`, `/terms` |
| `about.json` | `src/lib/content.ts` → `aboutPage` | `about` |
| `donate.json` | `src/lib/content.ts` → `donationPage` | `Donate`, payment metadata |
| `contact.json` | direct import in `Contact.tsx` | `Contact` |
| `get-involved-intro.json` | `src/lib/involvement.ts` → `involvementIntro` | `GetInvolved` |
| `get-involved/*.json` | `src/lib/involvement.ts` → `involvementItems` | `GetInvolved`, `InvolvementDetail`, generated routes |

Validation is not uniform:

- `src/lib/content.ts` performs strict validation and throws a contextual error
  during build/dev when a required field is missing or malformed.
- `src/lib/involvement.ts` casts loaded JSON to its types and does **not** validate
  at runtime.
- `Contact.tsx` casts `contact.json` to a local interface and does **not** validate.
- `../.pages.yml` required/select constraints are the editor-side guardrail; they
  are not a substitute for the loader checks above.

## Shared conventions

- Each collection item is a JSON object; filenames are safe, lowercase, and
  hyphenated (Pages CMS `rename: safe`).
- Dates use `YYYY-MM-DD`; date-only comparisons are string comparisons.
- Display order uses a numeric `order`; lower numbers appear first unless noted.
- Image fields store public paths beginning with `/media/...`.
- Field names are also the CMS field names; `.pages.yml` `name` must match the
  JSON property exactly.
- Enum values are duplicated in `.pages.yml`, `src/lib/content.ts`, and sometimes
  page UI. Changing an enum requires updating all three, plus existing JSON.

## Collections

### Resources (`src/content/resources`)

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `title` | string | yes | non-empty |
| `category` | enum | yes | `Faith & Spirit`, `Professional Skills`, `Mental Wellness`, `Community Action` |
| `type` | enum | yes | `Guide`, `Article`, `Video` |
| `excerpt` | string | yes | non-empty; CMS caps at 300 chars |
| `content` | HTML | yes | non-empty; trusted rich text |
| `author` | string | yes | non-empty |
| `date` | date | yes | `YYYY-MM-DD` |
| `featured` | boolean | yes | exactly `true`/`false` |

- **Slug/URL:** the filename without `.json` becomes `post.slug` and the
  `/resources/:slug` URL. Renaming a file changes its URL.
- **Ordering:** exported newest-first by `date`, then by `title`.
- **Featured:** the first `featured: true` post is promoted on `Resources`;
  marked `required` in `.pages.yml` so the loader always receives a boolean.
- **Code coupling:** `Resources.tsx` filter labels and `BlogPost.tsx` icons are
  code-owned maps keyed by `category`/`type`; an unknown enum fails the build.

### Events (`src/content/events`)

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `id` | string | no | Stable identifier; defaults to the filename slug |
| `title` | string | yes | non-empty |
| `category` | enum | yes | `Educational`, `Social`, `Sports`, `Spiritual` |
| `image` | string | yes | non-empty; normally `/media/...` |
| `date` | date | yes | `YYYY-MM-DD` |
| `time` | string | yes | display string (e.g. `10:00 AM`) |
| `location` | string | yes | non-empty |
| `description` | string | yes | non-empty |

- **ID stability:** RSVPs are keyed by `id`. Once users have RSVP'd, do not change
  it. New events may leave `id` empty; the filename is used as the fallback.
- **Field mapping:** the loader normalizes `image` → `img` and `description` →
  `desc` for the app's `CommunityEvent` type.
- **Ordering:** exported earliest-first by `date`, then by `title`.
- **Upcoming/past:** pages split on `getTodayIsoDate()` in the **browser's local
  timezone**, comparing date-only strings (not event times).
- **Code coupling:** `Events.tsx` category filters and color maps rely on the
  enum values above.

### Testimonials (`src/content/testimonials`)

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `name` | string | yes | non-empty |
| `title` | string | yes | subtitle, e.g. `Member since 2021` |
| `quote` | text | yes | non-empty |
| `image` | string | yes | non-empty; normally `/media/...` |
| `order` | number | yes | finite number; lower first |

- **Slug:** derived from the filename (not exposed in URLs).
- **Ordering:** `order` ascending, then `name`.
- **Home carousel** renders the first testimonial and wraps through the sorted list.

### Leadership (`src/content/leadership`)

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `name` | string | yes | non-empty |
| `role` | string | yes | non-empty |
| `description` | string | yes | non-empty |
| `image` | string | yes | non-empty; normally `/media/...` |
| `order` | number | yes | finite number; lower first |

- **Slug:** filename-derived (used as the React key).
- **Ordering:** `order` ascending, then `name`.
- Rendered on the About page under `#team`.

### FAQ (`src/content/faq`)

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `question` | string | yes | non-empty |
| `answer` | HTML | yes | non-empty; trusted rich text |
| `order` | number | yes | finite number; lower first |

- **Slug:** filename-derived.
- **Ordering:** `order` ascending, then `question`.
- An empty collection is valid: the FAQ page shows an empty state. The directory
  currently contains only `.gitkeep`.

### Legal (`src/content/legal`)

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `title` | string | yes | non-empty |
| `slug` | string | yes | must match `^(privacy|terms)$` |
| `lastUpdated` | date | yes | `YYYY-MM-DD` |
| `content` | HTML | yes | non-empty; trusted rich text |

- **Route coupling:** `/privacy` and `/terms` are hardcoded in `App.tsx` and pass
  `slug="privacy"` / `slug="terms"` to `LegalPageContent`. The CMS `slug` field —
  not the filename — selects the record. Adding a new legal page also requires a
  new route.
- **Filename:** Pages CMS names files from `title` (e.g.
  `privacy-policy.json`); this does not affect the URL.
- **Ordering:** exported by `title` (not currently used for navigation).

### Get Involved items (`src/content/get-involved`)

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `slug` | string | yes | must match a key in `involvementRoutes`; drives detail URLs |
| `icon` | string | yes | Material Symbols name |
| `title` | string | yes | non-empty |
| `summary` | string | yes | non-empty |
| `ctaLabel` | string | yes | button text only |
| `order` | number | yes | lower first |
| `detail` | object | no | presence generates a `get-involved/:slug` route |
| `detail.title` | string | yes* | required when `detail` exists |
| `detail.description` | string | yes* | required when `detail` exists |
| `detail.applications` | object | no | Take-a-Stall window config |
| `detail.steps[]` | object | no | `{ title, body }` |
| `detail.sections[]` | object | no | `{ title, body, list? }` |

\* Editor-side requirement; `involvement.ts` does not validate.

- **Code-owned links:** button destinations (`ctaTo`) live in
  `involvementRoutes` (`src/lib/involvement.ts`), keyed by `slug`:
  `give` → `/donate`, `volunteer` → `/get-involved/volunteer`,
  `partner` → `/contact`, `take-a-stall` → `/get-involved/take-a-stall`.
  Unknown slugs fall back to `/get-involved`.
- **Route generation:** only items with `detail` get a generated detail route.
  Renaming `slug` breaks both the route and the `ctaTo` lookup.
- **`applications` window** (`detail.applications`):
  - `mode`: `scheduled` (default), `open`, or `closed`.
  - `opensAt` / `closesAt`: inclusive `YYYY-MM-DD` in `timezone` (default
    `Africa/Lagos`).
  - Missing `applications` = open (legacy behavior); scheduled mode with missing
    or malformed dates = closed; an invalid timezone falls back to
    `Africa/Lagos`.
  - `notYetOpenMessage` / `closedMessage` override the built-in copy.
  - This window is evaluated **at request/render time**, so availability changes
    without a rebuild.
- `volunteer` renders `VolunteerForm`; `take-a-stall` renders `StallForm` only
  while the window is open.

## Single-file pages

### About (`src/content/about.json`)

| Field | Type | Required |
| --- | --- | --- |
| `journeyEyebrow`, `journeyTitle` | string | yes |
| `journeyImage` | string | yes |
| `journeyContent` | HTML | yes |
| `purposeEyebrow`, `purposeTitle`, `purposeIntro` | string | yes |
| `missionTitle`, `missionContent` | string/HTML | yes |
| `visionTitle`, `visionContent` | string/HTML | yes |
| `pillarsTitle`, `pillarsIntro` | string | yes |
| `pillars[]` | object list | yes, non-empty |
| `pillars[].icon`, `.title`, `.description` | string | yes |
| `pillars[].style` | enum | yes: `default`, `primary`, `wide`, `full` |
| `pillars[].image` | string | no |

- `pillarStyles` in `about.tsx` maps each `style` to Tailwind border/layout
  classes; unknown styles are rejected by the loader.
- `journeyContent`, `missionContent`, `visionContent` are trusted HTML.

### Donate (`src/content/donate.json`)

| Field | Type | Required |
| --- | --- | --- |
| `bankName`, `accountName`, `accountNumber` | string | yes |
| `whatsappNumber` | string | yes |
| `quote`, `quoteAuthor`, `quoteRole` | string | yes |
| `destinations[]` | object list | yes, non-empty |
| `destinations[].label`, `.description` | string | yes |
| `destinations[].kind` | enum | yes: `donation`, `payment` |
| `faqs[]` | object list | yes, non-empty |
| `faqs[].question`, `.answer` | string | yes |

- **`whatsappNumber`:** store the international number; the page strips
  non-digits before building `https://wa.me/...`. A value starting with
  `REPLACE_WITH_` disables the WhatsApp button.
- **`kind`:** written to the donation record as `type`; `payment` means a
  programme/event payment (shown in history), `donation` is a charitable gift.
- **`destinations[0].label`** is the default selected allocation; the page falls
  back to `General Fund` only if none exist (the loader rejects an empty list).
- `faqs` are rendered as plain text (not HTML).

### Contact (`src/content/contact.json`)

Shape: `hero { eyebrow, title, description }`, `contactDetails[] { icon, label,
lines[] }`, `emailHeading`, `emailContacts[] { label, email }`, and
`form { title, description, enquiryOptions[], messagePlaceholder, submitLabel }`.

- Loaded directly by `Contact.tsx` with a local `ContactContent` interface; there
  is no runtime validation for this file.
- The enquiry form is UI-only (`preventDefault`); it does not send email or post
  to a backend.

### Get Involved intro (`src/content/get-involved-intro.json`)

`eyebrow`, `title`, `description` (all required strings). Cast directly in
`involvement.ts` without runtime validation.

## Code-coupled fields and invariants

1. **Filenames are URLs/IDs** for resources (URL slug) and events (fallback id).
   Rename only when a URL change is intended.
2. **Event `id` is immutable** once RSVPs exist; RSVP rows key on it.
3. **Get Involved `slug` must match `involvementRoutes`** in
   `src/lib/involvement.ts`; the CMS does not own button destinations.
4. **Legal `slug` must remain `privacy` or `terms`** because routes and
   `LegalPageContent` calls are hardcoded.
5. **Enums are shared** across `.pages.yml`, `src/lib/content.ts`, and page UI
   maps. Update all sites together.
6. **Donation `kind`** is persisted as the history `type`.
7. **Stall application dates** are inclusive and evaluated in the configured
   timezone at render time; no rebuild is needed when the window flips.
8. **Media paths** are public `/media/...` URLs; Pages CMS writes uploads under
   `public/media/` (`input: public/media`, `output: /media`).

## Checklist: adding or changing content

1. Add/edit the JSON (or use Pages CMS) and keep field names exactly as above.
2. For collections, choose a filename that matches the intended slug/id.
3. Use `YYYY-MM-DD` for dates and a Material Symbols name for `icon`.
4. Upload images through Pages CMS so they land in `public/media/...`, then
   reference them as `/media/...`.
5. For enumerations, verify the value exists in `.pages.yml`, the loader, and any
   page-level maps before saving.
6. Run `npm run typecheck` and `npm run build`; the strict loaders fail the build
   on invalid content (except `contact.json` and get-involved, which are not
   runtime-validated).
7. Commit and deploy; content is not live until the rebuild completes.

## Content review notes (not schema issues)

- `src/content/get-involved/take-a-stall.json` has `opensAt: 2026-11-15`, while
  its `notYetOpenMessage` says applications open on 20 November 2026. Align the
  dates or the copy when the intended opening date is confirmed.
- `src/content/donate.json` FAQ answers still describe bank transfer as the only
  method; the page now supports Paystack online payment as well. Update the copy
  when convenient.
- `donate.json` currently contains placeholder bank details
  (`accountNumber: "0000000001"`, `whatsappNumber: "2348012345678"`); replace
  before relying on the manual-transfer flow in production.
