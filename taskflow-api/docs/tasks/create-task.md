# Feature: Create a task

## User outcome
An authenticated user can create a task and receive the stored task.

## Acceptance criteria
- `POST /tasks` requires a valid bearer token.
- `title` is trimmed and contains 1–120 characters.
- The task belongs to the authenticated user.
- The response status is 201.
- Invalid input returns a stable 400 response.
- A test proves the success and failure paths.
