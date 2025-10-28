# Master Test Strategy

## Philosophy

A test strategy exists to answer one question under real time constraints: **where does the team's limited testing time go, and why?** Every project in this portfolio applies the same three principles, adapted to its domain:

1. **Risk before coverage.** Every project's `test-plan.md` starts with a risk analysis (likelihood × impact), not a feature list. Coverage follows risk, not the other way around — e.g. banking ([Project 04](../04-banking-parabank-selenium-python)) prioritizes balance-arithmetic correctness over UI polish; the technique lab ([Project 08](../08-technique-lab-the-internet-webdriverio)) exists specifically because iframes/shadow DOM/native dialogs are disproportionately likely to hide real defects behind a "looks fine" naive test.
2. **Test pyramid, not test ice-cream-cone.** API/SQL checks (fast, stable, cheap to maintain) do the bulk of regression coverage; UI automation (Playwright/Selenium/Katalon/Appium) covers user-journey-critical paths only; manual/exploratory testing covers what automation structurally can't (visual judgment, one-off investigation, edge cases not worth the maintenance cost to automate).
3. **A passing suite that asserts the wrong thing is worse than no suite.** Recurring pattern across this portfolio: don't assert "no exception was thrown" or "a success banner appeared" — assert the actual resulting state (cart totals in [Project 01](../01-ecommerce-automationexercise), account balances in [Project 04](../04-banking-parabank-selenium-python), revenue totals in [Project 10](../10-database-sql-etl-validation)). The ETL project's seeded bug ([Project 10](../10-database-sql-etl-validation)) exists specifically to demonstrate this: row-count checks pass cleanly while the actual defect sits one layer deeper.

## Environment strategy

Every target in this portfolio is a public sandbox explicitly built for testing/automation practice (or a local, self-contained dataset) — chosen deliberately so every project is runnable and legally unambiguous without needing access to a real employer's systems. In a real organization, this same strategy applies to a dedicated QA/staging environment with synthetic data, for the same reason: tests need a stable, disposable environment that won't be disrupted by (or disrupt) production traffic.

## Defect management

Every project that models a defect (see [Project 02](../02-ecommerce-saucedemo-selenium-java)'s seeded-bug accounts, [Project 04](../04-banking-parabank-selenium-python)'s $0-transfer finding, [Project 06](../06-travel-blazedemo-jmeter)'s hardcoded-city finding, [Project 10](../10-database-sql-etl-validation)'s revenue drift) follows the same triage format: severity, reproduction steps, expected vs. actual, and a disposition (fix now / accept / needs product decision) — never just "found a bug" with no next step attached. See [Project 01's sample bug report](../01-ecommerce-automationexercise/manual-testing/bug-report-sample.md) for the template.
