# Test Strategy — BlazeDemo

## 1. Product & Business Value

BlazeDemo (BlazeMeter's own demo) is framed here as an **airline booking front-end**. Business value sits in the booking funnel completing without silently corrupting data (wrong route, wrong price) — this project pairs that functional risk with **performance risk**, since a booking funnel under load that starts silently corrupting data is a worse outcome than one that's merely slow.

| Capability | Business value | Why |
|-------------|----------------|-----|
| Flight search → selection → purchase funnel | Critical | Direct revenue path |
| Booking confirmation accuracy | High | A confirmation that doesn't match what was booked is a real customer-trust incident |
| Response time under light concurrent load | Medium-High | Booking funnels are exactly where load-related slowness costs the most abandoned carts |

## 2. Business Risk Analysis

| Risk | Likelihood | Business Impact | Mitigation |
|------|-----------|-------------------|------------|
| Confirmation page shows the wrong route/city | Medium | High | Functional finding already on file — see [`07-reports`](../07-reports) |
| Funnel breaks or slows under light concurrent load | Medium | High | JMeter smoke test with response-time thresholds, not just a pass/fail |

## 3. Direction & Management View

- **Why both Playwright and JMeter live in one project:** this is the one project in the portfolio where functional and performance risk are treated as inseparable — a booking funnel is exactly the kind of system where "it works" and "it works under load" are both P1 questions, not sequential nice-to-haves.

## 4. Test Plan

See [`test-plan.md`](test-plan.md).
