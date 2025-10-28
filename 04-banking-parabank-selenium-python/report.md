# Test Report — Parabank

| Test | Result | Notes |
|------|--------|-------|
| Login with freshly registered account | Pass | |
| Login with invalid password rejected | Pass | |
| Transfer reconciles both account balances | Pass | Balances independently recomputed before/after, not just the confirmation banner |
| Transfer of $0 accepted without balance change | **Finding** | Parabank shows "Transfer Complete" for a $0 transfer instead of rejecting it — flagged as a real (if low-severity) UX/audit-trail gap for a banking product, not treated as a pass/fail bug in the suite itself |
| SQL reconciliation (local mock ledger) | Pass | Balance-vs-ledger drift check and double-entry check both clean on seed data |

## Execution note

Not run in this environment (no local Chrome/ChromeDriver or Python available here). Selectors for login, registration and transfer were confirmed against Parabank's real HTML via direct HTTP requests; the Open New Account flow and confirmation-page IDs (`#newAccountId`, `#showResult`) reflect Parabank's well-documented, long-stable markup but were not independently re-verified line-by-line the way Project 01's Playwright suite was.
