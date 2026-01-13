# Sprint 02 Report — Swag Labs (saucedemo.com)

**Sprint goal:** close sprint 1's one flagged residual-risk item (seeded-defect accounts only checked for login success, not their actual defects), automate the last manual test case, capture real evidence, and fold in the portfolio-wide accessibility spot-check.

## Planned vs. delivered

| Planned | Delivered |
|---------|-----------|
| Real assertions for `problem_user`/`performance_glitch_user`'s specific defects | ✅ Verified live against the site before writing the assertions (see below) |
| Automate the remaining manual test case (TC-10, sort) | ✅ [`inventory-sort.spec.ts`](../03-automation/tests/inventory-sort.spec.ts) |
| Real evidence for all 10 test cases | ✅ 11 screenshots in [`06-evidence`](../06-evidence) |
| Fold accessibility findings into this project's own reports | ✅ [`04-security-api/security-checks.md`](../04-security-api/security-checks.md) |
| Deepen the performance test | ✅ staged load profile; real run in [`05-performance/last-run-results.md`](../05-performance/last-run-results.md) |

## Defects / findings this sprint

1. **`problem_user`'s product images are a single repeated broken placeholder, not distinct product photos.** Confirmed live before writing the assertion: `standard_user`'s inventory page has 6 distinct image URLs; `problem_user`'s has all 6 items pointing at the same `sl-404.*.jpg`. Now asserted directly in [`seeded-accounts-login.spec.ts`](../03-automation/tests/seeded-accounts-login.spec.ts).
2. **`performance_glitch_user`'s delay is real and measured, not assumed.** A real captured run: `standard_user` logs in in ~524ms, `performance_glitch_user` in ~5.1s — roughly 11x slower. Asserted as "measurably slower than standard_user, but still completes within a generous 15s bound" rather than a brittle exact-millisecond check.
3. **Re-attempted the inventory-page keyboard-reachability check from sprint 1's `accessibility-check.md`** (previously marked inconclusive due to a browser-automation tooling issue). The same tooling issue reproduced again this session — Tab key presses did not register reliably against the live browser. Left as inconclusive rather than fabricating a clean result; this is a genuine open item, not a smoothed-over gap.
4. **A planned k6 deepening (fetching the actual JS bundle URL) turned up a real, if minor, finding of its own:** a plain HTTP client receives a much shorter, simplified HTML response from saucedemo.com (1.3KB, no script tags at all) than a real browser does — consistent with the bot-aware serving behavior already documented elsewhere in this portfolio (Project 01, Project 04). Documented in [`05-performance/smoke-test.js`](../05-performance/smoke-test.js) rather than worked around with a fragile regex against content this client doesn't receive.

## Metrics

| Metric | Sprint 01 | Sprint 02 |
|--------|-----------|-----------|
| Automation ratio | 9/10 | **10/10** |
| Seeded accounts with a defect-specific assertion (not just login) | 0/2 | **2/2** |
| Evidence screenshots | 0 real | **11 real** |
| Open defects | 0 | 0 (both new findings this sprint are seeded/documented account behaviors being asserted, not new product defects) |
