# Last Real k6 Run

**Profile:** staged ramp (5s → 5 VUs, 10s steady, 5s ramp down) against the home and login pages.

```
checks.........................: 100.00% 116 out of 116
http_req_duration...............: avg=168.22ms min=159.84ms med=166.62ms max=176.12ms p(90)=174.51ms p(95)=175.08ms
http_req_failed..................: 0.00%   0 out of 116
http_reqs........................: 116     5.620915/s
```

**Thresholds:** both passed — `http_req_duration p(95)<2000ms` (actual: 175ms) and `http_req_failed rate<0.01` (actual: 0%).

**Result:** clean baseline, well under budget. No signs of the shared-instance flakiness that shows up intermittently elsewhere in this portfolio (Parabank's bot-check, BlazeDemo's rate limiting) — this run was clean start to finish.
