# Evidence

Real screenshots captured by Playwright during GitHub Actions runs against the live site — one per test case in [`../02-test-cases/test-cases.csv`](../02-test-cases/test-cases.csv), not a curated sample. Captured by [`../03-automation/tests/evidence.spec.ts`](../03-automation/tests/evidence.spec.ts).

| File | Test Case |
|------|-----------|
| `home-page.png` | Baseline |
| `tc01-signup-form.png`, `tc01-account-created.png` | TC-01 Register User |
| `tc02-logged-in-session.png` | TC-02 Login |
| `tc03-invalid-login-error.png` | TC-03 Invalid login |
| `tc04-logged-out.png` | TC-04 Logout |
| `tc05-duplicate-email-error.png` | TC-05 Duplicate registration |
| `tc06-contact-us-form.png` | TC-06 Contact Us |
| `tc07-search-results.png` | TC-07 Search Product |
| `tc08-cart-with-two-products.png` | TC-08 Add Products to Cart |
| `tc09-quantity-set-to-4.png` | TC-09 Verify product quantity |

TC-04/05/06/09's screenshots are pending the next CI run that completes the full evidence step (see [`../07-reports`](../07-reports) for status) — `home-page.png` and `tc07-search-results.png` are already captured and real.
