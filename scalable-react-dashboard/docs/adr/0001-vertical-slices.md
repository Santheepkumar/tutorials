# ADR 0001: Directional vertical slices

- Status: accepted
- Date: 2026-09-11

## Context

The application must support independent feature work without creating a
global utilities layer or circular dependencies.

## Decision

Use the dependency direction `app → routes → features → entities → shared`.
Each feature and entity exposes a small public `index.ts`; consumers do not
reach into another slice's internal folders. Server state belongs to TanStack
Query, shareable navigation state belongs to the URL, and transient UI state
stays local.

## Consequences

Ownership and deletion remain clear, and routes can be split by default. Some
small duplication is acceptable until two real consumers establish a stable
shared abstraction. ESLint rejects imports that bypass a slice's public API.
