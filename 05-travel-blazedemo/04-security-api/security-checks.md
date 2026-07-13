# Basic Security Testing — BlazeDemo

No public API on this app; checks focus on headers and the payment form.

## Checks performed (real HTTP requests)

| Check | Method | Result |
|-------|--------|--------|
| Security response headers | `curl -I` | ⚠️ **Finding:** no `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, or `X-Content-Type-Options` at all — the weakest header posture of any project in this portfolio |
| Card number field accepts non-numeric input | Manual check | Not enforced client-side — acceptable for a demo app whose "payment" is entirely simulated, but would be a real finding on an actual payment form |

## Disposition

Same class of finding as every other project — reported for completeness and pattern-tracking (see [Project 04's security-checks.md](../../04-banking-parabank/04-security-api/security-checks.md) for why tracking this pattern across projects matters more than any single instance of it).

## Accessibility findings

A separate, lightweight AI-assisted accessibility spot-check (alt text, contrast, keyboard reachability) was run against the homepage — see [`../03-automation/accessibility-check.md`](../03-automation/accessibility-check.md) for full methodology. **Clean pass, no findings:** contrast 5.17:1 on the primary CTA, reached in 6 keyboard tabs with a **clearly visible focus indicator** — a genuinely clean result on every dimension checked. Alt text not applicable (no images on this page).
