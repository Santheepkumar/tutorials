# Agent Guide

## Mission

Keep Project Atlas easy to change for humans and coding agents. Make the
smallest complete change that satisfies the issue and preserves module
boundaries.

## Read before editing

1. Read the issue, acceptance criteria, and relevant ADRs.
2. Inspect the nearest route, feature, entity, and shared public API.
3. Check current library documentation before using unfamiliar APIs.
4. State the files and behavior you intend to change.

## Architecture boundaries

- `app` composes providers and routes.
- `routes` assemble complete screens.
- `features` contain user interactions.
- `entities` own domain data, queries, and UI.
- `shared` contains domain-neutral code only.
- Import features and entities through their `index.ts` public API.
- Keep server state in TanStack Query and shareable state in the URL.
- Never place credentials in `VITE_` variables or browser code.

## Required verification

Run focused tests while editing. Before requesting review, run:

```bash
npm run check
npm run e2e
git diff --check
git status --short
```

Review the complete diff, dependency changes, generated files, console output,
responsive layout, keyboard behavior, and error states. Do not claim a command
passed unless you ran it in the current checkout.

## Definition of done

- Acceptance criteria are demonstrably met.
- Loading, error, empty, and success paths remain intentional.
- Types, lint, tests, build, size, accessibility, and browser checks pass.
- No secrets, personal data, debug logs, or unrelated edits are included.
- The pull request explains risk, evidence, and rollback.
