# Contributing

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The development server starts a Mock Service Worker, so no backend account or
secret is required.

## Change workflow

1. Start from an issue with acceptance criteria and a small rollback plan.
2. Create a short-lived branch such as `feat/project-filters`.
3. Keep changes inside one vertical slice unless an ADR approves a new shared
   abstraction.
4. Add or update tests for observable behavior.
5. Run `npm run check` and `npm run e2e`.
6. Review `git diff`, staged files, lockfile changes, and potential secrets.
7. Open a focused pull request using a Conventional Commit title.

## Pull requests

Pull requests require green CI, resolved conversations, and the owners named in
CODEOWNERS. Prefer squash merge. Avoid drive-by formatting or dependency
updates in feature pull requests.

## Before shipping

Verify the preview environment, responsive and keyboard flows, production
bundle, accessibility report, dependency audit, monitoring signal, and rollback
procedure. A passing unit test suite is necessary but not sufficient evidence.
