# Scalable React Dashboard

A runnable companion to the Reelcode tutorial “Build a Scalable React
Frontend.” It demonstrates a feature-oriented React architecture that stays
understandable as traffic and the engineering team grow.

## Stack

- React and TypeScript on Vite
- React Router for URL-driven navigation
- TanStack Query for server state
- Zod validation at the API boundary
- CSS Modules for component styles
- MSW for deterministic browser and test APIs
- Vitest, Testing Library, Playwright, and axe

## Run it

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/projects`. No backend is needed in development.

## Quality gates

```bash
npm run check
npm run e2e
```

`check` verifies formatting, lint rules, strict types, coverage, production
build output, and the JavaScript size budget. Browser tests verify navigation,
filter persistence, and serious accessibility violations.

## State ownership

- Remote project data and cache state: TanStack Query.
- Search and page values that should survive refresh or sharing: the URL.
- Unsubmitted search text and other temporary interactions: local component
  state.

MSW is a development boundary, not a production backend. Replace the handlers
with a real API without changing route or entity UI contracts.
