# Master Test Strategy

## Philosophy

A test strategy exists to answer one question under real time constraints: **where does the team's limited testing time go, and why?** Every project in this portfolio applies the same three principles, adapted to its domain:

1. **Risk before coverage.** Every project's `01-planning-strategy/test-strategy.md` starts with a business-value and risk analysis, not a feature list. Coverage follows risk, not the other way around — e.g. banking ([Project 04](../04-banking-parabank)) prioritizes balance-arithmetic correctness over UI polish; the legacy-tools project ([Project 06](../06-legacy-tools-theinternet)) exists specifically because iframes/shadow DOM/native dialogs are disproportionately likely to hide real defects behind a "looks fine" naive test.
2. **Test pyramid, not test ice-cream-cone.** API/security checks (fast, stable, cheap to maintain) do the bulk of regression coverage; E2E automation (Playwright/Selenium/Appium) covers user-journey-critical paths only; manual test cases and exploratory notes cover what automation structurally can't (visual judgment, one-off investigation, edge cases not worth the maintenance cost to automate).
3. **A passing suite that asserts the wrong thing is worse than no suite.** Recurring pattern across this portfolio: don't assert "no exception was thrown" or "a success banner appeared" — assert the actual resulting state (cart totals in [Project 01](../01-ecommerce-automationexercise), account balances in [Project 04](../04-banking-parabank)).

## Environment strategy

Every target in this portfolio is a public sandbox explicitly built for testing/automation practice, or an official demo instance of real open-source software — chosen deliberately so every project is runnable and legally unambiguous without needing access to a real employer's systems. In a real organization, this same strategy applies to a dedicated QA/staging environment with synthetic data, for the same reason: tests need a stable, disposable environment that won't be disrupted by (or disrupt) production traffic.

## Defect management

Every project that models a defect follows the same triage format: severity, reproduction steps, expected vs. actual, and a disposition (fix now / accept / needs product decision) — never just "found a bug" with no next step attached. See each project's `07-reports/` folder for real examples, and [Project 01's sample bug report](../01-ecommerce-automationexercise/02-test-cases/bug-report-sample.md) for the template every other project reuses.

## Sprint cadence

Each project's `07-reports/` folder contains per-sprint reports (what was planned, executed, and found) plus a final summary — modeling how a test manager reports progress upward on a cadence, not just at the end of a release. This is the CTAL-TM "test progress monitoring and control" skill applied literally, not just described.
