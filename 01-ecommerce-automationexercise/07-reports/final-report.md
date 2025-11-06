# Final Report — automationexercise.com

## Summary

Full-lifecycle QA project against a live public e-commerce sandbox: strategy → manual test cases → E2E automation → API/security → performance → evidence. One sprint (see [`sprint-01-report.md`](sprint-01-report.md)); no further sprints were needed to hit the exit criteria defined in [`../01-planning-strategy/test-plan.md`](../01-planning-strategy/test-plan.md).

## Coverage achieved

- **26/26** site-published scenarios mapped to a test case or explicit exploratory note (see [`../02-test-cases/traceability-matrix.md`](../02-test-cases/traceability-matrix.md))
- **6/8** P1 scenarios automated end-to-end
- **14/14** API scenarios covered
- **1** basic security pass completed, 3 low-severity findings, 0 blocking

## Defects found

| ID | Severity | Status |
|----|----------|--------|
| Duplicate "Add to cart" DOM element (product id 1) | Low (automation-breaking, not user-facing) | Fixed |
| Missing HSTS header | Low | Reported, not fixed (third-party site) |
| Missing CSP header | Low-Medium | Reported, not fixed (third-party site) |
| `X-Powered-By` stack disclosure | Informational | Reported, not fixed (third-party site) |

## Residual risk

- Checkout/payment flow remains manual-only by design (simulated payment form, see test strategy §3) — in a real project with a real payment gateway, this would need to move to P1 automated before a production release, not stay manual indefinitely.
- automationexercise.com's occasional bot-protection challenge is an accepted, documented CI risk, not something within this project's control to eliminate.

## What a test manager would report upward

*"The core revenue path (search → cart → pricing) is automated and green. Checkout is intentionally still manual pending a decision on whether to invest in handling the sandbox's non-idempotent payment form. Three low-severity hardening items were found and reported; none block release. CI is real and running on every push — see the badge on the root README."*
