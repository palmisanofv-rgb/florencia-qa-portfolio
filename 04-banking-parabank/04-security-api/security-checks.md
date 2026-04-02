# Basic Security Testing — Parabank

## Checks performed (real HTTP requests)

| Check | Method | Result |
|-------|--------|--------|
| Session cookie flags | `curl -I` | ✅ `JSESSIONID` cookie has `HttpOnly` (can't be read by JS — mitigates session-token theft via XSS) |
| Session cookie `SameSite`/`Secure` | `curl -I` | ⚠️ **Finding:** no `SameSite` attribute and no explicit `Secure` flag on the session cookie |
| Clickjacking / CSP / HSTS headers | `curl -I` | ⚠️ **Finding:** none of `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security` present — same gap class as every other project in this portfolio |
| API error handling on an invalid account ID | `GET /services/bank/accounts/999999999` | ✅ Returns `400`, not a stack trace or a `200` with null data |
| API authorization boundary | `GET /services/bank/customers/12212/accounts` | ✅ Every account returned genuinely belongs to the requested customer ID (spot-checked, not assumed) |

## Findings detail

### Missing `SameSite`/`Secure` on the session cookie (Medium severity for a banking app)
**What:** the `JSESSIONID` cookie lacks `SameSite=Lax/Strict` and an explicit `Secure` flag.
**Risk:** without `SameSite`, the session cookie is more exposed to CSRF-style attacks (a request forged from another site can still carry it); without `Secure`, the cookie could theoretically be sent over a downgraded HTTP connection.
**Why this is weighted higher here than on the e-commerce projects:** this is a banking session token, not a shopping-cart session — the same class of gap carries more real-world weight.

### Missing security headers (Low-Medium, recurring pattern across this portfolio)
Same as [Project 01](../../01-ecommerce-automationexercise/04-security-api/security-checks.md) and [Project 03](../../03-healthcare-cura/04-security-api/security-checks.md) — worth noting as a *pattern*: none of the demo apps in this portfolio ship a CSP or HSTS header. On a real team, three unrelated findings of the same shape across different products would be worth raising as an org-wide gap, not three separate one-off tickets — the kind of pattern-recognition a test manager is expected to bring, not just an individual tester filing the same bug three times.

## See also

[`data-validation/`](data-validation) for the SQL-level reconciliation technique used to catch defects the API/UI layer can't see.
