# Final Report — CURA Healthcare

## Summary

Automated the highest-risk part of a legacy appointment-booking system: confirming that what a patient books is exactly what the confirmation screen shows.

## Coverage achieved

- 5/5 test cases documented, 4/5 automated
- Session/access-control verified server-side (real 302 redirect on unauthenticated access, not assumed)

## Residual risk

- Past-date validation (TC-05) is not enforced by the app and is documented as an exploratory finding, not an automated assertion — a real system would need a product decision on whether this is in-scope to fix.

## What a test manager would report upward

*"The one scenario that actually matters on a booking system — does the confirmation match what was submitted — is automated and green. Access control is server-enforced, confirmed by a real redirect, not just a UI assumption. One data-validation gap (past dates) is flagged for a product decision, not silently accepted."*
