# Sprint 02 Report — BlazeDemo

**Sprint goal:** re-confirm the Playwright suite and the real JMeter plan both still run live, capture real evidence, fold in accessibility, and fix a real reporting inaccuracy in the coverage numbers.

## Planned vs. delivered

| Planned | Delivered |
|---------|-----------|
| Confirm Playwright suite runs live | ✅ 2/2 tests pass, hardcoded-route finding reproduced live in the console output |
| Confirm the real JMeter plan still runs | ✅ 40 samples, 0 errors, avg 515ms — see [`05-performance/last-run-results.md`](../05-performance/last-run-results.md) |
| Real evidence for all test cases | ✅ 5 screenshots in [`06-evidence`](../06-evidence) |
| Fold accessibility findings into this project's own reports | ✅ [`04-security-api/security-checks.md`](../04-security-api/security-checks.md) — clean pass |
| Fix the coverage-ratio phrasing in final-report.md | ✅ was "4/5 automated (functional)"; the real functional total is 4/4 (TC-05 is the separate performance test case) — verified directly against the CSV rather than re-trusting the old phrasing |

## What this sprint confirmed

1. **The hardcoded-confirmation-route finding still reproduces live**, console-logged during this run exactly as documented in sprint 1: "purchase-page heading reads 'Your flight from TLV to SFO has been reserved.' despite searching Boston -> London."
2. **The coverage number in `final-report.md` was miscounted, not just oddly worded.** "4/5 automated (functional)" implied one functional test case was manual — there isn't one. The CSV has exactly 4 functional test cases (TC-01–04) and 1 performance test case (TC-05), all 5 automated. Corrected rather than left as an ambiguous phrasing that reads like a real gap.
3. **Accessibility is clean on every dimension checked** — the second project in this portfolio (after CURA) with zero accessibility findings.

## Metrics

| Metric | Value |
|--------|-------|
| Automation ratio | 5/5 (corrected from a miscounted "4/5 functional" phrasing) |
| Evidence screenshots | 5 real |
| JMeter: samples / errors / avg | 40 / 0 / 515ms |
| Accessibility findings | 0 — clean pass |
| Open defects | 0 (1 low-severity content finding, unchanged from sprint 1) |
