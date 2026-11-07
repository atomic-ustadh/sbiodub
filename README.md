# LCA, Abuja

A front-end prototype for Leadership Course, Abuja. The site presents the organization's mission, events, resources, membership and donation pages, and includes a browser-only member area for managing a profile, RSVPs, saved payment methods and receipts.

This is a **client-side demo, not a production application**. There is no backend, no server-side authentication, and no real payment processing. Account data, passwords, RSVPs, donations and card metadata are stored in the browser via `localStorage`. Several UI elements (notably the donation submission, newsletter forms, resource search and some calls to action) are presentational only.

## Implementation Status

### Working

- **Routing** — React Router with a shared site layout, standalone auth pages, protected routes, and a custom 404 page.
- **Responsive shell** — sticky desktop/mobile navigation, active link states, footer, and a floating FAQ button that links to `/faq`.
- **Home page** — hero, core pillars, three hard-coded event preview cards, a working testimonial carousel, and static CTA sections.
- **About page** — static hero, story, values, team profiles and CTA sections.
- **Local authentication** — sign up, sign in and logout against users stored in `localStorage`. Passwords are stored in plain text. Sessions persist across reloads. A "Keep me signed in" checkbox is shown but has no effect.
- **Protected member area** — `/profile` and `/receipts` redirect logged-out users to `/login` and return them to the requested page after sign-in.
- **Events** — six events loaded from JSON content files (all dated 2024), category filtering, grid/timeline view toggle, and RSVP through a modal. RSVP requires login (guests see a login modal), is stored per user, prevents duplicates, and can be cancelled from the profile.
- **Resources** — four articles loaded from JSON content files, with category filters, a featured article, and article detail pages.
- **Content management** — resources and events live in `src/content/` and are editable through [Pages CMS](https://pagescms.org) using the repository's `.pages.yml`. Saving in Pages CMS commits to GitHub, which triggers a Netlify rebuild.
- **Profile dashboard** — edit name, phone and interests; view and cancel RSVPs; view a donations table; add/remove mock payment methods; log out.
- **Receipts** — renders donations from local state with printable receipt rows and optional filtering by `?donation=<id>`. Because no UI flow currently creates a donation, this list is normally empty.
- **Shared login modal** — `LoginModal` gates event registration for guests, supports custom title/description/icon, traps focus, closes on Escape or backdrop click, and returns the user to the current page after login.
- **Legal and utility pages** — privacy policy, terms of service, and a placeholder FAQ page.
- **Design system** — "Emerald & Gold" tokens and utilities in `src/index.css`.

### UI-only or non-functional

- **Donation submission** — the `/donate` page lets users choose frequency, amount, allocation, donor details and a payment method, but nothing is submitted. The page does not read the donor fields, payment-method buttons have no selection state, and the donate button has no handler. The `addDonation` function exists in `AuthContext` but is not called anywhere, so donation history and receipts contain no user-created data.
- **Newsletter subscription** — `SubscribeForm` renders an email input and button but does not submit, validate or persist anything.
- **Resource search** — the search field and "Find" button on `/resources` are decorative; only category filters work.
- **Event search** — not implemented; only category filtering exists.
- **Forgot password** — checks whether an email exists in local storage and simulates a short delay, but does not send a link or reset a password. It also reveals whether an account exists for an email.
- **Membership flow** — `/join` is a three-step form, but the selected role ("Member" or "Volunteer") is not saved, no phone/terms data is collected, and the result is simply a local account.
- **Home/About CTAs** — several buttons (e.g. "Join the Movement", "About LCA", "Register Now", "Become a Volunteer", "Make a Donation") are placeholders with no navigation or action.
- **Terms links on signup** — point to `#` instead of `/terms` and `/privacy`.
- **FAQ page** — placeholder only; it currently says no FAQs are available.
- **404 background image** — uses the relative path `../404bg.png`; this resolves correctly for top-level unmatched URLs but can break for deeper unmatched paths where `/404bg.png` would be safer.

### Known limitations

- No backend, database, email delivery or payment gateway.
- Passwords are stored in plain text in `localStorage`; all member data is user-editable.
- Pages CMS edits require a Git commit and a rebuild; content is not updated instantly.
- Resources and events are editable, but Home, About, Donate and Join copy still lives in source files.
- Uploaded media lives under `public/media` and is committed to the repository, increasing repo size over time.
- The privacy and terms pages use the current date for "Last Updated".
- No automated tests, linting configuration or CI.

## Tech Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI library |
| TypeScript | Static typing |
| Vite 6 | Dev server and build tool |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 (`@tailwindcss/vite`) | Styling and design tokens |
| Google Fonts | Playfair Display, Plus Jakarta Sans, Material Symbols |

## Architecture

This is a client-side single-page application. There is no server, API layer or database.

- **Bootstrap:** `src/main.tsx` mounts React inside `BrowserRouter` and `AuthProvider`, then renders the route table in `src/App.tsx`.
- **Layouts:** Most pages render inside `SiteLayout` (`Navbar` + `Outlet` + `Footer` + floating FAQ link). Auth pages and the 404 page render standalone.
- **Route guards:** `ProtectedRoute` wraps `/profile` and `/receipts`, redirecting guests to `/login` with a return path.
- **State:** `AuthContext` is the single source of client state for the session, users, RSVPs, donations and saved cards, persisted per user in `localStorage`.
- **Content:** Resources and events are JSON files under `src/content/`, loaded and validated at build time by `src/lib/content.ts`. Testimonials, team members and home-page previews are still defined inline in their pages.
- **Shared UI:** `LoginModal` is used for RSVP login gating; `SubscribeForm` is reused in the footer and content pages.
- **Styling:** Tailwind CSS theme tokens and utilities live in `src/index.css`, following the `design.md` "Emerald & Gold" system.
- **Deployment:** Netlify builds with Vite and rewrites all routes to `index.html` for client-side routing.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install and run

```bash
npm install
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Editing Content with Pages CMS

Resources and events are managed through [Pages CMS](https://pagescms.org). The repository config lives in `.pages.yml`.

1. Sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub.
2. Install the Pages CMS GitHub App on the account that owns this repository and grant it access to `sbiodub`.
3. Open the repository and select the branch you want to edit (`Decap-CMS` while testing, `main` after merging).
4. Edit entries under **Resources** or **Events** and save. Pages CMS commits the JSON change to GitHub.
5. Netlify rebuilds and deploys the updated site.

### Content rules

- New content is stored as JSON in `src/content/resources/` or `src/content/events/`. The filename becomes the resource slug or event fallback ID.
- Keep an event's **Stable ID** unchanged once people have RSVP'd. New events can leave it empty; the filename is used.
- Dates use `YYYY-MM-DD` and are formatted for display in the app.
- Image fields use uploaded `/media/...` paths. Existing images live in `public/media/resources/` and `public/media/events/`.
- Content is compiled at build time. Edits are not visible until the commit triggers a successful Netlify deploy.
- To see CMS edits locally, pull the latest commit before running `npm run dev`.

## Project Structure

```
.
├── index.html                 # HTML entry point, fonts, root div
├── .pages.yml                 # Pages CMS collections and media config
├── vite.config.ts             # Vite + React + Tailwind plugins
├── tsconfig.json              # TypeScript configuration
├── design.md                  # "Emerald & Gold" design system spec
├── netlify.toml               # Netlify build and SPA redirect config
├── public/                    # Static assets served from the site root
│   ├── media/                 # Pages CMS image uploads
│   ├── 404bg.png
│   └── facebook.svg
└── src/
    ├── main.tsx               # App bootstrap: Router + AuthProvider
    ├── App.tsx                # Route table using layout routes
    ├── vite-env.d.ts          # Vite client types
    ├── index.css              # Tailwind theme tokens, utilities, animations
    ├── components/
    │   ├── SiteLayout.tsx     # Navbar + page outlet + footer + FAQ link
    │   ├── ProtectedRoute.tsx # Redirects logged-out users to login
    │   ├── Navbar.tsx         # Responsive sticky navigation
    │   ├── Footer.tsx         # Footer with newsletter UI
    │   ├── LoginModal.tsx     # Shared login prompt for gated actions
    │   └── SubscribeForm.tsx  # Presentational newsletter form
    ├── context/
    │   └── AuthContext.tsx    # Auth + member data via localStorage
    ├── content/
    │   ├── resources/         # Editable resource posts (JSON)
    │   └── events/            # Editable events (JSON)
    ├── lib/
    │   └── content.ts         # Content loader, types and validation
    ├── assets/                # Local images and social SVG icons
    └── pages/
        ├── index.tsx          # Home
        ├── about.tsx          # About
        ├── login.tsx          # Login / signup
        ├── ForgotPassword.tsx # Mock forgot-password screen
        ├── Join.tsx           # Mock multi-step membership flow
        ├── Events.tsx         # Events + RSVP
        ├── Resources.tsx      # Resource/article listing
        ├── BlogPost.tsx       # Individual article
        ├── Donate.tsx         # Presentational donation page
        ├── Profile.tsx        # Member dashboard
        ├── Receipts.tsx       # Donation receipts
        ├── PrivacyPolicy.tsx
        ├── TermsOfService.tsx
        ├── Faq.tsx            # Placeholder FAQ page
        └── NotFound.tsx       # 404
```

> Local note: `src/content/`, `src/content/resources/`, `src/lib/` and `src/schemas/` exist in some working copies as empty placeholder directories. They contain no code and are not tracked by git.

## Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Home | |
| `/about` | About | |
| `/login` | Login / Signup | Standalone layout, no navbar/footer |
| `/forgot-password` | Forgot Password | Standalone layout; mock only |
| `/events` | Events | Hard-coded events; RSVP requires login |
| `/join` | Membership | Three-step form; role is not persisted |
| `/resources` | Resources | Category filters work; search does not |
| `/resources/:slug` | Blog Post | Save icon shown; guests get a login modal |
| `/donate` | Donate | Presentational; no submission |
| `/profile` | Profile | Protected; requires login |
| `/receipts` | Receipts | Protected; requires login |
| `/privacy` | Privacy Policy | |
| `/terms` | Terms of Service | |
| `/faq` | FAQ | Placeholder page |
| `*` | Not Found | Standalone layout; background image uses a relative path |

## Data & Authentication

`AuthContext` (`src/context/AuthContext.tsx`) provides:

- `signup`, `login`, `logout`, `updateProfile`
- RSVPs: `addRsvp`, `cancelRsvp`
- donations: `addDonation` (defined but unused)
- payment methods: `addCard`, `removeCard`

All state is scoped per user and stored under these `localStorage` keys:

| Key | Contents |
| --- | --- |
| `lca_session` | Currently logged-in user |
| `lca_users` | Registered users, including plain-text passwords |
| `lca_rsvps` | RSVP'd events per user |
| `lca_donations` | Donation history per user (empty without direct manipulation) |
| `lca_cards` | Saved card metadata per user (brand, last four digits, name, expiry) |

On load, the app migrates legacy `sbio_*` keys to the equivalent `lca_*` keys.

> **Security note:** This is a front-end demo. Passwords are stored in plain text, and donations/payments are simulated or purely visual. Do not use this implementation for real accounts, donations or payment data. A real backend with secure authentication and a payment provider is required before production use.

Resources live in `src/content/resources/` and events in `src/content/events/`. Both are loaded and validated by `src/lib/content.ts`. Testimonials, team members and home-page event previews are still defined inline in their respective page files.

## Design System

The UI follows the **Emerald & Gold** system documented in [`design.md`](./design.md):

- Deep emerald primary (`#003527`), rich gold accent (`#fed65b`), soft light surfaces.
- Playfair Display for headings, Plus Jakarta Sans for body/UI.
- Rounded corners, tonal layers, soft shadows, and subtle geometric patterns.
- Design tokens are defined as Tailwind theme variables in `src/index.css`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run preview` | Preview the production build locally |

## Deployment

`netlify.toml` configures Netlify to run `npm run build`, publish `dist/`, and rewrite all paths to `index.html` for client-side routing.

## License

No license has been specified for this project yet. Development is still ongoing.
