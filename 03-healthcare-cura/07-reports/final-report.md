# Final Report — CURA Healthcare

## Summary

Automated the highest-risk part of a legacy appointment-booking system: confirming that what a patient books is exactly what the confirmation screen shows. Two sprints: [sprint 01](sprint-01-report.md) built the suite; [sprint 02](sprint-02-report.md) re-confirmed it against the live site via a fresh toolchain, captured real evidence, and folded in the accessibility spot-check.

## Coverage achieved

- 5/5 test cases documented, 4/5 automated
- Session/access-control verified server-side (real 302 redirect on unauthenticated access, not assumed)
- Accessibility spot-check: clean pass, no findings — the best result checked so far in this portfolio (see [`04-security-api/security-checks.md`](../04-security-api/security-checks.md))
- 5 real evidence screenshots in [`06-evidence`](../06-evidence)

## Residual risk

- Past-date validation (TC-05) is not enforced by the app and is documented as an exploratory finding, not an automated assertion — a real system would need a product decision on whether this is in-scope to fix.

## What a test manager would report upward

*"The one scenario that actually matters on a booking system — does the confirmation match what was submitted — is automated and green. Access control is server-enforced, confirmed by a real redirect, not just a UI assumption. One data-validation gap (past dates) is flagged for a product decision, not silently accepted."*
