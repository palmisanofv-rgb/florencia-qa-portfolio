# Test Report — Swag Labs (saucedemo.com)

## Real CI run (GitHub Actions)

| Round | Result | Root cause found |
|-------|--------|-------------------|
| 1 | 6/9 passed | Add-to-cart buttons only carry `data-test`, not the `id` I'd assumed |
| 2 | Still failing, same selector | Turned out to be a red herring — see round 3 |
| 3 | 6/8 passed, checkout still failing | **The real bug:** `testng.xml`'s `parallel="methods" thread-count="3"` runs every `@Test` method on one shared TestNG instance, so two threads were typing into the *same* login form at once. A saved failure screenshot (added in this round via `BaseTest`'s new failure-artifact capture) showed the literal proof: `standard_userstandard_user` doubled up in the username field. Switched to sequential execution. |
| 4 | 6/8 passed, checkout still failing | With the race gone, the *real* selector bug from round 1 was still there — but it wasn't the attribute name, it was that `inventory_item_name`'s `class` attribute has a **trailing space** (`class="inventory_item_name "`), which breaks an exact `@class='...'` XPath match. Confirmed directly from the saved page-source artifact. Switched to `[data-test='add-to-cart-<slug>']`, which the same artifact confirmed is present and correctly formatted. |
| 5 | 6/8 passed, checkout still failing | Add-to-cart now worked (badge count reached 2), but the screenshot showed the suite stuck on the Products page after `goToCart()` - the cart icon is an empty `<a>` whose visible icon comes from a sibling SVG, and a native WebDriver click on it wasn't registering as real navigation. Switched to `data-test='shopping-cart-link'` plus a JS-dispatched click (`arguments[0].click()` via `JavascriptExecutor`), which bypasses WebDriver's visibility/clickability-at-point checks entirely. |
| 6 | 6/8 passed, checkout still failing | The cart page itself now loaded correctly, but `cart.checkout()` hit the exact same "native click doesn't register" issue as the cart icon, on `#checkout` this time - even though that button is a completely normal, correctly-located element (confirmed via the artifact). Applied the same JS-dispatched click to `CartPage.checkout()` and, preemptively, to `CheckoutPage`'s continue/finish buttons, rather than waiting for each one to fail in its own CI round. |
| 7 | 7/8 passed | The "preemptive" JS-click on `CheckoutPage`'s continue button backfired: the screenshot showed the form submitted with **all three fields empty** ("Error: First Name is required" despite sending "Florencia"). The JS click fired synchronously, before React had processed the `sendKeys`-triggered `onChange` events - a real native `.click()` leaves just enough of a gap for that to catch up. Reverted `continueButton`/`finishButton` to native clicks; this button never actually had the "doesn't register" problem the cart icon and `#checkout` had, so the preemptive fix was solving a problem that didn't exist there while creating a new one. Lesson: apply a fix where it's *confirmed* needed, not everywhere a similar-looking button appears. |

The screenshot/page-source capture added to `BaseTest` in round 3 is what turned rounds 3–4 from more guessing into actually diagnosing the real problem — see [`00-qa-strategy-and-leadership/test-strategy-master.md`](../00-qa-strategy-and-leadership/test-strategy-master.md) for why this project treats "a passing suite that asserts the wrong thing" as worse than no suite; the inverse also holds for debugging a *failing* suite; guessing at fixes without evidence just burns cycles.

## Summary

| Suite | Cases | Notes |
|-------|-------|-------|
| Login (6 seeded accounts) | 6 | `locked_out_user` correctly rejected; the other 5 reach inventory |
| Checkout | 2 | Happy path + missing-last-name validation |

## Known-defect accounts (by design, used to demonstrate defect-detection)

| Account | Known issue | How this suite would catch it |
|---------|-------------|-------------------------------|
| `problem_user` | Product images are all identical / sort is broken | A visual/sort-order assertion comparing `problem_user`'s sorted list against `standard_user`'s would fail — flagged as a `report.md` follow-up, not yet asserted in `LoginTests` (only login success is asserted today) |
| `performance_glitch_user` | Artificial multi-second delay on every action | Would show up as a duration outlier if tests capture per-step timing (recommended next step: wrap actions with `System.currentTimeMillis()` deltas and assert against an SLA threshold) |
| `error_user` / `visual_user` | Assorted UI/JS console errors | Recommended next step: assert `driver.manage().logs().get(LogType.BROWSER)` has no `SEVERE` entries after each page load |

## Recommended next iteration

Extend `InventoryPage` assertions to cross-check `problem_user` and `performance_glitch_user` against `standard_user` explicitly — turning this from "login smoke test" into a genuine **regression suite that catches Sauce Labs' intentionally seeded defects**, which is the strongest way to demonstrate defect-detection skill on a site that has no real bugs to find otherwise.
