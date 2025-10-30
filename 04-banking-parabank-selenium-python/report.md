# Test Report — Parabank

## Real CI run (GitHub Actions)

First run: 1/4 passed, 3 failed — all three failures were genuine locator/assumption bugs, now fixed:

| Bug found | Root cause | Fix |
|-----------|-----------|-----|
| Invalid-password test failed on a wrong string match | Assumed error text "could not be **validated**"; Parabank's actual copy is "could not be **verified**" | Updated the assertion to the real string |
| Both transfer tests failed with `NoSuchElementException` on the accounts table | `get_balance()` used a fragile `//a[text()='{id}']/ancestor::tr` XPath that didn't reliably match the account-number link | Rewrote `AccountsOverviewPage` to read `#accountTable` row-by-row (`cells[0]` = account id, `cells[1]` = balance) instead of searching by link text |

See CI badge on the [root README](../README.md) for the current run.

## Summary

| Test | Result | Notes |
|------|--------|-------|
| Login with freshly registered account | Pass (first try) | |
| Login with invalid password rejected | Pass (after fix above) | |
| Transfer reconciles both account balances | Pass (after fix above) | Balances independently recomputed before/after, not just the confirmation banner |
| Transfer of $0 accepted without balance change | **Finding** | Parabank shows "Transfer Complete" for a $0 transfer instead of rejecting it — flagged as a real (if low-severity) UX/audit-trail gap for a banking product, not treated as a pass/fail bug in the suite itself |
| SQL reconciliation (local mock ledger) | Pass | Balance-vs-ledger drift check and double-entry check both clean on seed data |
