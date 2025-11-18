# Basic Security Testing — automationexercise.com

Lightweight, non-intrusive security checks appropriate for a public sandbox (no destructive testing, no scanning tools that generate heavy traffic — see [`00-qa-strategy-and-leadership`](../../00-qa-strategy-and-leadership) for why this portfolio only ever does read-safe checks against third-party sites).

## Checks performed (all via real HTTP requests, not assumed)

| Check | Method | Result |
|-------|--------|--------|
| Clickjacking protection | `curl -I` response headers | ✅ `X-Frame-Options: DENY` present |
| MIME-sniffing protection | `curl -I` response headers | ✅ `X-Content-Type-Options: nosniff` present |
| Transport security (HSTS) | `curl -I` response headers | ⚠️ **Finding:** no `Strict-Transport-Security` header — see below |
| Content Security Policy | `curl -I` response headers | ⚠️ **Finding:** no `Content-Security-Policy` header — see below |
| Server/tech fingerprinting | `curl -I` response headers | ⚠️ **Finding:** `X-Powered-By: Phusion Passenger(R) 6.1.2` discloses stack info — see below |
| SQL-injection-style payload | `search_product=top' OR '1'='1` via `/api/searchProduct` | ✅ Returns `{"responseCode": 200, "products": []}` — treated as a literal (non-matching) string, no error, no data leak |
| Reflected XSS | `<script>alert(1)</script>` in a query param | ✅ Not reflected unescaped in the response HTML |
| Verbose error disclosure | Malformed API request (missing required param) | ✅ Generic message (`"Bad request, email or password parameter is missing..."`), no stack trace or internal path disclosed |
| Auth boundary | Wrong password via `/api/verifyLogin` and the UI | ✅ Rejected with `responseCode: 404` / no session — see [`../03-automation/tests/login-security.spec.ts`](../03-automation/tests/login-security.spec.ts) |

## Findings detail

### Finding 1 — Missing HSTS header (Low severity)
**What:** the site doesn't send `Strict-Transport-Security`, so a browser that's ever reached this site over plain HTTP wouldn't be forced to upgrade to HTTPS automatically on a later visit.
**Risk:** low in practice (Cloudflare is in front and typically redirects HTTP→HTTPS at the edge), but it's a defense-in-depth gap.
**Recommendation:** add `Strict-Transport-Security: max-age=31536000; includeSubDomains`.

### Finding 2 — No Content-Security-Policy (Low-Medium severity)
**What:** no CSP header means the browser enforces no restriction on which scripts/styles/frames can execute, beyond same-origin defaults.
**Risk:** doesn't cause a vulnerability by itself, but removes a real mitigation layer if an XSS bug is ever introduced elsewhere in the app.
**Recommendation:** start with a report-only CSP to see what it would break before enforcing.

### Finding 3 — Stack fingerprinting via `X-Powered-By` (Informational)
**What:** `X-Powered-By: Phusion Passenger(R) 6.1.2` tells an attacker exactly which app server and version is in front of the app, narrowing which known CVEs to try first.
**Recommendation:** strip or generalize this header at the reverse proxy.

## Disposition

All three findings are low-severity/informational and are exactly the kind of thing a security-aware QA function should flag even without a dedicated pentest — none of them are exploited or exploitable on their own in this check, they're reported as **hardening recommendations**, which is the right disposition for findings of this severity.

## Accessibility findings

A separate, lightweight AI-assisted accessibility spot-check (alt text, contrast, keyboard reachability) was run against the homepage — see [`../03-automation/accessibility-check.md`](../03-automation/accessibility-check.md) for the full methodology and exact numbers. Summary:

| Finding | Severity | Status |
|---------|----------|--------|
| ~40 of 44 product images share one generic, non-descriptive `alt` string ("ecommerce website products") | Medium | Reported, not fixed (third-party site) |
| "Add to cart" CTA not reachable within 15 keyboard Tab presses from a fresh page load | Medium-High | Reported, not fixed (third-party site) |
| No visible keyboard-focus indicator across any of the 15 tab stops checked | Medium | Reported, not fixed (third-party site) |

Contrast on the one CTA checked (5.15:1) passed comfortably — not every dimension of this spot-check turned up an issue. This is tracked at the portfolio level as [`risk-register.md`](../../00-qa-strategy-and-leadership/risk-register.md) R-29 and R-30, and as an open coverage gap in [`roadmap.md`](../../00-qa-strategy-and-leadership/roadmap.md).
