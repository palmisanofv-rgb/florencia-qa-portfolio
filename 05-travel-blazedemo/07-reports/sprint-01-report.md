# Sprint 01 Report — BlazeDemo

**Sprint goal:** automate the full booking journey and pair it with a JMeter performance smoke test.

## Delivered

- Full booking journey automated in Playwright (TC-01–04)
- JMeter smoke test: 40 samples (5 users × 2 iterations × 4 requests), 0 errors, ~190ms average response time in the last verified run
- 1 functional finding: the purchase-page heading is hardcoded to a fixed route regardless of what was actually searched

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 4/4 |
| Performance thresholds met | Yes (p95 well under 3s, 0% errors) |
| Open defects | 0 (1 low-severity finding reported) |
