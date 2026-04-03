# Final Report — Parabank

## Summary

Full-lifecycle project on a system framed as legacy core banking: registration → login → transfer, with independent balance reconciliation (not just success banners), a real public API covered, security findings on the session cookie, and a SQL-level data-validation technique demonstrated locally.

## Coverage achieved

- 7/7 test cases documented and automated
- API: 3 scenarios against the real Parabank REST service
- Security: 2 findings (session cookie flags, missing headers)

## Defects / findings

| Finding | Severity | Status |
|---------|----------|--------|
| $0 transfer accepted without rejection | Low | Reported (third-party site) |
| Session cookie missing `SameSite`/`Secure` | Medium | Reported (third-party site) |
| Missing security headers | Low-Medium | Reported (third-party site) |

## Residual risk

- The $0-transfer finding would, in a real product, need a product-owner decision on whether it's actually a defect (some systems intentionally allow $0 transfers as a "verify these accounts are linked" pattern) — flagged, not assumed.

## What a test manager would report upward

*"Money movement is verified at the ledger level, not just the confirmation screen — this is the one thing that actually matters on a banking system, and it's automated and green. Two security hardening items filed on the session cookie and response headers. One UX/audit-trail question flagged for product on the $0 transfer behavior."*
