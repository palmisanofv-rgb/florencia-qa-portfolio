# Test Plan — CURA Healthcare Service

## Scope

- Login (valid/invalid credentials)
- Make Appointment flow: facility selection, hospital readmission flag, healthcare program (Medicaid/Medicare/None), visit date, comment
- Appointment confirmation screen data matches what was submitted

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Confirmation page shows different data than submitted (data integrity) | Medium | Critical | Field-by-field assertion between submitted form values and confirmation screen |
| Date picker allows past dates for a new appointment | Medium | Medium | Negative test with a past date, assert validation |
| Facility dropdown silently defaults instead of failing when nothing selected | Low | Medium | Explicit assertion on default facility value |

## Strategy

Katalon's built-in `WebUI` keyword library (`WebUI.verifyElementText`, `WebUI.setText`, `WebUI.click`) is used instead of raw Selenium calls, since that is the idiomatic Katalon approach and what differentiates it from a plain Selenium project — Katalon's object repository (`Object Repository/`) decouples locators from test logic, which is the same principle as a Page Object Model but with Katalon's own tooling.

## Exit Criteria

- Login suite green for both valid and invalid credentials
- Appointment booking suite green with confirmation-page data verified against submitted values
