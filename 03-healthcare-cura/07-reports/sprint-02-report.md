# Sprint 02 Report — CURA Healthcare

**Sprint goal:** confirm the suite still runs cleanly against the live site (Selenium/Java, run via a fresh Maven+JDK setup rather than assumed working), capture real evidence, fold in the accessibility spot-check, and deepen performance.

## Planned vs. delivered

| Planned | Delivered |
|---------|-----------|
| Confirm the suite runs live, not just reads correctly | ✅ `mvn test` — BUILD SUCCESS, 3/3 net tests passing (see below on the retry) |
| Real evidence for all automated test cases | ✅ 5 screenshots in [`06-evidence`](../06-evidence), regenerated this sprint |
| Fold accessibility findings into this project's own reports | ✅ [`04-security-api/security-checks.md`](../04-security-api/security-checks.md) |
| Deepen the performance test | ✅ staged load profile; real run in [`05-performance/last-run-results.md`](../05-performance/last-run-results.md) |
| Re-evaluate TC-05 (past date) for automation | Investigated, kept manual — see below |

## What this sprint confirmed

1. **The suite genuinely still runs, including the documented flaky-widget retry.** `confirmationScreenMatchesSubmittedFacility` needed its retry this run — TestNG recorded the first attempt as skipped and the retry as the counted result, exactly the CI-load-dependent calendar-widget behavior [`FlakyDemoRetry`](../03-automation/src/test/java/tests/FlakyDemoRetry.java) and sprint 1's report already documented. Not a new finding — confirmation that the existing mitigation still does its job.
2. **TC-05 (past date) stays manual, and this sprint checked why more carefully rather than assuming.** The datepicker helper (`AppointmentPage.selectVisitDate`) only ever navigates *forward* a month at a time, and its day-selection XPath explicitly excludes `old`/`new` (adjacent-month, grayed-out) days — meaning it's structurally unable to select a genuinely past date without new navigation logic the widget's own fragility (see sprint 1's 10-round debugging log) makes risky to add for a P2 exploratory scenario. Kept manual by design, not by default.
3. **Accessibility is the cleanest result in the portfolio so far** on the dimensions that could be checked: 12.63:1 contrast, 2-tab keyboard reachability, and — unlike Projects 01 and 02 — a genuinely visible focus indicator on the button.
4. **Performance is clean**, no sign of the shared-instance flakiness seen elsewhere in this portfolio.

## Metrics

| Metric | Value |
|--------|-------|
| Test cases automated | 4/5 (unchanged — TC-05 stays deliberately manual) |
| Evidence screenshots | 5 real (regenerated this sprint) |
| Security findings | 1 (missing headers, unchanged) |
| Accessibility findings | 0 — clean pass |
| Open defects | 0 |
