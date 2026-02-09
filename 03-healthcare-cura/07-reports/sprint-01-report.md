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

## Real CI finding: a date field with no programmatic way in

Four further CI runs each failed on the same test, one layer deeper each time - a genuinely stubborn one. First, the visit-date field was being sent `10/15/2026` (US mm/dd/yyyy ordering) against a field whose own placeholder reads `dd/mm/yyyy` — switching to `15/10/2026` was the natural first fix. That still failed: a follow-up screenshot showed the field back to empty with the calendar popup open — the field carries a `readonly` attribute, so `sendKeys()` never landed a value at all, it only ever triggered the popup. Setting the value directly via JavaScript looked like the fix, and it did make the field visually show the right date — but the *next* run's failure screenshot showed the whole form reset to its defaults after clicking Book Appointment (unchecked box, default radio, empty comment). CURA's form is built on AngularJS, and writing `.value` via JS updates the DOM without ever touching Angular's own `ng-model`, so the framework still considered the date empty and silently re-rendered a blank form. Removing the `readonly` attribute via JS and then using real `sendKeys()` was the next attempt, reasoning that real keyboard events would fire whatever Angular listens for — that produced the *exact same* empty-field-with-open-popup screenshot as the very first attempt, meaning something in the widget's own JS actively blocks typed keystrokes regardless of the `readonly` attribute. The actual fix stopped trying to write the field's value by any means and drove the calendar widget itself instead — clicking "next month" until the target month is showing, then clicking the target day cell — since that's the one interaction path the widget is built to update its own bound model through.

## Why Selenium here, and why Katalon was dropped

Katalon Studio's low-code project format isn't something a hiring manager can meaningfully review by reading code in a GitHub diff — a raw Selenium project is. Selenium was chosen over Playwright specifically to frame this as a "legacy system a team inherited" exercise (see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md)), consistent with how this portfolio splits tool choice by system age/stack, not personal preference.

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 4/4 |
| Open defects | 0 |
