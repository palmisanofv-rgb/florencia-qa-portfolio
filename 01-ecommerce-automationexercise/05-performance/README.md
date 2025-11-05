# Performance — k6

Light smoke test (5 virtual users, 30s) against the two highest-traffic API endpoints (`/api/productsList`, `/api/searchProduct`) — see [`00-qa-strategy-and-leadership`](../../00-qa-strategy-and-leadership) for why this portfolio never runs anything heavier against a public third-party site.

## Running

```bash
k6 run smoke-test.js
```

## Thresholds

- 95th percentile response time under 2s
- Error rate under 1%

See [`../07-reports`](../07-reports) for real results from a CI run.
