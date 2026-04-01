# Test Strategy — Parabank

## 1. Product & Business Value

Parabank is framed here as a **legacy core-banking system** — Parasoft's demo app is genuinely built on an old JSP/servlet stack, which maps well to a real scenario: a bank's customer-facing transfer/account system that predates the current engineering team, still processing real money movement, that nobody wants to touch without a safety net.

| Capability | Business value | Why |
|-------------|----------------|-----|
| Fund transfer correctness | Critical | A wrong balance after a transfer is a direct financial-integrity incident |
| Registration/login | High | Gatekeeps account access |
| Account opening | Medium | Lower frequency, still needs to work |

## 2. Business Risk Analysis

| Risk | Likelihood | Business Impact | Mitigation |
|------|-----------|-------------------|------------|
| Transfer debits one account without crediting the other | Low | Critical | Balance independently recomputed before/after every transfer test, not just a success banner |
| Zero-amount transfer silently accepted | Medium | Low-Medium (audit-trail concern) | Documented as a real finding — see [`07-reports`](../07-reports) |
| Backend ledger and displayed balance diverge | Medium | High | [`04-security-api/data-validation`](../04-security-api/data-validation) demonstrates the SQL-level reconciliation technique a QA team would apply with real (authorized) DB access |

## 3. Direction & Management View

- **Why Selenium + Python, not Playwright:** this system is genuinely old server-rendered JSP, and its markup regularly needed the kind of explicit-wait handling that AJAX-style partial page updates require — a good real-world case for Selenium's more manual wait model over Playwright's auto-waiting, which is tuned for modern SPA re-renders more than classic server-rendered pages with client-side AJAX patches.
- **A note on infrastructure risk:** Parabank is a single public instance shared by every QA learner worldwide. It has, during this project's development, intermittently served a Cloudflare bot-check to automated traffic. This is documented explicitly rather than hidden, because a test manager's job includes distinguishing "our suite is broken" from "the environment had a bad five minutes" — conflating the two erodes trust in the whole test function.

## 4. Test Plan

See [`test-plan.md`](test-plan.md).
