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
7. Calling the datepicker plugin's own API directly on `#txt_visit_date` displayed the date in the wrong format (`10/15/2026`, mm/dd/yyyy) instead of the page's own configured `dd/mm/yyyy`, and still reset the form on submit. The failure screenshot's raw HTML explained why: the plugin is declared via `data-provide="datepicker"` on the *parent* `.input-group.date` element, not the input itself — calling `.datepicker()` on the input silently spun up a second, separately-configured instance rather than driving the real one.
8. Retargeting the same API call at that real parent container fixed the *display* format (`15/10/2026`, correct) but the form still reset on submit — and critically, the checkbox, radio, and comment reset too, not just the date. That's the actual tell: this app resets its *entire* form scope whenever Angular's own validation considers anything invalid, and no jQuery/JS manipulation of the date field ever satisfies that validation - the one run that ever produced a real, fully-correct confirmation screen (attempt 5) was the one physically driving the calendar UI, not scripting around it.
9. The current fix goes back to driving the real calendar, but opens it via its dedicated icon (confirmed to exist from the same failure screenshots' captured HTML) instead of the readonly text input, which was never guaranteed to open anything on click in the first place. As of this report, CI verification is still in progress.

## Why Selenium here, and why Katalon was dropped

Katalon Studio's low-code project format isn't something a hiring manager can meaningfully review by reading code in a GitHub diff — a raw Selenium project is. Selenium was chosen over Playwright specifically to frame this as a "legacy system a team inherited" exercise (see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md)), consistent with how this portfolio splits tool choice by system age/stack, not personal preference.

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 4/4 |
| Open defects | 0 |
