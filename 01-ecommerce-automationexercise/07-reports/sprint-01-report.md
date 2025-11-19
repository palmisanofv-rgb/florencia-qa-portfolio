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
2. **Real automation bug, round 2 (found after consolidating tests into one E2E journey):** the TC-09 quantity check reused product id 1, which was already in the cart from TC-08 at quantity 1 — stacking to a real quantity of 5, not the expected 4. The consolidated journey test is exactly what caught this (four separate single-purpose tests, run in isolation, would each have passed individually and never surfaced the interaction). Fixed by using a different product id for the quantity check and asserting against the row matching the expected quantity, not just "the first row."
3. **Security findings (informational/low):** missing `Strict-Transport-Security` and `Content-Security-Policy` headers, and a `X-Powered-By` header disclosing the app server version. See `04-security-api/security-checks.md`.

## Known risk carried into next sprint

automationexercise.com occasionally serves a bot-protection challenge ("Please wait while your request is being verified...") to GitHub Actions' runner IPs. This is infrastructure behavior, not a defect in this project — when it triggers, both the Playwright and Postman jobs fail for that run only. Documented in the root README's CI section so a stakeholder reading a red run understands *why* before assuming the suite is broken.

A second, related symptom surfaced later: two separate CI runs failed with `Exceeded maxRedirects` / `Max redirect count exceeded` on plain `GET`/`POST` calls to the site's own API (`/api/productsList`, `/api/createAccount`), across three independent test surfaces at once (the Postman collection, and two unrelated Playwright spec files) — confirmed as the site itself by re-running the exact same requests via `curl` moments later and getting a clean `200` with zero redirects both times. Same root cause as the bot-challenge risk above (a shared public demo occasionally misbehaving under automated traffic), just a different failure shape — noted here rather than chased as a code bug, since the site's own behavior, not the test, is what's inconsistent.

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 5/7 |
| API scenario coverage | 14/14 |
| Open defects | 0 (both findings this sprint are hardening recommendations, not defects blocking release) |
