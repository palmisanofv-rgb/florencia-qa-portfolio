# Basic Security Testing — CURA Healthcare Service

CURA has no public JSON API (server-rendered PHP), so this folder covers session/access-control checks — arguably the higher-value security question for a **healthcare appointment system** anyway (patient data access control matters more than API contract shape).

## Checks performed (real HTTP requests)

| Check | Method | Result |
|-------|--------|--------|
| Unauthenticated access to the appointment area | `curl -I https://.../appointment.php` (no session cookie) | ✅ **302 redirect to `/`** — unlike some demo apps, this one *does* enforce server-side session access control, not just client-side hiding |
| Security response headers | `curl -I` | ⚠️ **Finding:** no `X-Frame-Options`, `Content-Security-Policy`, or `Strict-Transport-Security` — same gap class as the other projects in this portfolio |
| Login with empty credentials | Automated, see [`../03-automation`](../03-automation) | ✅ Rejected, no session established |

## Finding detail

### Missing security headers (Low-Medium severity, higher stakes here than elsewhere)
**What:** no clickjacking or content-security-policy protection.
**Why this matters more for a healthcare app specifically:** a clickjacking attack against an appointment-booking flow that touches patient scheduling data is a more sensitive target than, say, an e-commerce cart — the same low-severity finding carries different real-world weight depending on the domain, which is exactly the kind of judgment call a risk-based test strategy is supposed to make explicit (see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md)).

## Disposition

The access-control redirect is a genuinely good sign (real server-side enforcement, confirmed not assumed). The missing headers are reported as a hardening recommendation, weighted slightly higher than the identical finding on the e-commerce projects in this portfolio, given the domain.
