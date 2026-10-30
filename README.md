# LCA, Abuja

A modern web platform for Leadership Course, Abuja. The site showcases the organization's mission, events, resources, membership, and donation flows, with a member area for managing a profile, bookmarks, RSVPs, donations, and payment methods.

Built as a client-side single-page application with React, Vite, React Router, and Tailwind CSS v4. There is no backend for now — authentication and member data are persisted in the browser via `localStorage`.

## Features

- **Landing page** — hero, core pillars (Community, Faith, Service), upcoming events, testimonial carousel, and calls to action.
- **About** — mission, values, team, and volunteer invitation.
- **Events** — browse/filter events by category, search, and RSVP through a modal.
- **Resources / Blog** — searchable article listing with category filters, individual blog post pages, and bookmarking for logged-in users.
- **Membership** — multi-step join flow with role selection.
- **Authentication** — sign up, sign in, and forgot-password screens (local demo implementation).
- **Donate** — preset/custom amounts, allocation selection, donor details, and mock payment submission.
- **Profile dashboard** — edit profile and interests, view bookmarks, RSVP'd events, donation history, and saved payment methods.
- **Receipts** — donation receipt history with printable receipts.
- **Legal pages** — privacy policy and terms of service.
- **Newsletter subscription** — reusable subscribe form in the footer and content pages.
- **Custom 404** page.

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
├── public/                    # Static assets (404 background, social icons)
└── src/
    ├── main.tsx               # App bootstrap: Router + AuthProvider
    ├── App.tsx                # Route table using layout routes
    ├── vite-env.d.ts          # Vite client types
    ├── index.css              # Tailwind theme tokens, utilities, animations
    ├── components/
    │   ├── SiteLayout.tsx     # Navbar + page outlet + footer
    │   ├── ProtectedRoute.tsx # Redirects logged-out users to login
    │   ├── Navbar.tsx         # Responsive sticky navigation
    │   ├── Footer.tsx         # Footer with newsletter signup
    │   └── SubscribeForm.tsx  # Reusable newsletter form
    ├── context/
    │   └── AuthContext.tsx    # Auth + member data via localStorage
    ├── data/
    │   └── posts.ts           # Static blog/resource content + types
    ├── assets/                # SVG social icons
    └── pages/
        ├── index.tsx          # Home
        ├── about.tsx          # About
        ├── login.tsx          # Login / signup
        ├── ForgotPassword.tsx
        ├── Join.tsx           # Multi-step membership flow
        ├── Events.tsx         # Events + RSVP
        ├── Resources.tsx      # Resource/article listing
        ├── BlogPost.tsx       # Individual article
        ├── Donate.tsx         # Donation flow
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
| `/login` | Login / Signup | Auth layout, no footer |
| `/forgot-password` | Forgot Password | Auth layout, no footer |
| `/events` | Events | |
| `/join` | Membership | Multi-step form |
| `/resources` | Resources | |
| `/resources/:slug` | Blog Post | |
| `/donate` | Donate | |
| `/profile` | Profile | Protected; requires login |
| `/receipts` | Receipts | Protected; requires login |
| `/privacy` | Privacy Policy | |
| `/terms` | Terms of Service | |
| `*` | Not Found | No footer |

## Data & Authentication

`AuthContext` (`src/context/AuthContext.tsx`) provides:

- `signup`, `login`, `logout`, `updateProfile`
- bookmarks: `toggleBookmark`, `isBookmarked`
- RSVPs: `addRsvp`, `cancelRsvp`
- donations: `addDonation`
- payment methods: `addCard`, `removeCard`

All state is scoped per user and stored under these `localStorage` keys:

| Key | Contents |
| --- | --- |
| `lca_session` | Currently logged-in user |
| `lca_users` | Registered users (including demo passwords) |
| `lca_bookmarks` | Saved article slugs per user |
| `lca_rsvps` | RSVP'd events per user |
| `lca_donations` | Donation history per user |
| `lca_cards` | Saved payment methods per user |

> **Note:** This is a front-end demo. Passwords are stored in plain text in `localStorage`, and donations/payments are simulated. Replace `AuthContext` and the payment flows with a real backend and secure authentication before production use.

Static articles live in `src/data/posts.ts`; event data is defined inline in `src/pages/Events.tsx`.

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

## License

No license has been specified for this project yet. Development still ongoing.
