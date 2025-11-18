# Last Real k6 Run

**Run date:** captured live during this project's deepening pass.
**Profile:** staged ramp (10s → 8 VUs, 20s steady at 8 VUs, 10s ramp down), 4 checks per iteration against `productsList`, `brandsList`, `searchProduct`, and a read-only `verifyLogin` auth-boundary check.

```
checks.........................: 100.00% 896 out of 896
http_req_duration...............: avg=241.59ms min=203.64ms med=234.16ms max=828.29ms p(90)=269.26ms p(95)=277.31ms
http_req_failed..................: 0.00%   0 out of 512
http_reqs........................: 512     12.275008/s
iterations........................: 128     3.068752/s
vus_max...........................: 8
```

**Thresholds:** both configured thresholds passed — `http_req_duration p(95)<2000ms` (actual: 277ms) and `http_req_failed rate<0.01` (actual: 0%).

**Result:** clean baseline. No errors, no threshold breaches, well under the 2s latency budget even at peak concurrency. See [`../07-reports/final-report.md`](../07-reports/final-report.md) for how this fits into the overall project result.
