# Performance — k6

Light smoke test with a staged load profile (ramp to 8 VUs, hold, ramp down — ~40s total) against 4 API endpoints: `/api/productsList`, `/api/brandsList`, `/api/searchProduct`, and a read-only `/api/verifyLogin` auth-boundary check under load. See [`00-qa-strategy-and-leadership`](../../00-qa-strategy-and-leadership) for why this portfolio never runs anything heavier against a public third-party site.

## Running

```bash
k6 run smoke-test.js
```

## Thresholds

- 95th percentile response time under 2s
- Error rate under 1%

See [`last-run-results.md`](last-run-results.md) for a real captured run (100% checks passed, 0% errors, p95 277ms) and [`../07-reports`](../07-reports) for how it fits into the overall project result.
