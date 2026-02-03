# Sprint 01 Report — CURA Healthcare

**Sprint goal:** replace the earlier Katalon implementation with Selenium WebDriver + Java, framed as a legacy-system automation exercise, and prove the confirmation screen's data integrity.

## Planned vs. delivered

| Planned | Delivered |
|---------|-----------|
| Test strategy + plan | ✅ |
| 5 test cases | ✅ |
| Login (valid/invalid) automation | ✅ |
| Confirmation data-integrity check | ✅ |
| Security check (session/access-control) | ✅ 1 real positive finding (server-side redirect enforced), 1 hardening note |
| Performance smoke test | ✅ |

## Why Selenium here, and why Katalon was dropped

Katalon Studio's low-code project format isn't something a hiring manager can meaningfully review by reading code in a GitHub diff — a raw Selenium project is. Selenium was chosen over Playwright specifically to frame this as a "legacy system a team inherited" exercise (see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md)), consistent with how this portfolio splits tool choice by system age/stack, not personal preference.

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 4/4 |
| Open defects | 0 |
