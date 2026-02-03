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

## Real CI finding: a false-passing assertion

The first CI run failed on `confirmationScreenMatchesSubmittedFacility` — but the *real* bug was one layer up: `validLoginReachesAppointmentArea` had been silently passing on a **login that was actually failing**. The original assertion checked for "Make Appointment" text anywhere on the page, and CURA's own login page copy reads "Please login to **make appointment**" — so the check passed whether login succeeded or not. The actual cause was also a wrong assumption: an earlier guess used password `ThisIsNotARealPassword1`, but CURA validates against a real seeded demo account with password `ThisIsNotAPassword` (no trailing "1") — confirmed from the failure screenshot showing the demo credentials box. Both the credentials and the assertion (now checking that the login form element is actually gone) were fixed together, since one caused the other to go unnoticed.

## Why Selenium here, and why Katalon was dropped

Katalon Studio's low-code project format isn't something a hiring manager can meaningfully review by reading code in a GitHub diff — a raw Selenium project is. Selenium was chosen over Playwright specifically to frame this as a "legacy system a team inherited" exercise (see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md)), consistent with how this portfolio splits tool choice by system age/stack, not personal preference.

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 4/4 |
| Open defects | 0 |
