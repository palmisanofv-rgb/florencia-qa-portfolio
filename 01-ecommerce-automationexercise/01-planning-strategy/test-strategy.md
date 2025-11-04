# Test Strategy — automationexercise.com

## 1. Product & Business Value

automationexercise.com is treated here as a stand-in for a **mid-size online retailer's storefront**. The parts of the product that actually drive revenue are: product discoverability (search/catalog), the ability to build and trust a cart (pricing accuracy), and account management (returning customers). Everything else — contact forms, subscription boxes, social links — is low business value and gets proportionally less testing investment.

| Capability | Business value | Why |
|-------------|----------------|-----|
| Search & catalog | High | If customers can't find a product, nothing downstream matters |
| Cart pricing accuracy | Critical | A wrong total is a direct revenue/trust incident, not a cosmetic bug |
| Account (register/login) | High | Returning-customer retention depends on account reliability |
| Checkout/payment | Critical in a real system, **out of scope here** | This sandbox's payment form is simulated/non-idempotent — see risk table |
| Contact Us, subscriptions | Low | Nice-to-have; a defect here doesn't block a purchase |

## 2. Business Risk Analysis

| Risk | Likelihood | Business Impact | Mitigation |
|------|-----------|-------------------|------------|
| Cart total miscalculated | Medium | High — direct revenue/trust impact | Automated assertion on `price × quantity` per line, every regression run |
| Login accepts invalid credentials | Low | Critical — account takeover class of risk | Negative-path login is part of the core automated journey, not an afterthought |
| Search returns irrelevant results | Medium | Medium — lost sales, not a security issue | Positive + negative keyword cases |
| Checkout flow silently breaks | Medium | Would be Critical in production | Kept **manual/exploratory in this sandbox** (see §3) — in a real org this would be P1 automated and this decision would need sign-off, not silent avoidance |

## 3. Direction & Management View

- **Decision:** checkout/payment automation is explicitly **descoped** for CI, because this sandbox's payment form isn't idempotent (each run would need fresh, real-looking card data and doesn't reset state cleanly). In a real project this is exactly the kind of call a test manager has to make explicit and get stakeholder sign-off on — not something to leave implicit and hope nobody asks.
- **Resourcing:** one Playwright suite covers the P1 revenue-path scenarios end-to-end; everything lower-value is manual/exploratory. This reflects a real constraint — automation time is finite, and it goes where the business risk is, per [`00-qa-strategy-and-leadership`](../../00-qa-strategy-and-leadership).
- **Reporting cadence:** see [`07-reports`](../07-reports) for how this project's status would be communicated sprint-over-sprint to a stakeholder who doesn't read code.

## 4. Test Plan

See [`test-plan.md`](test-plan.md) for scope, entry/exit criteria and schedule.
