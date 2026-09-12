# Recommended branch protection

Protect `main` with these repository settings:

- Require the `quality` and `browser` checks.
- Require at least one approval and CODEOWNER review.
- Dismiss stale approvals when code changes.
- Require all conversations to be resolved.
- Require branches to be current before merge.
- Block force pushes and branch deletion.
- Allow squash merges and delete merged branches.

For higher-risk products, add signed commits, deployment approval, and a second
owner review. These are GitHub settings and cannot be enforced by application
source code alone.
