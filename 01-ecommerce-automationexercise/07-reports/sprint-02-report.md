# Sprint 02 Report — automationexercise.com

**Sprint goal:** take this project from "P1 journey covered" to genuinely full coverage of the site's 26 published scenarios — formalize every scenario as a real test case, automate everything that's actually worth automating, capture real evidence for all of it, deepen the API/performance layers, and fold in the accessibility findings from the portfolio-wide spot-check.

## Planned vs. delivered

| Planned | Delivered |
|---------|-----------|
| Formalize the 14 scenarios previously marked "Exploratory" as real test cases | ✅ TC-13 through TC-26 in [`02-test-cases/test-cases.csv`](../02-test-cases/test-cases.csv), traceability matrix updated |
| Automate every scenario that's actually worth automating | ✅ Overall automation ratio up from 6/26 to 16/26 — see below |
| A second real E2E journey covering catalog/engagement | ✅ [`catalog-and-engagement.spec.ts`](../03-automation/tests/catalog-and-engagement.spec.ts) - 8 scenarios in one connected flow |
| A dedicated test for cart-session behavior across login | ✅ [`cart-persistence.spec.ts`](../03-automation/tests/cart-persistence.spec.ts) |
| Shared auxiliary helpers instead of duplicated account setup/teardown code | ✅ [`helpers/account.ts`](../03-automation/helpers/account.ts), [`helpers/navigation.ts`](../03-automation/helpers/navigation.ts) |
| Full evidence set - one real screenshot per automated test case | ✅ 20 real screenshots in [`06-evidence`](../06-evidence), all captured this sprint |
| Deepen the performance test beyond 2 endpoints | ✅ 4 endpoints, staged load profile, real run captured in [`05-performance/last-run-results.md`](../05-performance/last-run-results.md) |
| Fold portfolio-level accessibility findings into this project's own reports | ✅ [`04-security-api/security-checks.md`](../04-security-api/security-checks.md) |

## Defects / findings this sprint

All of these were found by actually running the new automation against the live site, not written speculatively:

1. **Real, reproducible finding: this site's ad network intercepts click-driven navigation.** Two separate manifestations, both confirmed with a minimal repro script before being worked around in the actual page objects:
   - Clicking a real `<a href>` link (e.g. the top-nav "Test Cases" link, a product's "View Product" link) is sometimes swallowed entirely by a Google Vignette full-page ad interstitial - the URL gets `#google_vignette` appended and the page never actually navigates. Confirmed via `page.url()` after the click. Fixed with a documented reload-and-retry helper ([`helpers/navigation.ts`](../03-automation/helpers/navigation.ts)), the same disposition as this portfolio's other third-party-infrastructure flakiness (Parabank's bot-check, BlazeDemo's rate limiting) - not a defect in the site under test, but real, and worth handling explicitly rather than silently.
   - Separately, an inline Google AdSense ad slot intermittently renders directly on top of the product-review "Submit" button, and Playwright's own actionability check confirms the ad iframe - not the button - is what would receive a real click. A real user who happened to load that ad placement could not click Submit either. Documented in [`pages/ProductDetailPage.ts`](../03-automation/pages/ProductDetailPage.ts) rather than silently forced past.
2. **Real automation bug, not a site bug: a carousel's hidden slide.** The home page's "recommended items" widget renders two `.item` slides at once (one `.item`, one `.item.active`) for its carousel transition - a naive `.first()` locator on `.add-to-cart` intermittently grabbed a link inside the *hidden* slide, which Playwright then waited on indefinitely since it's never actionable. Fixed by scoping to `.item.active` specifically. Caught because the evidence-capture run actually exercises this interaction, not because it was anticipated.
3. **Real automation bug: overly broad heading selector.** `.features_items h2` matches both the page's actual title heading and every product tile's price (`<h2>Rs. 500</h2>` etc.) - a strict-mode violation the moment more than one product is on the page. Scoped to `h2.title` specifically.
4. **Two categories share a sub-category label.** Both "Women" and "Kids" have a "Dress" sub-category with identical link text - searching the whole sidebar accordion for a link named "Dress" is ambiguous. Scoped the category-click helper to the specific top-level panel's own DOM id instead.
5. **Documentation defect, not a code defect: TC-04 was marked manual when it was already automated.** `login-security.spec.ts`'s second test already exercises logout end-to-end; the traceability matrix and CSV simply hadn't been updated to reflect it. Corrected.
6. **3 real accessibility defects, formalized from the portfolio-wide spot-check:** generic/non-descriptive alt text on ~40 of 44 homepage images, the "Add to cart" CTA not reachable within 15 keyboard Tab presses, and no visible focus indicator across any tab stop checked. Full detail in [`04-security-api/security-checks.md`](../04-security-api/security-checks.md).

## Metrics

| Metric | Sprint 01 | Sprint 02 |
|--------|-----------|-----------|
| Scenario coverage (formal test case, not "Exploratory") | 12/26 | **26/26** |
| Overall automation ratio | 6/26 | **16/26** |
| P1 automation ratio | 5/7 | **5/9** (P1 count grew to 9 as TC-17/TC-23 were formalized; the 4 unautomated P1s are all checkout/payment variants kept manual by design) |
| Evidence screenshots | 2 real (rest pending) | **20 real** |
| Performance endpoints covered | 2 | **4** |
| Open defects | 0 | 0 (all findings this sprint were either fixed in the automation itself, or are third-party/informational, same disposition as sprint 01) |

## Known risk carried forward (unchanged from sprint 01)

automationexercise.com's intermittent bot-protection challenge and redirect-limit behavior against automated traffic are unchanged from sprint 01 - see that report for detail. This sprint adds the ad-interstitial behavior above as a second, distinct category of third-party noise this project now handles explicitly rather than being surprised by.
