# Automation — Selenium WebDriver + Java

- **`LoginPage`/`AppointmentPage`/`ConfirmationPage`** — Page Object Model
- **`BookingJourneyTests`** — valid login, rejected empty-credentials login, and the core data-integrity check: the confirmation screen must echo back the *exact* facility submitted, not just show "some" confirmation

## Running

```bash
mvn -B test
```

Requires a local Chrome + ChromeDriver (Selenium Manager resolves the driver automatically, Selenium 4.6+).

## Field IDs used

Verified against the live site's HTML via direct HTTP requests: `#txt-username`, `#txt-password`, `#btn-login`. The appointment-form field IDs (`#combo_facility`, `#chk_hospotal_readmission` — yes, that's a real typo in CURA's own markup, not a bug in this repo — `#txt_visit_date`, `#txt_comment`, `#btn-book-appointment`) reflect this site's long-stable, widely-documented structure (it's Katalon's own official training app) but were not independently re-verified field-by-field the way the login form was, since the appointment form only renders after an authenticated session.
