# Test Plan — DummyJSON API

## Scope

- Authentication: login (valid/invalid), token-based identity check (`/auth/me`)
- Products: list, search, add (mock create), update (mock update), delete (mock delete)
- Carts: retrieve by ID, verify line-item totals

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Invalid credentials still issue a token | Low | Critical | Explicit negative login test, assert 400 + no `accessToken` field |
| Expired/garbage token still authorizes `/auth/me` | Low | Critical | Negative test with a malformed token, assert 401/403 |
| Cart line-item totals don't reconcile (`quantity * price` vs `total`) | Medium | Medium | Per-item arithmetic assertion |
| Search returns products that don't actually match the query | Medium | Low | Assert every result's title/description contains the search term (case-insensitive) |

## Strategy

Chain requests via Postman environment variables set in test scripts (login's `accessToken` is captured and reused by `/auth/me`), demonstrating **stateful API test flows** rather than isolated one-off requests — the same pattern used for the account lifecycle in [Project 01](../01-ecommerce-automationexercise/api-testing-postman).
