# Evidence

Real screenshots captured live by Selenium — one per test case in [`../02-test-cases/test-cases.csv`](../02-test-cases/test-cases.csv) — via the `evidence` fixture in [`../03-automation/tests/conftest.py`](../03-automation/tests/conftest.py).

| File | Test Case |
|------|-----------|
| `tc01-account-registered.png` | TC-01 Register account |
| `tc02-login-page.png`, `tc02-accounts-overview.png` | TC-02 Login with registered account |
| `tc03-invalid-password-accepted.png` | TC-03 Login with invalid password (broken-auth finding) |
| `tc04-accounts-overview-before.png`, `tc04-second-account-opened.png` | TC-04 Open a second account |
| `tc05-transfer-confirmation.png`, `tc05-accounts-overview-after.png` | TC-05 Transfer reconciles both balances |
| `tc06-zero-amount-transfer-result.png`, `tc06-accounts-overview-after.png` | TC-06 Zero-amount transfer accepted |

All 10 files are real, captured live during this project's sprint 02 deepening pass.
