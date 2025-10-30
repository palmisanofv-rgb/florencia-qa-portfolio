# Test Report — Swag Labs (saucedemo.com)

## Real CI run (GitHub Actions)

First run: 6/9 tests passed, 3 failed on `#add-to-cart-sauce-labs-backpack` (`NoSuchElementException`). Root cause: the inventory page's add-to-cart buttons only carry a `data-test` attribute, not the matching `id` I'd assumed — fixed `InventoryPage.addToCartByProduct` to use `[data-test='...']` instead of `By.id`. All 6 login-account scenarios passed on the first try. See CI badge on the [root README](../README.md) for the current run.

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
