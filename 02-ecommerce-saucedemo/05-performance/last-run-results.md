# Last Real k6 Run

**Profile:** staged ramp (5s → 5 VUs, 10s steady, 5s ramp down) against the home page.

```
checks.........................: 100.00% 78 out of 78
http_req_duration...............: avg=15.53ms min=8.11ms med=14.98ms max=34.84ms p(90)=17.95ms p(95)=24.01ms
http_req_failed..................: 0.00%   0 out of 78
http_reqs........................: 78      3.828196/s
```

**Thresholds:** both passed — `http_req_duration p(95)<1500ms` (actual: 24ms) and `http_req_failed rate<0.01` (actual: 0%).

**Note on scope:** a plain HTTP client (this k6 script) receives a much shorter, simplified HTML response from saucedemo.com than a real browser does (1.3KB, no script tags) — the same bot-aware serving behavior documented elsewhere in this portfolio. That ruled out a planned deeper check (fetching the actual JS bundle URL parsed out of the HTML), so this stays a plain page-load smoke test rather than a fragile check against content this client never actually receives.
