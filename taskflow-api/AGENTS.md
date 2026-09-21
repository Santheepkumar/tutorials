# TaskFlow Agent Guide

## Goal
Keep this API easy to understand, test, and change safely.

## Before editing
1. Read the relevant file in `docs/tasks/`.
2. Restate the acceptance criteria.
3. Find the smallest module that owns the change.

## Rules
- Keep routes thin; business rules belong in services.
- Access storage only through `TaskRepository`.
- Validate every external value with a schema.
- Never log passwords, tokens, or secrets.
- Add or update a test for every behavior change.
- Do not change public response shapes silently.

## Required checks
Run `npm run check` before declaring work complete.

## Completion report
List changed files, tests run, and any remaining risk.
