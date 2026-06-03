# Final Report — BlazeDemo

## Summary

Booking funnel automated end-to-end and load-tested lightly in the same project, reflecting that functional and performance risk are inseparable on a booking flow.

## Coverage achieved
- 5/5 test cases, 4/5 automated (functional), 1/1 automated (performance)

## Findings
- Purchase-page heading hardcoded regardless of route searched (low severity, third-party site, reported not fixed)
- No security headers present (low-medium, third-party site, reported not fixed)

## What a test manager would report upward

*"The booking funnel works and holds up under light concurrent load — both verified independently, not assumed from one or the other. One low-severity content-accuracy finding on file."*
