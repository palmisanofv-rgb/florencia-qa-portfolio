# Final Report — Swag Labs (saucedemo.com)

## Summary

Full-lifecycle project covering login regression across all 6 seeded accounts and the full checkout journey, automated in Playwright.

## Coverage achieved

- 10/10 test cases documented, 8/10 automated
- 6/6 seeded accounts covered in the login regression suite
- 2 security findings (informational/low), 0 blocking

## Residual risk

- `problem_user`/`performance_glitch_user`'s *specific* known defects (broken image sort, artificial delay) are not individually asserted — only login success is. A deeper pass would add explicit assertions cross-checking these accounts' behavior against `standard_user`'s, turning this into a true regression suite for Sauce Labs' seeded defects rather than a login smoke test across 6 accounts.

## What a test manager would report upward

*"Login is verified across every account variant we know the release includes, not just the clean one. Checkout is fully automated, happy path and one negative path. No blocking defects; two low-severity hardening notes filed for awareness."*
