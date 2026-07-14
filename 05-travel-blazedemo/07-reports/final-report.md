# Final Report — BlazeDemo

## Summary

Booking funnel automated end-to-end and load-tested lightly in the same project, reflecting that functional and performance risk are inseparable on a booking flow. Two sprints: [sprint 01](sprint-01-report.md) built the suite and found the hardcoded-confirmation-route defect; [sprint 02](sprint-02-report.md) re-ran everything live (Playwright + JMeter), captured real evidence, and folded in the accessibility spot-check.

## Coverage achieved

- 5/5 test cases, **5/5 automated** (4/4 functional + 1/1 performance — corrected from an earlier "4/5" phrasing that miscounted the functional total; verified directly against [`test-cases.csv`](../02-test-cases/test-cases.csv))
- Accessibility spot-check: clean pass on every dimension checked (5.17:1 contrast, 6-tab keyboard reachability with a visible focus indicator)
- 5 real evidence screenshots in [`06-evidence`](../06-evidence)
- Real JMeter run: 40 samples, 0 errors, avg 515ms — see [`05-performance/last-run-results.md`](../05-performance/last-run-results.md)

## Findings

| Finding | Severity | Status |
|---|---|---|
| Purchase-page heading hardcoded regardless of route searched | Low | Reported, not fixed (third-party site) |
| No security headers present | Low-Medium | Reported, not fixed (third-party site) — the weakest header posture of any project in this portfolio |

## What a test manager would report upward

*"The booking funnel works and holds up under light concurrent load — both verified independently, not assumed from one or the other. All 5 test cases automated, including the performance check. One low-severity content-accuracy finding on file; accessibility is clean on every dimension checked."*
