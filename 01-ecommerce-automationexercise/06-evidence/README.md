# Evidence

Real screenshots captured by Playwright against the live site — one per automated test case in [`../02-test-cases/test-cases.csv`](../02-test-cases/test-cases.csv), not a curated sample. Captured by [`../03-automation/tests/evidence.spec.ts`](../03-automation/tests/evidence.spec.ts).

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
| `tc13-test-cases-page.png` | TC-13 Test Cases page |
| `tc14-product-detail-page.png` | TC-14 Product detail page |
| `tc15-subscribe-home-success.png` | TC-15 Subscribe (home page) |
| `tc16-subscribe-cart-success.png` | TC-16 Subscribe (cart page) |
| `tc18-category-dress-products.png` | TC-18 Category navigation |
| `tc19-brand-polo-products.png` | TC-19 Brand navigation |
| `tc20-cart-persists-after-login.png` | TC-20 Cart persists across login |
| `tc21-review-submitted.png` | TC-21 Product review — captured mid-run with a real Google Vignette ad interstitial covering the form (see [`../07-reports/sprint-02-report.md`](../07-reports/sprint-02-report.md)) |
| `tc22-recommended-item-in-cart.png` | TC-22 Recommended items add-to-cart |

All 20 files above are real, captured live against the production site (most recently during this project's sprint 02 deepening pass). Test cases without a screenshot here (TC-10/11/12/17/23/24/25/26) are the ones intentionally kept manual — see [`../07-reports/final-report.md`](../07-reports/final-report.md) for why each one.
