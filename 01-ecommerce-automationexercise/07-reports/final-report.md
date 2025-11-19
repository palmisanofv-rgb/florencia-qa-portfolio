# Final Report — automationexercise.com

## Summary

Full-lifecycle QA project against a live public e-commerce sandbox: strategy → manual test cases → E2E automation → API/security → performance → evidence, across two sprints ([sprint 01](sprint-01-report.md), [sprint 02](sprint-02-report.md)). Sprint 01 established the core purchase journey and CI; sprint 02 took the project from "P1 covered" to full 26-scenario coverage, deepened automation, performance, and evidence, and folded in the portfolio-wide accessibility spot-check.

## Coverage achieved

- **26/26** site-published scenarios mapped to a real, formal test case (see [`../02-test-cases/traceability-matrix.md`](../02-test-cases/traceability-matrix.md)) - no scenario is left as a bare "Exploratory" placeholder
- **16/26** overall automation ratio; **5/9** P1 scenarios automated end-to-end — the 4 unautomated P1s are all checkout/payment variants kept manual by design, not a coverage gap (see below)
- **20 real evidence screenshots** in [`../06-evidence`](../06-evidence), one per automated test case, captured live against the production site during this project's own development, not staged
- **14/14** API scenarios covered (Postman/Newman)
- **4-endpoint** performance smoke test with a staged load profile (see [`../05-performance/last-run-results.md`](../05-performance/last-run-results.md)): 100% checks passed, 0% error rate, p95 277ms
- **1** basic security pass: 3 low-severity/informational findings, 0 blocking
- **1** accessibility spot-check: 3 real findings (generic alt text at scale, an unreachable CTA, no visible keyboard-focus indicator) - see [`../04-security-api/security-checks.md`](../04-security-api/security-checks.md)

## What's intentionally still manual

Every scenario left manual has a stated reason, not just "didn't get to it":

| Scenario(s) | Why manual |
|---|---|
| TC-11, TC-12, TC-17 (checkout variants), TC-23 (address verification at checkout), TC-24 (invoice download) | All reachable only through the sandbox's simulated, non-idempotent payment form - kept manual by design. See [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md) §3. In a real project with a live payment gateway, this would move to P1-automated before a production release, not stay manual indefinitely |
| TC-05, TC-06 (duplicate-email registration, Contact Us file upload), TC-10 (remove from cart) | Automatable in principle, not yet prioritized over higher-value scenarios this sprint |
| TC-25, TC-26 (scroll-up button behavior) | Low business value UI chrome - the maintenance cost of automating it isn't justified by the risk it covers |

## Defects found

| ID | Severity | Status |
|----|----------|--------|
| Duplicate "Add to cart" DOM element (product id 1) | Low (automation-breaking, not user-facing) | Fixed |
| Google Vignette ad interstitial intercepts click-driven navigation | Low (third-party ad network, not a site defect) | Documented + worked around ([`helpers/navigation.ts`](../03-automation/helpers/navigation.ts)) |
| Inline AdSense ad overlaps the product-review Submit button, blocking real clicks | Low-Medium (a real user could be blocked, not just automation) | Documented + worked around ([`pages/ProductDetailPage.ts`](../03-automation/pages/ProductDetailPage.ts)) |
| ~40/44 homepage images share one generic, non-descriptive alt string | Medium | Reported, not fixed (third-party site) |
| "Add to cart" CTA not reachable within 15 keyboard Tab presses | Medium-High | Reported, not fixed (third-party site) |
| No visible keyboard-focus indicator across any tab stop checked | Medium | Reported, not fixed (third-party site) |
| Missing HSTS header | Low | Reported, not fixed (third-party site) |
| Missing CSP header | Low-Medium | Reported, not fixed (third-party site) |
| `X-Powered-By` stack disclosure | Informational | Reported, not fixed (third-party site) |

## Residual risk

- Checkout/payment flow remains manual-only by design (simulated payment form, see test strategy §3) — in a real project with a real payment gateway, this would need to move to P1 automated before a production release, not stay manual indefinitely.
- automationexercise.com's occasional bot-protection challenge, redirect-limit behavior, and ad-interstitial interception are accepted, documented environment risks — not within this project's control to eliminate, and explicitly distinguished from real product defects throughout this project's reports (see [`sprint-01-report.md`](sprint-01-report.md) and [`sprint-02-report.md`](sprint-02-report.md)).
- Accessibility coverage is a lightweight 3-dimension spot-check, not a full WCAG audit — tracked as an open item in [`00-qa-strategy-and-leadership/roadmap.md`](../../00-qa-strategy-and-leadership/roadmap.md).

## What a test manager would report upward

*"Full coverage across all 26 published scenarios, 16 of them automated end-to-end and green in CI, the rest deliberately manual with a stated reason each. Two sprints in: the first stood up the core revenue path, the second closed every remaining coverage gap and added a real accessibility pass, which found 3 genuine issues worth a product conversation - none of them blocking, all of them worth fixing. Along the way, automation itself surfaced two distinct categories of real site behavior (an ad network intercepting navigation, and a carousel rendering a hidden duplicate slide) that would have silently produced flaky-looking automation if left undiagnosed - both are now documented and handled, not just papered over. Checkout stays manual pending a decision on the sandbox's non-idempotent payment form. CI is real and running on every push."*
