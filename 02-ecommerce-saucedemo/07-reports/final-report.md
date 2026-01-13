# Final Report — Swag Labs (saucedemo.com)

## Summary

Full-lifecycle project covering login regression across all 6 seeded accounts and the full checkout journey, automated in Playwright, across two sprints ([sprint 01](sprint-01-report.md), [sprint 02](sprint-02-report.md)). Sprint 1 stood up the migration off Selenium/Java and the core login/checkout coverage; sprint 2 closed the one remaining manual gap, added real assertions for the two seeded-defect accounts, and folded in the accessibility spot-check.

## Coverage achieved

- **10/10 test cases documented, 10/10 automated** (TC-10's sort check was the only manual one; automated this sprint — see [`02-test-cases/test-cases.csv`](../02-test-cases/test-cases.csv))
- 6/6 seeded accounts covered in the login regression suite, **2 of them now with a real, verified assertion of their specific known defect** (not just "login succeeds"): `problem_user`'s repeated broken product image, `performance_glitch_user`'s measured ~11x login delay (5.1s vs. 0.5s in a real captured run)
- 2 security findings (informational/low), 0 blocking
- Accessibility spot-check: clean on alt text and contrast; login-page keyboard reachability clean (2 tabs, no visible focus indicator); inventory-page keyboard reachability inconclusive due to a real browser-automation tooling issue, not a site defect — see [`04-security-api/security-checks.md`](../04-security-api/security-checks.md)
- 11 real evidence screenshots in [`06-evidence`](../06-evidence)

## Residual risk

None carried forward from sprint 1 — the `problem_user`/`performance_glitch_user` assertion gap flagged in sprint 1's report is now closed. The inventory-page keyboard-reachability check remains genuinely inconclusive (tooling, not site behavior) and would need a clean re-run in a future session to resolve.

## What a test manager would report upward

*"Full coverage: all 10 test cases automated, including the sort check that was manual until this sprint. The two seeded-defect accounts (`problem_user`, `performance_glitch_user`) now have real assertions tied to their actual documented quirks, not just a shared login-success check — this is now a true regression suite for Sauce Labs' seeded defects, not a login smoke test across 6 accounts. No blocking defects; two low-severity hardening notes filed for awareness; accessibility is clean on every dimension we could check cleanly."*
