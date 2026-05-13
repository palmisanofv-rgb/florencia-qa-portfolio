# Final Report — Parabank

## Summary

Full-lifecycle project on a system framed as legacy core banking: registration → login → transfer, with independent balance reconciliation (not just success banners), a real public API covered, and a SQL-level data-validation technique demonstrated locally. Two sprints: [sprint 01](sprint-01-report.md) built the suite and found the broken-authentication defect; [sprint 02](sprint-02-report.md) fixed a real bug in the $0-transfer test (it was failing every run for the wrong reason), fixed a real bug in the k6 script (hitting a nonexistent account id), captured real evidence, and folded in accessibility findings.

## Coverage achieved

- 7/7 test cases documented and automated
- API: 4 scenarios against the real Parabank REST service (account lookup, customer accounts list, invalid-account error handling, authorization boundary)
- Security: 4 findings (broken authentication, session cookie flags, missing headers, $0-transfer accepted)
- Accessibility: 3 findings (missing accessible name on an icon link, contrast fail, slow keyboard reachability) — see [`04-security-api/security-checks.md`](../04-security-api/security-checks.md)
- 10 real evidence screenshots in [`06-evidence`](../06-evidence)

## Defects / findings

| Finding | Severity | Status |
|---------|----------|--------|
| **Login accepts any password for a valid username** (broken authentication, OWASP A07:2021) | **High** | Reported (third-party site); asserted directly in [`test_login.py`](../03-automation/tests/test_login.py) |
| Missing accessible name on the "Admin Page" nav icon link | Medium | Reported (third-party site) |
| "Log In" button fails WCAG contrast (3.14:1 vs. 4.5:1 required) | Medium | Reported (third-party site) |
| Session cookie missing `SameSite`/`Secure` | Medium | Reported (third-party site) |
| "Log In" button takes 13 keyboard tabs to reach | Medium | Reported (third-party site) |
| $0 transfer accepted without rejection | Low | Reported (third-party site); asserted directly in [`test_transfer.py`](../03-automation/tests/test_transfer.py) |
| Missing security headers | Low-Medium | Reported (third-party site) |

## Residual risk

- The $0-transfer finding would, in a real product, need a product-owner decision on whether it's actually a defect (some systems intentionally allow $0 transfers as a "verify these accounts are linked" pattern) — flagged, not assumed.
- The broken-authentication finding is the highest-severity issue in this entire portfolio; on a real product this would be a stop-ship defect, not a hardening recommendation.

## What a test manager would report upward

*"Money movement is verified at the ledger level, not just the confirmation screen — this is the one thing that actually matters on a banking system, and it's automated and green. One critical security finding: the login form doesn't actually validate passwords, confirmed independently outside the browser via curl, not assumed from a flaky-looking test. Three accessibility issues and two lower-severity hardening items also filed. One UX/audit-trail question flagged for product on the $0 transfer behavior."*
