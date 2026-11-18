# Architecture and Documentation Guide

This document is the architecture map for the repository. It explains how the app
is structured, how data flows through it, and the conventions followed by the
documentation stages.

For product-level status and setup steps, see [`../README.md`](../README.md). For
the CMS/content schema and code-coupled fields, see
[`CONTENT.md`](./CONTENT.md).

## High-level overview

LCA, Abuja is a Vite + React + TypeScript single-page app deployed on Netlify.

- **Frontend:** React 19 SPA with React Router, Tailwind CSS 4 tokens/utilities,
  and build-time JSON content.
- **Auth:** Clerk (`@clerk/react` on the client, `@clerk/backend` in functions)
  manages identity, sessions, and auth emails.
- **Member data:** Neon Postgres stores RSVPs and donations. The browser reads/writes
  RSVPs through the Neon Data API using a Clerk-issued JWT (`neon` template) and
  Postgres RLS. Donations are written only by trusted Netlify Functions using
  `DATABASE_URL`.
- **Payments:** Paystack Inline runs in the browser; `paystack-verify` and
  `paystack-webhook` Netlify Functions verify and persist successful charges.
- **Content/CMS:** JSON under `src/content/` is edited via Pages CMS
  (`.pages.yml`), committed to Git, and compiled into the bundle at build time
  (`import.meta.glob` / static imports in `src/lib/content.ts` and
  `src/lib/involvement.ts`). CMS edits are not live until rebuild/deploy.
- **Deployment:** `netlify.toml` builds with Vite, publishes `dist/`, serves
  functions from `netlify/functions`, rewrites `/api/paystack/*`, and falls back
  to `index.html` for SPA routes.

## Repository map

```text
.
├─ docs/                    # Architecture and content/CMS schema references
├─ src/
│  ├─ main.tsx              # App bootstrap (Clerk, Router, AuthProvider)
│  ├─ App.tsx               # Route table and layout composition
│  ├─ index.css             # Tailwind theme tokens, components, utilities
│  ├─ assets/               # Bundled static assets imported by code
│  ├─ components/           # Shared UI (layout, nav, footer, forms, guards)
│  ├─ context/              # React context (AuthContext bridges Clerk + app data)
│  ├─ content/              # CMS-managed JSON content (build-time)
│  ├─ lib/                  # Client/domain helpers (content loaders, Neon, Paystack, involvement)
│  └─ pages/                # Route-level page components
├─ netlify/
│  ├─ functions/            # Serverless endpoints (Paystack verify/webhook)
│  └─ lib/                  # Server-only helpers (Clerk verify, HTTP, Paystack, donations)
├─ db/schema.sql            # Neon/Postgres schema, grants, RLS policies
├─ public/                  # Static files served as-is; CMS media under public/media
├─ .pages.yml               # Pages CMS collections/files/media configuration
├─ netlify.toml             # Build, functions, rewrites, SPA fallback
├─ vite.config.ts           # Vite + React + Tailwind plugins
├─ tsconfig*.json           # App and Netlify Functions TypeScript configs
└─ .env.example             # Documented client/server environment variables
```

## Routing and layouts

- **Route table:** `src/App.tsx` defines all routes using React Router.
  - Most public/member pages render inside `SiteLayout` (`Navbar` + `Outlet` +
    `Footer` + floating FAQ link, see `src/components/SiteLayout.tsx`).
  - Standalone routes: `/login`, `/forgot-password`, and `*` (404) render without
    the site chrome.
- **Protected routes:** `ProtectedRoute` guards `/profile`, `/history`, and
  `/receipts` (legacy alias of history), redirecting guests to `/login` with a
  return path.
- **Dynamic detail routes:** `resources/:slug` routes are generated from loaded
  posts and `get-involved/:slug` routes from involvement items that have
  `detail`, so unknown slugs fall through to the top-level 404. Detail components
  accept a `slug` prop (for generated routes) with `useParams` fallback.
- **Scroll behavior:** `ScrollToTop` resets scroll on pathname changes.

## CMS → content pipeline

- **Source of truth (editable):** JSON in `src/content/` and media in
  `public/media/`, managed by Pages CMS per `.pages.yml`. The full field-by-field
  schema and validation matrix are in [`CONTENT.md`](./CONTENT.md).
- **Build-time loading:**
  - `src/lib/content.ts` statically imports `about.json`/`donate.json` and uses
    `import.meta.glob(..., { eager: true })` for collections (resources, events,
    testimonials, leadership, FAQ, legal). It validates/parses records into typed
    exports (`posts`, `events`, `donationPage`, etc.).
  - `src/lib/involvement.ts` loads `get-involved-intro.json` and the
    `get-involved/*.json` collection, sorts items by `order`, and merges
    code-controlled routes.
- **Key implication:** Content changes require a Git commit + rebuild/deploy to
  appear in production. Local dev reflects filesystem content (with Vite
  reload/HMR behavior).
- **Code-coupled CMS fields (intentional):**
  - **Involvement routes/links:** Button destinations (`ctaTo`) are controlled in
    code (`involvementRoutes` in `src/lib/involvement.ts`), not in CMS; CMS
    controls labels/copy.
  - **Take a Stall availability:** `detail.applications` (`mode`, `opensAt`,
    `closesAt`, `timezone`, messages) is CMS-driven but evaluated at runtime in
    `InvolvementDetail` so the window flips without rebuild.
  - **Event stable IDs:** Existing event IDs should not change once users have
    RSVP’d (RSVPs key off event id).
  - **Resource/event slugs:** Derived from filenames in collections; changing
    filenames changes URLs.

## Authentication and member data (Clerk + Neon)

- **Bootstrap:** `src/main.tsx` wraps the app in `ClerkProvider` →
  `BrowserRouter` → `AuthProvider`. `VITE_CLERK_PUBLISHABLE_KEY` is required.
- **AuthContext (`src/context/AuthContext.tsx`):** Bridges Clerk user/session to
  app data (profile updates via Clerk, RSVPs and donation history via Neon Data
  API). It requests a Clerk JWT with template `neon` for Data API calls.
- **Authorization boundary:** The browser is not trusted for donation writes.
  Postgres RLS (keyed on `auth.user_id()` / Clerk `sub`, `role=authenticated`)
  restricts RSVP access and donation reads to the owning user. See `db/schema.sql`.
- **Profiles:** Name managed through Clerk; phone stored in Clerk
  `unsafeMetadata`; email is read-only.

## Donations and payments (Paystack + Netlify Functions)

1. **Client (`/donate`, `src/lib/paystack.ts`):** Opens Paystack Inline with the
   public key, amount in kobo, unique `reference`, and metadata (including Clerk
   user id when signed in).
2. **Verify (`netlify/functions/paystack-verify.ts`):** Confirms transaction with
   Paystack secret key, optionally verifies caller’s Clerk token, and performs an
   idempotent upsert via `netlify/lib/donations.ts` using `DATABASE_URL`.
3. **Webhook (`netlify/functions/paystack-webhook.ts`):** Validates
   `x-paystack-signature`, handles `charge.success` idempotently to record
   payments even if the client disconnects.
4. **History (`/history`):** Reads verified donations for the signed-in user
   through the Data API/RLS; anonymous donations (`user_id = null`) are not
   linked to accounts.

**Security invariant:** Never expose `PAYSTACK_SECRET_KEY`, `CLERK_SECRET_KEY`,
or `DATABASE_URL` to the client (no `VITE_` prefix). Donation rows are
inserted/updated server-side only.

## Deployment and environment

- **Netlify (`netlify.toml`):** `npm run build` → `dist/`, functions in
  `netlify/functions` (esbuild). Rewrites `/api/paystack/verify` and
  `/api/paystack/webhook` to functions; SPA fallback `/* → /index.html`.
- **Build:** `npm run build` runs `typecheck` (app + functions) before `vite build`.
- **Environment variables:** See `.env.example` for the authoritative list and
  scopes. `VITE_*` values are inlined at build time (require rebuild/redeploy);
  server-only secrets must be set in Netlify/`.env` for functions.
- **Local full-stack dev:** Use `npx netlify-cli dev` (so `/api` rewrites reach
  functions), not just `vite` dev, when testing payments.

## Styling and design system

- **Tokens/utilities:** `src/index.css` defines Tailwind v4 theme tokens and
  component/utility classes (layout, cards, prose, print rules, etc.).
- **Design reference:** `design.md` documents the Emerald & Gold direction;
  `src/index.css` is the implementation source of truth and may evolve beyond it.

## Documentation conventions (for later stages)

- **Module headers:** Add a brief header comment to each non-trivial file
  describing its purpose and key dependencies/integrations.
- **Doc comments on exports:** Prefer JSDoc/TS doc comments for exported
  components, hooks, functions, types, and important constants (params, returns,
  side effects).
- **Explain intent and invariants:** Focus on *why*, data flow, contracts, and
  constraints (e.g. validation rules, RLS assumptions, CMS/code-coupled fields,
  timezone/window semantics) rather than narrating obvious code.
- **Behavior-neutral:** Documentation changes must not alter runtime behavior,
  naming, or logic.
- **Staged, reviewable edits:** Comment in the planned stages in manageable
  chunks and pause for review between stages.

## Stage status

- **Stage 1:** Architecture doc, config/comments foundation.
- **Stage 2:** Core logic and data layer (`src/lib`, context, routing/bootstrap,
  Netlify functions/libs).
- **Stage 3:** Shared components and layout.
- **Stage 4:** Pages and route-level behavior.
- **Stage 5 (this change):** Content/CMS schema reference (`CONTENT.md`) and a
  consistency pass over `.pages.yml`, README, and schema documentation.
