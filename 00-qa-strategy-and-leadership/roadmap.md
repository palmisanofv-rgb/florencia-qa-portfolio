# Portfolio Roadmap

**Author:** Florencia Palmisano
**Purpose:** Every open item below is already mentioned somewhere else in this folder, next to the finding or decision that produced it. This document exists so a reader doesn't have to reconstruct "what's actually left" by cross-referencing five files — it's the single place that answers "if you had one more sprint, what would you do."

## How to read this

Three different kinds of "not done yet" get lumped together too easily. This portfolio treats them as distinct:

- **Coverage gap** — something was written but couldn't be verified, or was verified shallowly when it deserves a deeper pass.
- **Pending product decision** — the system's actual behavior is documented and confirmed; what's missing isn't a test, it's someone with product authority deciding if that behavior is acceptable.
- **Automation debt** — a deliberate manual/skipped step whose original justification has a shelf life and needs revisiting once circumstances change.

| # | Project | Item | Type | Resolved when |
|---|---------|------|------|----------------|
| 1 | [09](../09-mobile-appium) | Appium suite has never run against a real device | Coverage gap | Suite executes once against a real emulator and results are compared to what the static analysis assumed |
| 2 | [02](../02-ecommerce-saucedemo) | `problem_user` / `performance_glitch_user` pass login but their specific seeded defects aren't individually asserted | Coverage gap | Each seeded account has an assertion tied to its documented defect, not just a shared login-success check |
| 3 | [01](../01-ecommerce-automationexercise) | Checkout stays manual because the sandbox payment form isn't idempotent | Automation debt | A real payment gateway (even a sandboxed one) replaces the current form, making repeatable automation safe |
| 4 | [04](../04-banking-parabank) | $0 transfer is accepted without rejection | Pending product decision | A product owner rules whether $0 transfers are intentionally allowed (e.g. "verify these accounts are linked") or should be blocked |
| 5 | [03](../03-healthcare-cura) | A past date is accepted for a new appointment | Pending product decision | A product owner rules whether backdating appointments is ever valid, or the app should enforce a future-date boundary |

## 1. Coverage gaps

### 1.1 — Appium suite, unexecuted (Project 09)

Every other project in this portfolio had its selectors checked against a live site with a raw HTTP request before being called done; this one couldn't be, because no emulator or running Appium server was available in this environment. The suite is written against Appium's own published `ApiDemos-debug.apk` structure, but "written" and "verified" are different claims, and [`test-strategy-master.md` §8](test-strategy-master.md) and [`risk-register.md` R-27](risk-register.md) both say so directly instead of letting a green folder imply otherwise.

**Next step:** run the suite once against a real emulator, log the actual pass/fail per scenario, and update the final report with real results instead of a static-analysis assumption.

### 1.2 — saucedemo seeded-account defects, shallow coverage (Project 02)

[R-13](risk-register.md) already flags this: login success is asserted across all 6 seeded accounts, but the specific known defects behind `problem_user` (broken images / wrong data) and `performance_glitch_user` (artificial latency) aren't individually asserted — only that login itself succeeds.

**Next step:** one assertion per seeded account's actual documented quirk, not just a shared login check.

## 2. Pending product decisions

Both items here are *not* open test questions — the system's behavior is already confirmed and reproducible. What's missing is a decision-maker, not a test case.

### 2.1 — Parabank: $0 transfer accepted (R-03)

Confirmed accepted without rejection. Some systems intentionally allow a $0 transfer as a way to verify two accounts are linked before a real transfer — so this isn't automatically a bug, it's a product call. [`metrics-and-reporting-framework.md` §4](metrics-and-reporting-framework.md) already carries this forward sprint over sprint as "pending product decision" rather than closing it either way without authority to do so.

### 2.2 — CURA: past date accepted for a new appointment (R-05)

The app does not enforce a future-date boundary on new appointments. Documented as an exploratory finding in [`risk-register.md`](risk-register.md), not silently coded around with a client-side check that would mask what the app itself actually does.

## 3. Automation debt

### 3.1 — Project 01 checkout stays manual (R-28)

The sandbox's payment form isn't idempotent across repeated runs, so checkout was kept manual by design rather than automated against a form that would break on re-run. [`test-strategy-master.md` §4](test-strategy-master.md) is explicit that this reasoning has a shelf life: it holds for a demo sandbox, and stops holding the moment a real payment gateway (even a sandboxed Stripe/PayPal test mode) is in play. At that point this stops being an acceptable manual gap and becomes the next P1 automation target.

---

Nothing on this list blocks calling any of the 10 individual projects complete for what they set out to demonstrate. It's the layer above that: the honest answer to "what would the next sprint look like," kept in one place instead of five.
