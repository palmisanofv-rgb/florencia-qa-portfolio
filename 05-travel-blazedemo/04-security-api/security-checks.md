# Basic Security Testing — BlazeDemo

No public API on this app; checks focus on headers and the payment form.

## Checks performed (real HTTP requests)

| Check | Method | Result |
|-------|--------|--------|
| Security response headers | `curl -I` | ⚠️ **Finding:** no `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, or `X-Content-Type-Options` at all — the weakest header posture of any project in this portfolio |
| Card number field accepts non-numeric input | Manual check | Not enforced client-side — acceptable for a demo app whose "payment" is entirely simulated, but would be a real finding on an actual payment form |

## Disposition

Same class of finding as every other project — reported for completeness and pattern-tracking (see [Project 04's security-checks.md](../../04-banking-parabank/04-security-api/security-checks.md) for why tracking this pattern across projects matters more than any single instance of it).
