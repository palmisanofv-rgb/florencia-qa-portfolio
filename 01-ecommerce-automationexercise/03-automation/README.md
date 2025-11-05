# Automation — Playwright

Two real end-to-end flows instead of many disconnected, single-assertion tests:

- **`tests/customer-purchase-journey.spec.ts`** — register → confirm session → search → build a 2-item cart → verify pricing → set quantity on a detail page → delete account. Covers TC-01, TC-02, TC-07, TC-08, TC-09.
- **`tests/login-security.spec.ts`** — the login auth boundary specifically: wrong password is rejected with no session created, correct password authenticates, logout actually clears the session. Covers TC-03.
- **`tests/evidence.spec.ts`** — not assertion-bearing; captures the screenshots used in [`../06-evidence`](../06-evidence).

## Running

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test
```

## Design notes

- Page Object Model (`pages/`) keeps locators out of test logic.
- Every test that creates an account deletes it in the same test (this is a shared public sandbox — no orphaned data).
- Checkout (TC-11/TC-12) is intentionally **not** automated — see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md) for why that's a deliberate scope decision, not an oversight.
