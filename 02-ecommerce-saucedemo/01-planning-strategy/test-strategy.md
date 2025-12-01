# Test Strategy — saucedemo.com (Swag Labs)

## 1. Product & Business Value

Swag Labs is Sauce Labs' own demo retail storefront, and — usefully for a portfolio — it ships with **6 seeded user accounts**, several of which have deliberate defects (`problem_user`, `performance_glitch_user`). Framed as a real retailer: the business value sits in checkout completing reliably and inventory sorting/pricing being trustworthy; the seeded-defect accounts are treated here as a stand-in for **regression testing against known-bad builds**, which is a real scenario (a QA team validating a release candidate that shipped with a known issue and needs to confirm the blast radius).

| Capability | Business value | Why |
|-------------|----------------|-----|
| Checkout completion | Critical | Direct revenue path |
| Inventory sort/pricing | High | Wrong price or sort order erodes trust fast |
| Login/account access | High | Gatekeeps the entire funnel |
| Seeded-defect accounts (`problem_user` etc.) | N/A (test infrastructure) | Used to demonstrate defect-detection, not real business value |

## 2. Business Risk Analysis

| Risk | Likelihood | Business Impact | Mitigation |
|------|-----------|-------------------|------------|
| Checkout accepts an incomplete order (missing required field) | Medium | High | Explicit negative test (missing last name) in the automated suite |
| Cart badge/count desyncs from actual cart contents | Medium | Medium | Explicit wait-and-assert on badge count after every add-to-cart, not an instant read |
| A known-bad account (`problem_user`) ships in a release and nobody notices | High (by design) | Medium | Login suite runs against **all 6 seeded accounts**, not just `standard_user`, every cycle |

## 3. Direction & Management View

- **Decision:** this project deliberately runs the *same* login+checkout journey against every seeded account, not just the happy-path one. That's the management call worth calling out: a suite that only ever runs against a clean account looks green forever, even on a release that ships a known regression.
- **Tooling call:** Playwright, not Selenium — this is a modern React SPA, and Playwright's auto-waiting removes a whole category of flaky-test debugging that a raw Selenium suite would otherwise hit against client-rendered state changes (see [`00-qa-strategy-and-leadership/tool-tech-matrix.md`](../../00-qa-strategy-and-leadership/tool-tech-matrix.md)).

## 4. Test Plan

See [`test-plan.md`](test-plan.md).
