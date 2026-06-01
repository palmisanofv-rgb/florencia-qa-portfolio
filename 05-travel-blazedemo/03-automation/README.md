# Automation — Playwright

- **`tests/booking-journey.spec.ts`** — home → search → select flight → purchase → confirmation, one real E2E flow (TC-01–04). Includes the hardcoded-heading finding, logged rather than silently ignored.
- **`tests/evidence.spec.ts`** — one screenshot per test case.

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test
```
