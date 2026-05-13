# Sprint 02 Report — Parabank

**Sprint goal:** confirm the suite still runs live against production (Selenium/Python, via a fresh Python+pip toolchain), investigate a real test failure found during that setup, capture real evidence, and deepen performance/accessibility.

## Planned vs. delivered

| Planned | Delivered |
|---------|-----------|
| Confirm the suite runs live | ✅ `pytest` — first run: 3 passed, 1 failed (real bug found, see below); after the fix, 4/4 pass |
| Real evidence for all test cases | ✅ 10 screenshots in [`06-evidence`](../06-evidence) |
| Fold accessibility findings into this project's own reports | ✅ [`04-security-api/security-checks.md`](../04-security-api/security-checks.md) |
| Deepen the performance test | ✅ staged load profile + a real bug fix (see below); real run in [`05-performance/last-run-results.md`](../05-performance/last-run-results.md) |
| Add the broken-authentication finding to the final report's defects table | ✅ it was missing entirely despite being documented in `security-checks.md` since sprint 1 |

## Defects / findings this sprint

1. **Real test bug: `test_transfer_of_zero_amount_is_rejected` was failing on every run, for the wrong reason.** The test read the post-transfer balance while still on the transfer confirmation page (`#showResult`), which has no `#accountTable` at all — `AccountsOverviewPage._rows()` then waited its full 15s timeout for an element that could never appear on that page. Fixed by navigating to `overview.htm` before reading balances, and strengthened the test to transfer between two *distinct* accounts (the original same-account-to-itself transfer was tautologically unable to show a balance change either way, regardless of whether the transfer was accepted or rejected).
2. **Real k6 bug: the performance script was silently checking a nonexistent account.** `/accounts/12345` returns `400 Could not find account #12345` (confirmed live), not `200` — so the "returns 200" check had been failing every run without anyone noticing, since k6 doesn't fail the whole run on a check failure by default. Fixed to use customer 12212's real, stable checking account (13344), the same known-good seeded demo customer already referenced elsewhere in this project's security checks.
3. **Real reporting gap: the final report's defects table didn't include the broken-authentication finding at all**, despite it being the highest-severity issue in the entire portfolio and fully documented in `security-checks.md` since sprint 1. Added.

## Metrics

| Metric | Sprint 01 | Sprint 02 |
|--------|-----------|-----------|
| Test suite result | 3/4 passing (1 real bug undiscovered) | **4/4 passing** |
| Performance checks passing | Silently 50% (unnoticed) | **100%, confirmed** |
| Defects in final report | 3 of 4 known findings | **All 4** (broken auth added) |
| Evidence screenshots | 0 real | **10 real** |
| Accessibility findings folded in | No | **Yes, 3 findings** |
