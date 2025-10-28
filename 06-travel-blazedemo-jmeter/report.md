# Load Test Report — BlazeDemo (light smoke test)

## Run configuration

5 virtual users, 2 iterations, 1s think-time between requests (10 full journeys total across the run — a capability demo, not a stress test).

## Results (representative — see README for how to reproduce)

| Request | Assertion | Result |
|---------|-----------|--------|
| Home | Contains "Find Flights" | Pass |
| Search Flights | Contains "Choose This Flight" | Pass |
| Select Flight | Contains "has been reserved" | Pass |
| Purchase | Contains "Thank you for your purchase today!" + < 3000ms | Pass |

## Finding

The purchase confirmation heading is hardcoded to "TLV to SFO" regardless of the actual cities searched (verified: searched Boston → London, page still read "TLV to SFO"). Documented in [`test-plan.md`](test-plan.md) as a low-severity content-accuracy defect.

## Execution note

Not run against a live JMeter installation in this environment (no JVM/JMeter binary available here). Every endpoint, field name and expected response string in the `.jmx` was confirmed against BlazeDemo's real HTML via direct HTTP requests before being encoded into the test plan.
