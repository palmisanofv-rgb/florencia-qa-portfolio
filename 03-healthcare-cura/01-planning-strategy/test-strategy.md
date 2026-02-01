# Test Strategy — CURA Healthcare Service

## 1. Product & Business Value

CURA is framed here as a **legacy hospital appointment-booking system** — a genuinely old (AngularJS 1.x) internal tool many healthcare orgs still run because replacing it is expensive and risky. The business value is entirely in **data integrity**: a booking system that shows the wrong facility or wrong date on the confirmation screen is a patient-safety-adjacent defect, not a cosmetic one.

| Capability | Business value | Why |
|-------------|----------------|-----|
| Appointment booking data integrity | Critical | Confirmation must match what was actually submitted — a mismatch is a real-world scheduling error |
| Login | High | Gatekeeps patient data access |
| Facility/program selection | Medium-High | Wrong facility routing has real operational cost |

## 2. Business Risk Analysis

| Risk | Likelihood | Business Impact | Mitigation |
|------|-----------|-------------------|------------|
| Confirmation screen shows different data than submitted | Medium | Critical | Field-by-field assertion between submitted values and confirmation screen |
| Login accepts empty/invalid credentials | Low | High | Explicit negative login test |
| A past date is accepted for a new appointment | Medium | Medium | Documented as a manual exploratory check (see test cases) |

## 3. Direction & Management View

- **Why this is framed as "legacy":** the point isn't that CURA itself is old (it's a training/demo app) — it's that this project deliberately represents the **class of system** a QA lead is very likely to inherit: server-rendered, jQuery/AngularJS-era, unowned by any current team, that still needs regression coverage before every change. Selenium WebDriver is the tool most likely to already be in a team's toolchain for exactly this kind of system.
- **Resourcing call:** deep automation investment here is capped — a legacy system slated for eventual replacement doesn't get the same automation investment as an actively-developed product. One solid E2E flow (login → book → verify) is the right level of investment, not exhaustive coverage.

## 4. Test Plan

See [`test-plan.md`](test-plan.md).
