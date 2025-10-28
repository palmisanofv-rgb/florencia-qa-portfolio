# Test Plan — AutomationExercise E-commerce Platform

**Application under test:** [automationexercise.com](https://automationexercise.com)
**Author:** Florencia Palmisano
**Status:** Active

## 1. Scope

### 1.1 In scope
- User account management: registration, login, logout, account deletion
- Product catalog: browsing, category/brand filtering, search
- Shopping cart: add/remove products, quantity updates, price totals
- Checkout flow: address verification, order placement, payment form
- Contact Us form (with file upload)
- Newsletter subscription (home page and cart page)
- Public REST API (`/api/*`): products, brands, search, account CRUD, login verification

### 1.2 Out of scope
- Real payment processing (the site's payment gateway is a simulated form; no real transactions are validated)
- Load/performance testing
- Third-party integrations outside automationexercise.com

## 2. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Checkout flow breaks silently (cart total miscalculated) | Medium | High | Automated regression on add-to-cart + cart totals before every release |
| Login accepts invalid credentials | Low | Critical | Negative test cases for auth (TC-02/TC-03) run on every cycle |
| Search returns unrelated products | Medium | Medium | Data-driven search test cases with multiple keyword sets |
| API and UI state diverge (e.g. product list) | Medium | Medium | Cross-check `/api/productsList` response against UI product count |
| Account deletion fails, polluting test data | Medium | Low | Every test that creates an account tears it down via `Delete Account` / `deleteAccount` API |

## 3. Strategy

- **Risk-based prioritization:** authentication and checkout are P1 (highest business impact); catalog browsing and subscription are P2/P3.
- **Test pyramid:** API tests (fast, stable) validate data contracts; a focused set of E2E UI tests (Playwright) cover the critical user journeys; manual exploratory testing covers usability and edge cases automation doesn't reach.
- **Test data:** unique email per run (timestamp-suffixed) to avoid collisions between local and CI executions; every account created by a test is deleted at teardown.
- **Environments:** tests run against the public production instance of automationexercise.com (no staging environment is exposed publicly).

## 4. Entry Criteria

- Site is reachable and returns HTTP 200 on `/`
- Test data (unique email generator) available
- Playwright browsers installed (`npx playwright install`)

## 5. Exit Criteria

- 100% of P1 test cases executed and passed
- No open Critical/High severity defects
- Automated suite green on the latest run
- Traceability matrix updated (see [`manual-testing/test-cases.md`](manual-testing/test-cases.md))

## 6. Resources

| Resource | Purpose |
|----------|---------|
| Playwright + TypeScript | UI automation (`automation-playwright`) |
| Postman / Newman | API automation (`api-testing-postman`) |
| GitHub Actions *(planned)* | CI execution on push |

## 7. Schedule

| Phase | Activity |
|-------|----------|
| 1 | Test planning + risk analysis (this document) |
| 2 | Manual test case design + traceability matrix |
| 3 | API automation (Postman collection) |
| 4 | UI automation (Playwright, page object model) |
| 5 | Bug reporting on any defect found during the above |

## 8. Success Metrics

- **Coverage:** all 26 documented site scenarios mapped to a test case (manual or automated)
- **Automation ratio:** critical-path scenarios (auth, cart, checkout, search) automated end-to-end
- **Defect escape rate:** tracked via bug reports filed vs. found in later stages
