# Test Plan — Swag Labs (saucedemo.com)

**Application under test:** [saucedemo.com](https://www.saucedemo.com)

## 1. Scope

### 1.1 In scope
- Login across all 6 seeded accounts (`standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`)
- Inventory: sort order, pricing display
- Cart: add/remove, badge count accuracy
- Checkout: information form validation, order total, completion

### 1.2 Out of scope
- Payment gateway (none exists — this is a demo app, checkout completion is simulated)
- Real load testing beyond a light smoke test (see [`../05-performance`](../05-performance))

## 2. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `locked_out_user` bypasses the lockout | Low | High | Explicit negative login test |
| Checkout allows an incomplete order | Medium | High | Field-level validation test (missing last name) |
| Cart badge shows stale count after add/remove | Medium | Medium | Explicit wait for badge count, not an instant read |

## 3. Strategy

Playwright's auto-waiting is used deliberately instead of manual `sleep()`/polling — this app's React re-renders are exactly the kind of timing-sensitive UI where a naive automation approach produces flaky tests (documented at length in this portfolio's earlier Selenium iteration of this same project, before the switch to Playwright).

## 4. Entry Criteria

- Site reachable, returns 200 on `/`
- Playwright browsers installed

## 5. Exit Criteria

- All 6 seeded accounts' login outcome matches expectation
- Checkout happy path + 1 negative path automated and green
- No open Critical/High defects

## 6. Resources

| Resource | Purpose |
|----------|---------|
| Playwright + TypeScript | E2E automation (`../03-automation`) |
| GitHub Actions | CI execution |
