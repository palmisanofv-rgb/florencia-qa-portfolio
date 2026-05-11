# Basic Security Testing — Parabank

## Checks performed (real HTTP requests)

| Check | Method | Result |
|-------|--------|--------|
| Session cookie flags | `curl -I` | ✅ `JSESSIONID` cookie has `HttpOnly` (can't be read by JS — mitigates session-token theft via XSS) |
| Session cookie `SameSite`/`Secure` | `curl -I` | ⚠️ **Finding:** no `SameSite` attribute and no explicit `Secure` flag on the session cookie |
| Clickjacking / CSP / HSTS headers | `curl -I` | ⚠️ **Finding:** none of `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security` present — same gap class as every other project in this portfolio |
| API error handling on an invalid account ID | `GET /services/bank/accounts/999999999` | ✅ Returns `400`, not a stack trace or a `200` with null data |
| API authorization boundary | `GET /services/bank/customers/12212/accounts` | ✅ Every account returned genuinely belongs to the requested customer ID (spot-checked, not assumed) |
| Password validation on login | `curl -X POST /parabank/login.htm` with a valid username + wrong password | ❌ **Finding:** `302` redirect straight to the authenticated dashboard - see below |

## Findings detail

### Login accepts any password for a valid username (High severity - broken authentication)
**What:** a raw `curl` POST to `/parabank/login.htm` with a real, registered username and a deliberately wrong password returns `302 Found` with `Location: overview.htm`, and that URL serves the fully authenticated account dashboard. Repeated against a second, independently-registered account with the same result - not a one-off.
**How this was found:** the Selenium suite's invalid-password test kept landing on the dashboard instead of an error page across several CI runs. The first instinct was to suspect a browser-automation timing bug (a pattern that *had* been the real cause for several other findings in this project, see the debugging log above) - but confirming the exact same behavior with `curl` alone, entirely outside the browser, ruled that out and pinned the cause on the application itself.
**Risk:** the password field on this login form provides no real security boundary - anyone who knows or guesses a valid username is authenticated. On a real banking product this would be a critical, stop-ship finding (OWASP A07:2021 - Identification and Authentication Failures).
**Disposition:** documented as observed; the corresponding test (`04-banking-parabank/03-automation/tests/test_login.py::test_login_with_invalid_password_is_currently_accepted`) asserts this actual behavior rather than the rejection it doesn't perform, so the suite reflects reality instead of silently failing forever.

### Missing `SameSite`/`Secure` on the session cookie (Medium severity for a banking app)
**What:** the `JSESSIONID` cookie lacks `SameSite=Lax/Strict` and an explicit `Secure` flag.
**Risk:** without `SameSite`, the session cookie is more exposed to CSRF-style attacks (a request forged from another site can still carry it); without `Secure`, the cookie could theoretically be sent over a downgraded HTTP connection.
**Why this is weighted higher here than on the e-commerce projects:** this is a banking session token, not a shopping-cart session — the same class of gap carries more real-world weight.

### Missing security headers (Low-Medium, recurring pattern across this portfolio)
Same as [Project 01](../../01-ecommerce-automationexercise/04-security-api/security-checks.md) and [Project 03](../../03-healthcare-cura/04-security-api/security-checks.md) — worth noting as a *pattern*: none of the demo apps in this portfolio ship a CSP or HSTS header. On a real team, three unrelated findings of the same shape across different products would be worth raising as an org-wide gap, not three separate one-off tickets — the kind of pattern-recognition a test manager is expected to bring, not just an individual tester filing the same bug three times.

### Zero-amount transfer accepted without rejection (Low severity, audit-trail concern)
**What:** transferring exactly $0.00 between two distinct accounts still returns "Transfer Complete" rather than being rejected — confirmed directly (not just implied by unchanged balances) in [`../03-automation/tests/test_transfer.py::test_transfer_of_zero_amount_is_rejected`](../03-automation/tests/test_transfer.py).
**Risk:** low on its own, but some banking systems intentionally reject $0 transfers as a matter of audit-trail hygiene (a $0 "transfer" is really just a no-op with a timestamp) — worth a product decision on whether this should be blocked, not automatically a bug.
**Disposition:** documented as observed, same pattern as the invalid-password finding above — the test asserts the real behavior rather than an idealized rejection that doesn't happen.

## Accessibility findings

A separate, lightweight AI-assisted accessibility spot-check (alt text, contrast, keyboard reachability) was run against the homepage/login page — see [`../03-automation/accessibility-check.md`](../03-automation/accessibility-check.md) for full methodology. Summary:

| Finding | Severity | Status |
|---|---|---|
| The "Admin Page" nav icon link has no accessible name at all (`alt`, `aria-label`, `title` all empty) | Medium | Reported, not fixed (third-party site) |
| "Log In" button fails WCAG contrast: measured 3.14:1 against a 4.5:1 requirement | Medium | Reported, not fixed (third-party site) |
| "Log In" button technically reachable but takes 13 keyboard Tab presses from a fresh page load | Medium | Reported, not fixed (third-party site) |

Tracked at the portfolio level as [`risk-register.md`](../../00-qa-strategy-and-leadership/risk-register.md) R-31 and R-32.

## See also

[`data-validation/`](data-validation) for the SQL-level reconciliation technique used to catch defects the API/UI layer can't see.
