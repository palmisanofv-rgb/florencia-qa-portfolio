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

This turned into the most stubborn bug in this entire portfolio - seven further CI runs against the same test, each one peeling back another layer.

1. The visit-date field was being sent `10/15/2026` (US mm/dd/yyyy) against a field whose placeholder reads `dd/mm/yyyy` — switched to `15/10/2026`.
2. Still failed: the field came back empty with the calendar popup open. The field is `readonly`, so `sendKeys()` never lands a value, it only ever opens the popup.
3. Setting `.value` directly via JavaScript visually showed the right date, but the *next* screenshot showed the whole form reset to defaults on submit — CURA is AngularJS, and writing `.value` via JS never touches `ng-model`, so the framework still saw the date as empty.
4. Removing the `readonly` attribute and using real `sendKeys()` produced the *exact same* empty-field-with-open-popup result as attempt 2 — something in the widget's own JS blocks typed keystrokes regardless of the attribute.
5. Driving the calendar UI directly — clicking "next month" until the target month showed, then clicking the day — actually worked once: a screenshot showed the real, correct Appointment Confirmation page. But it wasn't reliable across further runs; later CI runs got `NoSuchElementException` on the calendar header, sometimes right away, sometimes deep into a retry loop, meaning the popup doesn't consistently open or stay open the same way every time.
6. Fixing the confirmation-page check itself (`isConfirmationVisible()` was reading the result with an instant, un-waited `findElements()` call, the same "container renders, content fills a beat later" pattern hit four times over in Parabank) was a real, separate fix, but didn't solve the calendar flakiness underneath it.
7. The current approach stops interacting with the calendar UI at all and instead calls the bootstrap-datepicker plugin's own public jQuery API (`$('#txt_visit_date').datepicker('setDate', ...)`) and fires the specific `changeDate` event that plugin emits — not the generic `change` event tried in attempt 3 — since that's what the Angular binding around this widget is actually listening for, and it's the same call path the widget uses internally no matter how the date was chosen. As of this report, CI verification of this last attempt is still in progress.

## Why Selenium here, and why Katalon was dropped

Katalon Studio's low-code project format isn't something a hiring manager can meaningfully review by reading code in a GitHub diff — a raw Selenium project is. Selenium was chosen over Playwright specifically to frame this as a "legacy system a team inherited" exercise (see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md)), consistent with how this portfolio splits tool choice by system age/stack, not personal preference.

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 4/4 |
| Open defects | 0 |
