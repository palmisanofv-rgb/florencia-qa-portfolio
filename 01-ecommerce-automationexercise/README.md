# Project 01 — E-commerce Web | [automationexercise.com](https://automationexercise.com)

**Domain:** E-commerce | **Primary tools:** Playwright (TypeScript) + Postman/Newman | **Lifecycle coverage:** Planning → Manual → Automation → API

Full-lifecycle QA project against a live public e-commerce sandbox: account management, catalog, cart, checkout, and its REST API.

## Contents

| Stage | File/Folder |
|-------|-------------|
| Test planning | [`test-plan.md`](test-plan.md) — scope, risk analysis, strategy, entry/exit criteria |
| Manual testing | [`manual-testing/test-cases.md`](manual-testing/test-cases.md) — 12 test cases + 26-scenario traceability matrix, [`manual-testing/bug-report-sample.md`](manual-testing/bug-report-sample.md) |
| UI automation | [`automation-playwright/`](automation-playwright) — Playwright + TypeScript, Page Object Model |
| API automation | [`api-testing-postman/`](api-testing-postman) — Postman collection, 14/14 documented scenarios |

See [`00-qa-strategy-and-leadership`](../00-qa-strategy-and-leadership) for how this project fits into the overall tool/strategy matrix.

## Real CI run (GitHub Actions)

First run: 7/8 Playwright tests passed on the first try; 1 failed on a genuine bug — `cart.spec.ts` hit a Playwright "strict mode violation" because product id 1's "Add to cart" link appears **twice** in the DOM on automationexercise.com's product listing (a hover overlay + a static link). Fixed by adding `.first()` to `ProductsPage.addToCartByProductId`.

**Known intermittent failure mode (infrastructure, not code):** on some runs, all 8 tests time out against a "Please wait while your request is being verified..." interstitial — a bot-protection challenge that automationexercise.com (or its CDN) occasionally serves to traffic from GitHub Actions' well-known runner IP ranges. Confirmed via the saved Playwright screenshot artifact, not assumed. This is a real, common limitation of running browser automation against a public third-party site from shared cloud CI IPs rather than a residential/allow-listed one — the same suite passes reliably when the challenge doesn't trigger (see the CI badge on the [root README](../README.md) for the current run's actual outcome).
