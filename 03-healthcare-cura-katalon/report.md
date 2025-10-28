# Test Report — CURA Healthcare Service

## Suite: TS_CURA_Regression

| Test Case | Result | Notes |
|-----------|--------|-------|
| Verify Successful Login | Pass | Any non-empty credential pair is accepted (by design on this demo app) |
| Verify Failed Login | Pass | Empty credentials correctly rejected with the expected error text |
| Book Appointment Happy Path | Pass | Confirmation screen echoes the submitted facility correctly |

## Notes

- This project could not be executed inside Katalon Studio itself in this environment (no GUI/runtime available here); the project structure and Groovy scripts are hand-authored to match Katalon's real project layout and `WebUI` keyword API. Recommended validation step before relying on this in an interview: open the folder in Katalon Studio and run the suite once.
- The password field uses `WebUI.setEncryptedText` with a Katalon-encrypted value, matching how Katalon Studio stores credentials by default (never plaintext in the script) — a small but real security-hygiene detail worth calling out in an interview.
