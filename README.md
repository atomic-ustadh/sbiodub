# LCA, Abuja

A web application for Leadership Course Abuja. It presents the organisation's
mission, events, resources, membership and donation pages, and gives members a
dashboard for their profile, event RSVPs and donation/payment history.

The application runs as a Vite + React single-page app on Netlify. Clerk handles
authentication, Neon Postgres stores member data (accessed through the Neon Data
API and protected by row-level security), and Netlify Functions verify and record
Paystack payments.

## Implementation Status

### Working

- **Routing and shell** — React Router with a shared site layout, standalone auth
  pages, protected member routes, responsive navigation/footer, and a custom 404.
- **Home and About** — hero, pillars, upcoming events, testimonials and leadership
  profiles, with CMS-driven content.
- **Authentication (Clerk)** — sign up, sign in, sign out, and password reset.
  Sessions are managed by Clerk; the app never stores passwords.
- **Protected member area** — `/profile`, `/history` and the legacy `/receipts`
  alias redirect logged-out users to `/login` and return them afterwards.
- **Profile dashboard** — edit name and phone, view and cancel RSVPs, open
  donation/payment history, and log out. Email is read-only (managed by Clerk).
- **Events** — five CMS events (2026–2027), category filters, grid/timeline view,
  and RSVP through a modal. RSVP requires login, is stored per user in Neon,
  prevents duplicates, and can be cancelled from the profile.
- **Resources** — four articles with category filters, a featured article, and
  article detail pages.
- **Content management** — resources, events, testimonials, leadership, FAQ, legal
  pages, Donate and About content live in `src/content/` and are edited through
  [Pages CMS](https://pagescms.org) via `.pages.yml`. Saving commits to GitHub and
  triggers a Netlify rebuild.
- **Newsletter** — `SubscribeForm` posts to a Google Form when configured, and
  falls back to Netlify Forms (the hidden form in `index.html`).
- **Online donations (Paystack)** — `/donate` supports card, bank transfer and
  USSD through Paystack Inline for signed-in and anonymous donors. Transactions
  are verified server-side by Netlify Functions and written to Neon.
- **Donation & payment history** — `/history` lists verified payments in a table
  with totals, reference, type, allocation, channel and amount. The `?donation=<id>`
  query highlights the payment that just completed.
- **Manual bank transfer** — bank details plus WhatsApp receipt confirmation remain
  available as an alternative to online payment.
- **Legal and utility pages** — CMS-driven privacy policy, terms of service and FAQ.
- **Design system** — "Emerald & Gold" tokens and utilities in `src/index.css`.

### Not implemented / limitations

- **Resource and event search** — only category filters exist.
- **Membership flow** — `/join` is a landing page; account creation and sign-in
  happen through Clerk on `/login`.
- **Transactional email** — the app itself does not send email. Paystack sends
  payment receipts, Clerk sends auth emails, and the newsletter is handled by a
  Google Form or Netlify Forms.
- **Anonymous donations are not linked to accounts.** A donation made while signed
  out is verified and stored with `user_id = null`; it will not appear in a member's
  history, and signing in later does not claim it.
- **Pages CMS edits** require a Git commit and a rebuild; content is not live
  immediately.
- **Home, Join and parts of Donate copy** still live in source files.
- **Uploaded media** lives under `public/media/` and is committed to the repository.
- **404 background** uses the relative path `../404bg.png`, which can break on
  deeper unmatched paths.
- **No automated tests, lint configuration or CI.**

## Tech Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI library |
| TypeScript | Static typing (app and Netlify Functions) |
| Vite 6 | Dev server and production build |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 (`@tailwindcss/vite`) | Styling and design tokens |
| Clerk (`@clerk/react`, `@clerk/backend`) | Authentication and session verification |
| Neon Postgres + Data API | Member data, with Postgres row-level security |
| `@neondatabase/serverless` | Server-side writes from Netlify Functions |
| Paystack Inline | Card, bank transfer and USSD payments |
| Netlify Functions | Payment verification and webhook handling |
| Pages CMS (`.pages.yml`) | Git-based content editing |
| Google Fonts | Playfair Display, Plus Jakarta Sans, Material Symbols |

## Architecture

- **Bootstrap:** `src/main.tsx` mounts React inside `ClerkProvider`, `BrowserRouter`
  and `AuthProvider`, then renders the route table in `src/App.tsx`.
- **Layouts:** most pages render inside `SiteLayout` (`Navbar` + `Outlet` + `Footer`
  + floating FAQ link). Auth pages and the 404 render standalone.
- **Route guards:** `ProtectedRoute` wraps `/profile` and `/history` (plus the
  legacy `/receipts` alias), redirecting guests to `/login` with a return path.
- **Client state:** `AuthContext` (`src/context/AuthContext.tsx`) bridges the Clerk
  user to app data: profile updates, RSVPs and donations. RSVP reads/writes go
  through the Neon Data API; donation writes go through Netlify Functions.
- **Database:** `src/lib/neon.ts` calls the Neon Data API with a Clerk JWT from the
  `neon` template. Postgres row-level security restricts each user to their own rows.
- **Server:** `netlify/functions/paystack-verify.ts` verifies a transaction and
  records it; `paystack-webhook.ts` handles `charge.success` idempotently. Shared
  helpers live in `netlify/lib/`.
- **Content:** JSON files under `src/content/`, loaded and validated by
  `src/lib/content.ts` at build time.
- **Styling:** Tailwind theme tokens and utilities live in `src/index.css`,
  following `design.md` ("Emerald & Gold").
- **Deployment:** Netlify builds with Vite, publishes `dist/`, serves the API
  rewrites, and falls back to `index.html` for client-side routes.

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A Clerk application
- A Neon project with the Data API enabled
- A Paystack account (test keys are enough for local development)

### Install

```bash
npm install
```

### Environment variables

Copy `.env.example` to `.env.local` (client values) and create a gitignored `.env`
for local Netlify Functions. `VITE_`-prefixed values are compiled into the public
bundle; everything else must stay server-only.

| Variable | Scope | Required | Notes |
| --- | --- | --- | --- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Client | Yes | Clerk publishable key (`pk_test_...` / `pk_live_...`) |
| `VITE_NEON_DATA_API_URL` | Client | Yes | Neon Data API base ending in `/rest/v1` |
| `VITE_PAYSTACK_PUBLIC_KEY` | Client | For online donations | Paystack public key (`pk_test_...` / `pk_live_...`) |
| `VITE_GOOGLE_FORM_ID` | Client | Optional | Google Form id for the newsletter |
| `VITE_GOOGLE_FORM_EMAIL_ENTRY` | Client | Optional | Google Form email entry id (required if the form id is set) |
| `PAYSTACK_SECRET_KEY` | Function | For online donations | Paystack secret key; also validates webhook signatures |
| `CLERK_SECRET_KEY` | Function | For signed-in donations | Verifies the caller's Clerk session token |
| `DATABASE_URL` | Function | For online donations | Neon Postgres connection string (database owner) |

Never put `PAYSTACK_SECRET_KEY`, `CLERK_SECRET_KEY` or `DATABASE_URL` behind a
`VITE_` prefix. Redeploy after changing any `VITE_` value because Vite inlines
them at build time.

### Run locally

Frontend only:

```bash
npm run dev
```

Full app including Netlify Functions (needed for online donations, which call
`/api/paystack/*`):

```bash
npx netlify-cli dev
```

Open the URL printed by Netlify Dev (typically `http://localhost:8888`), not the
raw Vite port, so relative `/api` requests reach the functions.

### Build

```bash
npm run build
npm run preview
```

`npm run build` type-checks both the app and the Netlify Functions before building
into `dist/`.

## Database Setup

1. In the Neon Console, enable the **Data API** for the branch (this creates the
   `authenticated` role used by the RLS policies).
2. Run `db/schema.sql` against that branch, either in the Neon SQL Editor or with:

   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   ```

3. Click **Refresh schema cache** on the Data API page.
4. In Clerk, create a JWT template named exactly **`neon`** with a `role` claim of
   `"authenticated"` and the default `sub` claim. `AuthContext` requests this
   template via `getToken({ template: 'neon' })`.

### Tables

| Table | Purpose | Access |
| --- | --- | --- |
| `public.rsvps` | One row per user/event RSVP | Authenticated users can select/insert/update/delete only their own rows |
| `public.donations` | Verified Paystack payments | Authenticated users can only `select` their own rows; inserts/updates happen through Netlify Functions |

`donations` stores `reference` (unique), `user_id` (nullable), `email`, `full_name`,
`phone`, `amount`, `amount_kobo`, `currency`, `type` (`donation`/`payment`),
`allocation`, `channel`, `status`, `anonymous`, `paid_at` and `created_at`.

## Authentication

- Clerk owns credentials, sessions, password reset and auth emails.
- `ProtectedRoute` is a client-side guard; the real data boundary is Postgres RLS
  keyed on `auth.user_id()` (the Clerk `sub`).
- Profile name is updated through Clerk; phone is stored in Clerk `unsafeMetadata`.
  Email is read-only.
- Development and Production are separate Clerk instances with separate users,
  keys and JWT templates.

## Online Payments (Paystack)

```
Donate page -> Paystack Inline popup
            -> POST /api/paystack/verify   (secret key verification)
            -> Netlify Function writes the verified row with DATABASE_URL
Paystack    -> POST /api/paystack/webhook  (charge.success, HMAC-verified)
```

- The browser opens Paystack Inline (`src/lib/paystack.ts`) with the public key,
  amount in kobo, a unique `reference`, and metadata (name, phone, allocation,
  type, optional Clerk user id).
- `paystack-verify` verifies the reference with Paystack, optionally validates the
  caller's Clerk token, and performs an idempotent upsert keyed on `reference`.
- `paystack-webhook` verifies `x-paystack-signature` and records successful
  payments even if the user closed the tab.
- Donations made while signed in are linked to the Clerk user and appear in
  `/history`. Anonymous donations are stored with `user_id = null`.
- Manual bank transfer plus WhatsApp confirmation remains available.

### Setup checklist

1. Run `db/schema.sql` and refresh the Data API schema cache.
2. Add the environment variables above (Netlify env for production, `.env` locally).
3. In Paystack, set the webhook URL to
   `https://<your-site>/api/paystack/webhook` and subscribe to `charge.success`.
4. Redeploy so the Inline public key is baked into the bundle.
5. Test with Paystack test keys/cards and confirm:
   - signed-in payments appear in `/history`,
   - the webhook records payments even if the tab closes,
   - duplicate webhook deliveries do not create duplicate rows.

## Editing Content with Pages CMS

Content lives in `src/content/` and is managed through
[Pages CMS](https://pagescms.org) using `.pages.yml`.

1. Sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub.
2. Install the Pages CMS GitHub App on the account that owns this repository.
3. Open the repository and select the branch you want to edit.
4. Edit resources, events, testimonials, leadership, FAQ, legal pages, Donate or
   About content and save. Pages CMS commits the JSON change to GitHub.
5. Netlify rebuilds and deploys the updated site.

### Content rules

- New resources and events are JSON files in `src/content/resources/` and
  `src/content/events/`. The filename becomes the resource slug or event fallback id.
- Keep an event's **Stable ID** unchanged once people have RSVP'd.
- Dates use `YYYY-MM-DD`.
- Donation destinations include a **Type** (`donation` or `payment`). Use `payment`
  when the money is for a programme or event; that value is written to the payment
  history.
- Event images use `/media/...` paths under `public/media/`.
- Content is compiled at build time; edits are visible only after a successful
  deploy. Pull the latest commit before running the app locally.

## Project Structure

```
.
├── index.html                 # HTML entry, fonts, hidden Netlify newsletter form
├── .env.example               # Documented client and server variables
├── .pages.yml                 # Pages CMS collections and media config
├── design.md                  # "Emerald & Gold" design system
├── netlify.toml               # Build, functions directory, API rewrites, SPA fallback
├── package.json
├── tsconfig.json              # App TypeScript config
├── tsconfig.functions.json    # Netlify Functions TypeScript config
├── vite.config.ts
├── db/
│   └── schema.sql             # Tables, grants, RLS policies
├── netlify/
│   ├── functions/
│   │   ├── paystack-verify.ts
│   │   └── paystack-webhook.ts
│   └── lib/
│       ├── clerk.ts           # Clerk token verification
│       ├── donations.ts       # Idempotent Neon upsert
│       ├── http.ts            # JSON response helper
│       └── paystack.ts        # Paystack verify API
├── public/
│   ├── media/                 # Pages CMS uploads
│   ├── 404bg.png
│   └── facebook.svg
└── src/
    ├── main.tsx               # ClerkProvider + Router + AuthProvider
    ├── App.tsx                # Route table
    ├── index.css              # Tailwind theme tokens and utilities
    ├── vite-env.d.ts
    ├── assets/
    ├── components/
    │   ├── SiteLayout.tsx
    │   ├── ProtectedRoute.tsx
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── LoginModal.tsx
    │   ├── SubscribeForm.tsx
    │   └── LegalPageContent.tsx
    ├── context/
    │   └── AuthContext.tsx    # Clerk user + RSVPs + donations
    ├── content/
    │   ├── resources/
    │   ├── events/
    │   ├── testimonials/
    │   ├── leadership/
    │   ├── faq/
    │   ├── legal/
    │   ├── about.json
    │   └── donate.json
    ├── lib/
    │   ├── content.ts         # Content loader, types and validation
    │   ├── neon.ts            # Neon Data API client (Clerk JWT)
    │   └── paystack.ts        # Paystack Inline loader
    └── pages/
        ├── index.tsx          # Home
        ├── about.tsx
        ├── login.tsx          # Clerk SignIn / SignUp
        ├── ForgotPassword.tsx # Redirects to Clerk sign-in
        ├── Join.tsx
        ├── Events.tsx
        ├── Resources.tsx
        ├── BlogPost.tsx
        ├── Donate.tsx         # Paystack + bank transfer
        ├── Profile.tsx
        ├── PaymentHistory.tsx # Donation & payment history table
        ├── PrivacyPolicy.tsx
        ├── TermsOfService.tsx
        ├── Faq.tsx
        └── NotFound.tsx
```

## Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Home | |
| `/about` | About | |
| `/login` | Login / Signup | Clerk components; standalone layout |
| `/forgot-password` | Forgot Password | Redirects to `/login`, where Clerk handles reset |
| `/events` | Events | CMS events split into upcoming/past; RSVP requires login |
| `/join` | Membership | Landing page; CTA links to `/login` |
| `/resources` | Resources | Category filters; no search |
| `/resources/:slug` | Blog Post | Article detail |
| `/donate` | Donate | Paystack online payment + manual bank transfer |
| `/profile` | Profile | Protected |
| `/history` | Donation & Payment History | Protected |
| `/receipts` | Legacy alias | Renders `/history` |
| `/privacy` | Privacy Policy | |
| `/terms` | Terms of Service | |
| `/faq` | FAQ | CMS-driven accordion |
| `*` | Not Found | Standalone |

## Design System

The UI follows the **Emerald & Gold** system documented in [`design.md`](./design.md):

- Deep emerald primary (`#003527`), rich gold accent (`#fed65b`), soft light surfaces.
- Playfair Display for headings, Plus Jakarta Sans for body/UI.
- Rounded corners, tonal layers, soft shadows, and subtle geometric patterns.
- Tokens are defined as Tailwind theme variables in `src/index.css`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server (frontend only) |
| `npx netlify-cli dev` | Run the app and Netlify Functions locally |
| `npm run build` | Type-check app + functions and build into `dist/` |
| `npm run typecheck` | Type-check the app and the Netlify Functions |
| `npm run preview` | Preview the production build |

## Deployment

`netlify.toml` configures Netlify to:

- run `npm run build` and publish `dist/`,
- load functions from `netlify/functions/`,
- rewrite `/api/paystack/verify` and `/api/paystack/webhook` to the functions,
- fall back to `index.html` for client-side routes.

Set the environment variables from the table above in
**Site configuration → Environment variables** before deploying. After changing a
`VITE_` value, redeploy. For payments, also configure the Paystack webhook URL.

## Appendix: Using Clerk on a Custom (Standard) Domain

This section explains how to move Clerk from its development instance
(`pk_test_...`, served from the default `*.clerk.accounts.dev` environment and the
Netlify `*.netlify.app` URL) to a **production custom domain** such as
`example.com`. It assumes the app is already deployed on Netlify and that you
control the domain's DNS.

> **"Standard domain" vs. satellite domain in Clerk:** a *standard/primary*
> domain is the main domain where your app and Clerk live. *Satellite* domains
> let you use Clerk on additional domains while sharing the same user base.
> This guide covers the single standard (primary) domain setup. Only add a
> satellite domain if you intentionally run the app on more than one domain.

### 0. Before you start

Make sure you have:

- The domain (`example.com`) and access to its DNS provider (or Netlify DNS).
- Admin access to the Clerk application.
- Access to the Netlify site settings.
- The Neon production connection details, if you use a separate production
  branch/database.

Clerk keeps **Development** and **Production** instances separate. Users, keys,
JWT templates, and domain settings do **not** carry over. Plan to recreate any
test users or admin accounts.

### 1. Put the site on your domain in Netlify first

Do this before touching Clerk so Clerk can verify the domain.

1. In Netlify, open the site → **Domain management** → **Add a domain** and add
   `example.com`.
2. Either delegate DNS to Netlify DNS or add the records Netlify shows at your
   DNS provider:
   - Apex (`example.com`): Netlify's load-balancer record (ALIAS/A/ANAME).
   - `www`: CNAME to your Netlify site.
3. Choose one canonical host and make the other redirect to it (for example,
   redirect `www.example.com` → `example.com`).
4. Wait for Netlify to issue the HTTPS certificate, then confirm
   `https://example.com` serves the app.

### 2. Switch Clerk to the Production instance

1. Open the [Clerk Dashboard](https://dashboard.clerk.com) and select the app.
2. In the top-left instance switcher, switch from **Development** to
   **Production**.
3. Everything below is configured in the **Production** instance.

### 3. Add the domain in Clerk

1. In the Production instance, go to **Configure → Domains** (older dashboards:
   **Domains**).
2. Click **Add domain** and enter your domain (for example `example.com`). Add
   the `www` variant too if you use it, but set only one as the primary.
3. Mark the domain as **Primary** (standard). Do **not** mark it as a satellite
   unless you are deliberately sharing users across multiple domains.
4. Clerk generates the exact DNS records you must create. Leave this page open.

### 4. Add the DNS records Clerk shows

Clerk typically asks for CNAME records on subdomains of your domain, for
example:

| Host | Points to (example) | Purpose |
| --- | --- | --- |
| `clerk.example.com` | `frontend-api.clerk.services` | Clerk Frontend API |
| `accounts.example.com` | `accounts.clerk.services` | Clerk Account Portal |
| `clkmail.example.com` | value shown in dashboard | Clerk email deliverability |

**Use the exact host/target values shown in your Clerk dashboard — the targets
above are illustrative and can change.** Add the records at your DNS provider
(or Netlify DNS) with the TTL Clerk recommends. Then return to Clerk and click
**Verify** (or **Retry**) until all records show as verified. Propagation can
take minutes to a few hours.

If you also send verification/reset emails from your own domain, add the SPF
and DKIM records Clerk provides so mail is not marked as spam.

### 5. Set the application URLs and allowed origins

Still in the Production instance:

1. Set the **Home URL** to `https://example.com`.
2. Set **Sign-in URL** to `https://example.com/login` and **Sign-up URL** to
   `https://example.com/login?mode=signup` (these match `src/pages/login.tsx`).
3. Set the **After sign-in** and **After sign-up** fallback URLs to
   `https://example.com/profile` (the app also passes relative
   `fallbackRedirectUrl` values at runtime).
4. Confirm `https://example.com` is listed under the instance's allowed
   origins/redirect URLs so Clerk does not reject requests with an
   "invalid origin" error.

### 6. Recreate the JWT template in the Production instance

JWT templates are **per instance**; the `neon` template you created in
Development will not exist in Production.

1. In the Production instance, open **JWT Templates**.
2. Create a template named exactly **`neon`** — this matches
   `getToken({ template: 'neon' })` in `src/context/AuthContext.tsx`.
3. Add the `role` claim with the value `"authenticated"` (required by the Neon
   Data API and the RLS policies in `db/schema.sql`) and keep the default `sub`
   claim (the Clerk user ID, used by `auth.user_id()`).
4. Save the template.

### 7. Update Neon for the production Clerk issuer

The Neon Data API validates the Clerk JWT issuer/JWKS. Development and
Production instances have **different issuer URLs**, so this must be updated.

1. Copy the Production instance's issuer/JWKS URL from Clerk (shown in the JWT
   template or API keys/domain settings).
2. In the Neon Console, open the Data API settings for the branch used by the
   site and set the Clerk issuer/JWKS to the **Production** value.
3. If you use separate Neon branches for staging and production, point the
   production site at the production branch and re-run `db/schema.sql` there so
   the RLS policies exist. Refresh the schema cache.

### 8. Update the Netlify environment variables

1. In Netlify → **Site configuration → Environment variables**, change
   `VITE_CLERK_PUBLISHABLE_KEY` to the Production key (`pk_live_...`) for the
   **Production** deploy context.
2. Keep `VITE_NEON_DATA_API_URL` pointed at the production Data API
   (`https://<host>/<db>/rest/v1`).
3. Optionally keep the `pk_test_...` key scoped to **Deploy previews** and
   **Branch deploys** so previews use the Development instance.
4. Leave "Contains secret values" unchecked for all `VITE_` variables — they are
   inlined into the public bundle, so marking them secret hides nothing.
5. **Redeploy** the site. Vite inlines environment variables at build time, so
   a rebuild is required for changes to take effect.

### 9. Verify the production setup

1. Open `https://example.com`, sign up, sign out, and sign back in.
2. Confirm session cookies (`__client`, `__session`) are set for
   `example.com` (not `*.clerk.accounts.dev`).
3. Open the browser console and check for Clerk origin or publishable-key
   errors.
4. Register for an event to confirm a Data API write succeeds (this proves the
   `neon` JWT template, `role`/`sub` claims, and the Neon issuer setting are all
   correct).
5. Trigger a password reset and a verification email to confirm delivery and
   that links point at your domain.
6. Confirm existing Development users cannot sign in — they must be recreated in
   Production.

### Common issues and gotchas

- **Wrong key:** using `pk_test_...` in production loads the Development
  instance and will not match your Production domain/JWT template.
- **Issuer mismatch:** the most common cause of Data API `401` responses after
  going live is Neon still trusting the Development issuer. Update it to the
  Production issuer.
- **Missing template:** forgetting to recreate the `neon` JWT template in
  Production makes `getToken({ template: 'neon' })` return `null`, so member
  data fails to load.
- **Domain not verified:** Clerk will not issue sessions on an unverified domain;
  finish the DNS verification step first.
- **Apex vs. `www`:** pick one canonical host and redirect the other; the Clerk
  Frontend API subdomain must be on the same registrable domain.
- **No session migration:** switching the primary domain does not move existing
  sessions; users must sign in again on the new domain.
- **Local development:** keep the Development (`pk_test_...`) key in
  `.env.local` for `npm run dev`; never commit `.env.local`.


## License

No license has been specified for this project yet. Development is still ongoing.
