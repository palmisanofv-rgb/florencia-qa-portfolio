# Test Plan — Swag Labs (saucedemo.com)

## Scope

- Login with the 6 seeded accounts (`standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user` — all password `secret_sauce`)
- Inventory: product listing, sort order (name/price asc/desc)
- Cart: add/remove products, cart badge count
- Checkout: information form validation, order summary total, order completion

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `locked_out_user` bypasses the lockout | Low | High | Explicit negative test asserting the lockout error message |
| Sort order regression (`problem_user` is known to have a broken sort) | High (by design) | Medium | Cross-account regression run comparing `standard_user` vs `problem_user` sort output |
| Checkout allows empty required fields | Medium | High | Field-level validation tests on First Name / Last Name / Zip |
| Cart total miscalculated after removing an item | Medium | High | Assert cart total recalculates after each add/remove |

## Strategy

Run the same core journey (login → add to cart → checkout) across all 6 accounts via a TestNG data provider. Accounts are deliberately seeded with different failure modes by Sauce Labs, so this project doubles as a **known-defect regression suite** — a useful pattern for demonstrating defect-detection capability without needing to find a "real" bug on a live production site.

## Exit Criteria

- `standard_user` completes the full happy path with zero failures
- Every other account's *known* deviation is captured by an assertion (not silently ignored)
