# Test Report — Parabank

## Real CI run (GitHub Actions) — several rounds, two different failure classes

| Round | Bug found | Root cause | Fix |
|-------|-----------|-----------|-----|
| 1 | Invalid-password test failed on a wrong string match | Assumed error text "could not be **validated**"; Parabank's actual copy is "could not be **verified**" | Updated the assertion to the real string |
| 1 | Both transfer tests failed with `NoSuchElementException` | Fragile `//a[text()='{id}']/ancestor::tr` XPath didn't reliably match the account-number link | Rewrote `AccountsOverviewPage` to read `#accountTable` row-by-row instead of searching by link text |
| 3 | Registration "succeeded" (title: "Customer Created") but the suite reported it as not landing on the dashboard | An instant `"Log Out" in driver.page_source` check doesn't wait or retry - it raced a still-settling redirect. Once, it genuinely hit a Cloudflare **"Just a moment..."** interstitial on Parabank's shared public demo instance | Replaced with a real `WebDriverWait` for the `Log Out` link, which covers both a slow redirect and a self-resolving bot check |
| 4 | Same page_source race, in a different spot (`test_login.py`), plus `get_account_ids()`/`get_balance()` still occasionally saw an empty accounts table | Parabank populates `#accountTable`'s rows slightly *after* the page's initial HTML (an AJAX-style fill-in) - any instant read can catch it half-empty, and implicit wait doesn't help because the table isn't literally absent, just short a row | Added an explicit `WebDriverWait` in `AccountsOverviewPage._rows()` that waits for at least one row with a real numeric account id, and switched `test_login.py`'s dashboard check to wait for the `<h1>Accounts Overview</h1>` heading instead of an instant `page_source` check |
| 6 | Transfer tests failed with `Account  not found` (blank id) for the *newly opened* savings account specifically | `OpenAccountPage.get_new_account_id()` read `#newAccountId`'s text the instant the element existed, but - the exact same failure mode as the accounts table - its text fills in slightly after the element appears | Waited for `.text` to be non-empty via `WebDriverWait`, not just for the element to exist; also bumped the accounts-table wait from 10s to 15s after one run timed out under what looked like normal server load rather than a code issue |
| 7 | `assert 'Transfer Complete' in ''` - the confirmation text came back empty | Same failure mode a fourth time: `#showResult h1` exists as soon as the transfer form submits, but Parabank fills its text in via AJAX slightly after | Applied the identical non-empty-text `WebDriverWait` to `TransferPage.get_confirmation_text()` |

By round 7 this had become a recognizable pattern specific to this application, not four unrelated bugs: Parabank consistently renders a container element first and fills its text in a beat later (accounts table, new-account id, transfer confirmation). Once that pattern was recognized, later instances took one fix instead of a fresh round of guessing.

Two real lessons here, both applicable beyond this one project: (1) an instant string-in-`page_source` check is not the same as a wait, and a passing test today can start failing tomorrow purely on timing; (2) a shared public demo instance can occasionally serve a bot-detection challenge instead of your actual page, which a resilient wait can ride out but a code fix alone cannot guarantee against every time. On (2): the Cloudflare "Just a moment..." interstitial recurred in a later run (page title confirmed via the assertion's own diagnostic message), on a completely unrelated line of code — direct confirmation this is Parabank's shared infrastructure being occasionally cautious about CI traffic, not a defect in this suite.

See CI badge on the [root README](../README.md) for the current run.

## Summary

| Test | Result | Notes |
|------|--------|-------|
| Login with freshly registered account | Pass (first try) | |
| Login with invalid password rejected | Pass (after fix above) | |
| Transfer reconciles both account balances | Pass (after fix above) | Balances independently recomputed before/after, not just the confirmation banner |
| Transfer of $0 accepted without balance change | **Finding** | Parabank shows "Transfer Complete" for a $0 transfer instead of rejecting it — flagged as a real (if low-severity) UX/audit-trail gap for a banking product, not treated as a pass/fail bug in the suite itself |
| SQL reconciliation (local mock ledger) | Pass | Balance-vs-ledger drift check and double-entry check both clean on seed data |
