# Basic Security Testing — saucedemo.com

Swag Labs has no public backend API (it's a static React SPA with purely client-side session state), so this folder focuses on what a security-aware functional tester can still check without a backend to hit.

## Checks performed (real HTTP requests, not assumed)

| Check | Method | Result |
|-------|--------|--------|
| Security response headers | `curl -I` | ⚠️ **Finding:** no `X-Frame-Options`, `Content-Security-Policy`, or `Strict-Transport-Security` header present at all |
| Direct navigation to an authenticated route without logging in | `curl -o /dev/null -w '%{http_code}'` on `/inventory.html` | Returns `404` at the HTTP layer — confirms there's **no server-side session/auth check whatsoever**; access control (if any) is entirely a client-side React concern, enforced only by what the JS bundle decides to render |
| Client-side auth bypass (real browser check) | Automated in [`../03-automation/tests/seeded-accounts-login.spec.ts`](../03-automation/tests/seeded-accounts-login.spec.ts) | `locked_out_user` is correctly rejected by the app *logic*, but this is enforced entirely client-side |

## Findings detail

### Finding 1 — No security response headers (Low-Medium severity)
**What:** the site sends none of `X-Frame-Options`, `Content-Security-Policy`, or `Strict-Transport-Security`.
**Risk:** for a demo app, low. For a real e-commerce checkout flow, this combination (no clickjacking protection + no CSP) is a real gap worth flagging in a design review.
**Recommendation:** add the same baseline headers checked in [Project 01](../../01-ecommerce-automationexercise/04-security-api/security-checks.md).

### Finding 2 — Authorization is purely client-side (Informational, by design for a demo app)
**What:** there is no server-side concept of "logged in" at all — `/inventory.html` is a static asset that returns 404 to a direct HTTP client (no JS engine) regardless of session state, and whatever access control exists is entirely inside the React bundle's client-side routing logic.
**Why this is worth documenting, not just noting:** in a real product, "the UI hides the button" is not the same as "the user can't do the thing" — this is precisely the class of finding a security-aware QA function should flag as a question for the architecture ("is there a real backend enforcing this anywhere?"), even on an app where the answer here is "it's a demo, this is expected."

## Disposition

Both findings are appropriate for this app's purpose (a Selenium/Playwright practice target, not a production system) — documented here as the kind of question a test manager would still ask even on a low-risk system, not as blocking defects.

## Accessibility findings

A separate, lightweight AI-assisted accessibility spot-check (alt text, contrast, keyboard reachability) was run against the login and inventory pages — see [`../03-automation/accessibility-check.md`](../03-automation/accessibility-check.md) for full methodology. Summary:

| Dimension | Result |
|---|---|
| Alt text (inventory page, 8 images) | **Clean** — all 8 have specific, descriptive alt text (e.g. "Sauce Labs Backpack"), unlike Project 01's generic repeated string |
| Contrast (login button, add-to-cart button) | **Clean** — 9.17:1 and 16.26:1, both comfortably above the 4.5:1 threshold |
| Keyboard reachability (login page) | Reached in 2 tabs, but no visible focus indicator (same pattern as Project 01) |
| Keyboard reachability (inventory page, "Add to cart") | **Inconclusive** — a real browser-automation tooling failure (not a site defect) prevented a clean re-run; confirmed again during this deepening pass rather than assumed fixed |

Overall this is the cleanest accessibility result in the portfolio so far on the dimensions that could be checked — the seeded test accounts (below) are a more interesting finding than the site's own accessibility posture.

## Seeded-account defect: `problem_user`'s product images

Beyond security/accessibility, this pass added a real, verified assertion for a defect this project's sprint 1 report flagged but didn't individually assert: **every product image on `problem_user`'s inventory page is the exact same broken placeholder** (`sl-404.*.jpg`), confirmed by comparing against `standard_user`'s 6 distinct product images. Now asserted directly in [`../03-automation/tests/seeded-accounts-login.spec.ts`](../03-automation/tests/seeded-accounts-login.spec.ts) rather than only implied by a passing login check. `performance_glitch_user`'s artificial delay is now also measured directly: **~11x slower** than `standard_user` in a real captured run (5.1s vs 0.5s).
