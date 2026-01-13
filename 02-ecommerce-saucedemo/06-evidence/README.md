# Evidence

Real screenshots captured live against the production site — one per test case in [`../02-test-cases/test-cases.csv`](../02-test-cases/test-cases.csv). Populated by [`../03-automation/tests/evidence.spec.ts`](../03-automation/tests/evidence.spec.ts).

| File | Test Case |
|------|-----------|
| `tc01-login-page.png`, `tc01-standard-user-inventory.png` | TC-01 Login with standard_user |
| `tc02-locked-out-user-error.png` | TC-02 Login with locked_out_user |
| `tc03-problem-user-inventory.png` | TC-03 Login with problem_user (repeated broken image visible) |
| `tc04-performance-glitch-user-inventory.png` | TC-04 Login with performance_glitch_user |
| `tc07-two-items-in-cart-badge.png`, `tc07-cart-page.png` | TC-07 Add two products to cart |
| `tc08-order-summary.png`, `tc08-order-complete.png` | TC-08 Complete checkout |
| `tc09-missing-last-name-error.png` | TC-09 Checkout rejects missing last name |
| `tc10-sorted-low-to-high.png` | TC-10 Sort products price low to high |

All 11 files are real, captured live during this project's sprint 02 deepening pass.
