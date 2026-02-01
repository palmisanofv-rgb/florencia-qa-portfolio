# Test Plan — CURA Healthcare Service

**Application under test:** [katalon-demo-cura.herokuapp.com](https://katalon-demo-cura.herokuapp.com/) (Katalon's official demo app, framed here as a legacy hospital system)

## 1. Scope

### 1.1 In scope
- Login (valid/invalid)
- Make Appointment: facility, hospital readmission flag, healthcare program, visit date, comment
- Confirmation screen data integrity

### 1.2 Out of scope
- Load testing beyond a light smoke test
- Any write operation beyond what's needed to prove the booking flow (no destructive testing)

## 2. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Confirmation page data mismatch | Medium | Critical | Field-by-field diff assertion |
| Login accepts blank credentials | Low | High | Explicit negative test |

## 3. Strategy

Selenium WebDriver + Java, chosen deliberately to represent automating a system a team inherited rather than built (see [`test-strategy.md`](test-strategy.md)).

## 4. Entry Criteria
- Site reachable, returns 200

## 5. Exit Criteria
- Login suite green (valid + invalid)
- Booking suite green with confirmation-page data verified against submitted values

## 6. Resources

| Resource | Purpose |
|----------|---------|
| Selenium WebDriver + Java + TestNG | E2E automation |
| GitHub Actions | CI execution |
