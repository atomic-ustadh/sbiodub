# LCA, Abuja

A front-end prototype for Leadership Course, Abuja. The site presents the organization's mission, events, resources, membership and donation pages, and includes a browser-only member area for managing a profile, bookmarks, RSVPs, saved payment methods and receipts.

This is a **client-side demo, not a production application**. There is no backend, no server-side authentication, and no real payment processing. Account data, passwords, RSVPs, bookmarks, donations and card metadata are stored in the browser via `localStorage`. Several UI elements (notably the donation submission, newsletter forms, resource search and some calls to action) are presentational only.

## Implementation Status

### Working

- **Routing** — React Router with a shared site layout, standalone auth pages, protected routes, and a custom 404 page.
- **Responsive shell** — sticky desktop/mobile navigation, active link states, footer, and a floating FAQ button (the button renders but has no action).
- **Home page** — hero, core pillars, three hard-coded event preview cards, a working testimonial carousel, and static CTA sections.
- **About page** — static hero, story, values, team profiles and CTA sections.
- **Local authentication** — sign up, sign in and logout against users stored in `localStorage`. Passwords are stored in plain text. Sessions persist across reloads. A "Keep me signed in" checkbox is shown but has no effect.
- **Protected member area** — `/profile` and `/receipts` redirect logged-out users to `/login` and return them to the requested page after sign-in.
- **Events** — six hard-coded events (all dated 2024), category filtering, grid/timeline view toggle, and RSVP through a modal. RSVP requires login, is stored per user, prevents duplicates, and can be cancelled from the profile.
- **Resources** — four hard-coded articles with category filters, a featured article, article detail pages, and bookmark toggling for logged-in users.
- **Profile dashboard** — edit name, phone and interests; view bookmarks; view and cancel RSVPs; view a donations table; add/remove mock payment methods; log out.
- **Receipts** — renders donations from local state with printable receipt rows and optional filtering by `?donation=<id>`. Because no UI flow currently creates a donation, this list is normally empty.
- **Legal pages** — privacy policy and terms of service.
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
- **Floating FAQ button** — no click handler.
- **404 background image** — references `../public/404bg.png`, which does not resolve to the public asset at runtime. The correct URL would be `/404bg.png`.

### Known limitations

- No backend, database, email delivery or payment gateway.
- Passwords are stored in plain text in `localStorage`; all member data is user-editable.
- Event and article content is hard-coded in source; there is no CMS or admin interface.
- The 404, privacy and terms pages use the current date for "Last Updated".
- No automated tests, linting configuration or CI.
- Images are largely hotlinked from third-party Google URLs.

## Tech Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI library |
| TypeScript | Static typing |
| Vite 6 | Dev server and build tool |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 (`@tailwindcss/vite`) | Styling and design tokens |
| Google Fonts | Playfair Display, Plus Jakarta Sans, Material Symbols |

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

## Project Structure

```
.
├── index.html                 # HTML entry point, fonts, root div
├── vite.config.ts             # Vite + React + Tailwind plugins
├── tsconfig.json              # TypeScript configuration
├── design.md                  # "Emerald & Gold" design system spec
├── netlify.toml               # Netlify build and SPA redirect config
├── public/                    # Static assets served from the site root
│   ├── 404bg.png
│   └── facebook.svg
└── src/
    ├── main.tsx               # App bootstrap: Router + AuthProvider
    ├── App.tsx                # Route table using layout routes
    ├── vite-env.d.ts          # Vite client types
    ├── index.css              # Tailwind theme tokens, utilities, animations
    ├── components/
    │   ├── SiteLayout.tsx     # Navbar + page outlet + footer + FAQ button
    │   ├── ProtectedRoute.tsx # Redirects logged-out users to login
    │   ├── Navbar.tsx         # Responsive sticky navigation
    │   ├── Footer.tsx         # Footer with newsletter UI
    │   └── SubscribeForm.tsx  # Presentational newsletter form
    ├── context/
    │   └── AuthContext.tsx    # Auth + member data via localStorage
    ├── data/
    │   └── posts.ts           # Hard-coded article content + types
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
        └── NotFound.tsx       # 404
```

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
| `/resources/:slug` | Blog Post | Bookmarking for logged-in users |
| `/donate` | Donate | Presentational; no submission |
| `/profile` | Profile | Protected; requires login |
| `/receipts` | Receipts | Protected; requires login |
| `/privacy` | Privacy Policy | |
| `/terms` | Terms of Service | |
| `*` | Not Found | Standalone layout; background image path is currently broken |

## Data & Authentication

`AuthContext` (`src/context/AuthContext.tsx`) provides:

- `signup`, `login`, `logout`, `updateProfile`
- bookmarks: `toggleBookmark`, `isBookmarked`
- RSVPs: `addRsvp`, `cancelRsvp`
- donations: `addDonation` (defined but unused)
- payment methods: `addCard`, `removeCard`

All state is scoped per user and stored under these `localStorage` keys:

| Key | Contents |
| --- | --- |
| `lca_session` | Currently logged-in user |
| `lca_users` | Registered users, including plain-text passwords |
| `lca_bookmarks` | Saved article slugs per user |
| `lca_rsvps` | RSVP'd events per user |
| `lca_donations` | Donation history per user (empty without direct manipulation) |
| `lca_cards` | Saved card metadata per user (brand, last four digits, name, expiry) |

On load, the app migrates legacy `sbio_*` keys to the equivalent `lca_*` keys.

> **Security note:** This is a front-end demo. Passwords are stored in plain text, and donations/payments are simulated or purely visual. Do not use this implementation for real accounts, donations or payment data. A real backend with secure authentication and a payment provider is required before production use.

Static articles live in `src/data/posts.ts`; events, testimonials, team members and home-page event previews are defined inline in their respective page files.

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
