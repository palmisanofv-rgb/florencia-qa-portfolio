# Automation — Playwright

- **`tests/seeded-accounts-login.spec.ts`** — login outcome for all 6 seeded accounts (TC-01–06). This is a real regression-detection pattern: `problem_user`/`performance_glitch_user` are known-bad builds, and this suite proves it would still catch them logging in successfully even though other things about their session are broken.
- **`tests/checkout-journey.spec.ts`** — full purchase journey + the missing-last-name negative path (TC-07–09).
- **`tests/evidence.spec.ts`** — captures one screenshot per test case into [`../06-evidence`](../06-evidence).

## Running

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test
```

## Why Playwright here, not Selenium

This project used to be Selenium + Java. Switching to Playwright removed an entire category of flaky-test debugging this portfolio hit repeatedly against this exact React app (documented in earlier commit history) — Playwright's `fill()` and auto-waiting handle React's controlled-input re-renders in a way raw Selenium `sendKeys()` + `click()` does not. See [`00-qa-strategy-and-leadership/tool-tech-matrix.md`](../../00-qa-strategy-and-leadership/tool-tech-matrix.md).
