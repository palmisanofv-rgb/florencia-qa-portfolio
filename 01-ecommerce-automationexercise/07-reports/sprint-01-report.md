# Sprint 01 Report — automationexercise.com

**Sprint goal:** stand up planning/strategy, automate the P1 customer journey, cover the public API, and wire up CI so results are real, not claimed.

## Planned vs. delivered

| Planned | Delivered |
|---------|-----------|
| Test strategy + test plan | ✅ [`01-planning-strategy`](../01-planning-strategy) |
| 12 manual test cases + traceability to the site's 26 published scenarios | ✅ [`02-test-cases`](../02-test-cases) |
| E2E automation for the core purchase journey | ✅ 2 Playwright specs (`03-automation`) |
| API coverage of all 8 endpoints | ✅ 14/14 documented scenarios in `04-security-api/postman` |
| Basic security pass | ✅ 3 findings, all low severity (see `04-security-api/security-checks.md`) |
| Performance smoke test | ✅ k6 script against the 2 highest-traffic endpoints |

## Defects / findings this sprint

1. **Real automation bug (found via CI, not assumed):** the product listing page renders product id 1's "Add to cart" link twice in the DOM (a hover overlay + a static link), causing a Playwright "strict mode violation." Fixed with `.first()` in `ProductsPage`.
2. **Security findings (informational/low):** missing `Strict-Transport-Security` and `Content-Security-Policy` headers, and a `X-Powered-By` header disclosing the app server version. See `04-security-api/security-checks.md`.

## Known risk carried into next sprint

automationexercise.com occasionally serves a bot-protection challenge ("Please wait while your request is being verified...") to GitHub Actions' runner IPs. This is infrastructure behavior, not a defect in this project — when it triggers, both the Playwright and Postman jobs fail for that run only. Documented in the root README's CI section so a stakeholder reading a red run understands *why* before assuming the suite is broken.

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 6/8 |
| API scenario coverage | 14/14 |
| Open defects | 0 (both findings this sprint are hardening recommendations, not defects blocking release) |
