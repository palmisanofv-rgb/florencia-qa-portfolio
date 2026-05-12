# Last Real k6 Run

**Profile:** staged ramp (5s → 5 VUs, 10s steady, 5s ramp down) against the real REST API — a single account lookup and a customer's full accounts list.

```
checks.........................: 100.00% 232 out of 232
http_req_duration...............: avg=198.63ms min=194.09ms med=197.92ms max=211.78ms p(90)=201.81ms p(95)=203.56ms
http_req_failed..................: 0.00%   0 out of 116
http_reqs........................: 116     5.512433/s
```

**Thresholds:** both passed — `http_req_duration p(95)<2000ms` (actual: 204ms) and `http_req_failed rate<0.01` (actual: 0%).

**Note:** this script previously hit a nonexistent account id (`12345`, confirmed live to return `400 Could not find account #12345`), so its "returns 200" check had been silently failing every run. Fixed to use customer 12212's real, stable checking account (`13344`) — see [`smoke-test.js`](smoke-test.js) for detail.
