# Last Real JMeter Run

**Profile:** 5 users, 2 iterations against the full booking funnel (home → flight search → select flight → purchase page), as configured in [`jmeter/BlazeDemo-LoadTest.jmx`](jmeter/BlazeDemo-LoadTest.jmx).

```
summary =     40 in 00:00:16 =    2.5/s Avg:   515 Min:   470 Max:   706 Err:     0 (0.00%)
```

**Result:** 40 samples, 0 errors, average 515ms, max 706ms — clean baseline, no rate-limiting hit this run (see [`sprint-01-report.md`](../07-reports/sprint-01-report.md) for the documented real rate-limiting BlazeDemo has served in earlier back-to-back runs — the CI gate is deliberately a 5% error-rate threshold, not zero-tolerance, because of that).
