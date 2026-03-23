# AMALAY App

AMALAY is a mobile-first web application for rural tourism discovery in the Souss-Massa region. It helps travelers discover places, receive profile-based recommendations, book experiences with local guides, browse community content, and explore local events.

The project is currently frontend-only and uses in-memory/mock datasets (no backend/API integration yet).

## Core Capabilities

- Personalized onboarding flow (multi-step traveler profile).
- Recommendation screen with top-match place and alternative suggestions.
- Explore page with:
  - Search by keyword/region/tag.
  - Category filters.
  - Difficulty, price, and sorting filters.
  - List + map modes (Leaflet/OpenStreetMap).
- Place details with pricing, tags, and linked guide.
- Booking flow with pricing breakdown and validation.
- Booking history view.
- Community feed with likes, comments, and inline posting.
- Events catalog and event details with available guides by region.
- Role-aware navigation (tourist vs guide).
- Guide dashboard with KPIs, trend chart, pending bookings, and spots.
- In-app assistant widget (`Azul`) with rule-based responses.

## Tech Stack

- React 18 + TypeScript
- Vite 5 (`@vitejs/plugin-react-swc`)
- React Router v6
- Zustand (local state stores)
- TanStack Query (provider wired; data currently mocked)
- Tailwind CSS + shadcn/ui + Radix UI
- Framer Motion
- Recharts
- React Leaflet + Leaflet
- Vitest + Testing Library
- ESLint (typescript-eslint + react-hooks)

## Project Structure

```text
src/
  modules/
    auth/            # login/register/guide-register
    onboarding/      # traveler profile wizard
    recommendation/  # recommendation results
    explore/         # landing, explore, place details
    booking/         # booking form + booking list
    community/       # social feed
    events/          # events list + detail
    guide/           # guide dashboard
    profile/         # user profile/settings
  shared/
    components/
      layout/        # Navbar, BottomNav, PageWrapper
      chat/          # Azul chatbot widget
      ui/            # shared visual primitives
    lib/
      mockData.ts    # app data source (places/guides/bookings/posts/events)
  store/
    authStore.ts     # auth + role state
    profileStore.ts  # onboarding profile state
  test/
    setup.ts
    example.test.ts
```

## Routing Map

| Route | Screen |
|---|---|
| `/` | Landing page |
| `/explore` | Explore places (list/map + filters) |
| `/place/:id` | Place details |
| `/onboarding` | Traveler onboarding wizard |
| `/recommendations` | Personalized recommendations |
| `/login` | Tourist/guide login |
| `/register` | Tourist registration |
| `/guide/register` | Guide registration |
| `/guide/dashboard` | Guide dashboard |
| `/community` | Community feed |
| `/booking/:id` | Booking flow |
| `/bookings` | Booking history |
| `/profile` | Tourist profile |
| `/guide/profile` | Guide profile (shared screen) |
| `/events` | Events listing |
| `/events/:id` | Event details |

## Getting Started

### Prerequisites

- Node.js 18+ (recommended LTS)
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Vite is configured to run on port `8080` (`vite.config.ts`).

Open:

- `http://localhost:8080`

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run build:dev` - development-mode build
- `npm run preview` - preview built output
- `npm run lint` - run ESLint
- `npm run test` - run Vitest once
- `npm run test:watch` - run Vitest in watch mode

## State and Data Model

- `authStore` tracks current user and role (`tourist` / `guide`).
- `profileStore` tracks onboarding answers and completion state.
- Main datasets are in `src/shared/lib/mockData.ts`:
  - `mockPlaces`
  - `mockGuides`
  - `mockBookings`
  - `mockPosts`
  - `mockEvents`

Because data is mocked, actions like booking, login, liking, and comments are local/UI-level behaviors.

## Testing Status

Current automated tests are minimal (starter level).

Latest local run:

- `npm run test` -> 1 file passed, 1 test passed.

## Current Limitations

- No backend or persistent database.
- No real authentication/session management.
- No real booking/event/community APIs.
- Guide-only tabs include placeholder destinations not yet implemented (`/guide/places`, `/guide/bookings`, `/guide/training`).
- Internationalization and text encoding should be normalized in some UI strings.

## Suggested Next Steps

1. Add API layer and replace mock data with backend services.
2. Protect role-specific routes and add auth guards.
3. Expand test coverage for critical user flows (onboarding, booking, routing).
4. Implement missing guide routes and screens.
5. Add CI checks for lint, test, and build.

## License

No license file is currently included in this repository.
