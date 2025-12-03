# Sprint 01 Report — Swag Labs (saucedemo.com)

**Sprint goal:** migrate this project off Selenium/Java onto Playwright, cover all 6 seeded accounts, and automate the checkout journey.

## Planned vs. delivered

| Planned | Delivered |
|---------|-----------|
| Test strategy + plan | ✅ |
| 10 test cases | ✅ |
| Login regression across 6 seeded accounts | ✅ |
| Checkout E2E + negative path | ✅ |
| Basic security pass | ✅ 2 findings |
| Performance smoke test | ✅ |

## Why this project moved off Selenium

The earlier Selenium/Java version of this exact project went through several rounds of debugging real timing bugs against this same React app — a shared-driver thread-safety race, a click that silently didn't register, and a form-submission race between Selenium's `sendKeys()` and React's controlled-input state. Playwright's `fill()` and auto-waiting are built specifically to handle this class of problem. This is a real, documented example of a tool-fit decision, not a preference.

## Metrics

| Metric | Value |
|--------|-------|
| Seeded accounts covered | 6/6 |
| P1 scenario automation ratio | 3/3 |
| Open defects | 0 |
