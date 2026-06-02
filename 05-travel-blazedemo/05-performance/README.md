# Performance — JMeter

Light smoke test (5 users, 2 iterations) of the full booking journey — see the ⚠️ responsible-use note below.

## ⚠️ Responsible-use note

This is a **capability demo, not a stress test**. Do not raise the thread count against this or any other third-party site without explicit permission.

```bash
jmeter -n -t jmeter/BlazeDemo-LoadTest.jmx -l results.jtl -e -o report-html/
```

See [`../07-reports`](../07-reports) for real results.
