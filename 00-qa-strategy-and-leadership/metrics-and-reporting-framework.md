# Metrics & Reporting Framework

What a QA Lead reports upward isn't "tests passed" — it's whether quality risk is trending in the right direction, and where the team's time is best spent next. Applied retrospectively to this portfolio's 10 projects:

## Coverage & automation

| Metric | Definition | Applied to this portfolio |
|--------|------------|----------------------------|
| **Scenario coverage** | % of documented user scenarios mapped to a test (manual or automated) | 26/26 (100%) on Project 01 — see its [traceability matrix](../01-ecommerce-automationexercise/manual-testing/test-cases.md) |
| **Automation ratio** | % of P1/P2 scenarios automated end-to-end | 8/19 (42%) on Project 01; checkout intentionally kept manual (simulated, non-idempotent payment form) — automation ratio should reflect a deliberate choice, not just "everything we got to" |
| **Tool diversity / bus factor** | How many people (and which skillsets) could maintain the suite if one person left | 7 tools across 10 projects, chosen to match different team skillsets — see [`tool-tech-matrix.md`](tool-tech-matrix.md) |

## Defect metrics

| Metric | Definition | Applied to this portfolio |
|--------|------------|----------------------------|
| **Defect detection rate** | Real findings surfaced by the suite vs. by manual testing alone | 4 real findings across this portfolio: $0-transfer accepted ([04](../04-banking-parabank-selenium-python)), hardcoded confirmation city ([06](../06-travel-blazedemo-jmeter)), ETL revenue drift ([10](../10-database-sql-etl-validation)), plus the seeded-bug regression pattern on known-defect accounts ([02](../02-ecommerce-saucedemo-selenium-java)) |
| **Escape rate** | Defects that reach later stages (or production) that an earlier stage should have caught | The ETL project ([10](../10-database-sql-etl-validation)) is a direct illustration: a row-count check alone would have let the revenue-drift defect escape to the business-rule/reporting layer |
| **Severity distribution** | Are defects skewing toward cosmetic or toward data/business-logic? | This portfolio's real findings skew toward data-integrity (banking, ETL) over cosmetic — a deliberate signal that automation effort went where the actual risk was |

## Delivery/process metrics

| Metric | Definition | Why a QA Lead tracks it |
|--------|------------|----------------------------|
| **Suite execution time** | Wall-clock time for the full regression suite | Directly affects how often a team can afford to run it (every PR vs. nightly only) |
| **Flakiness rate** | % of test runs that fail intermittently with no real defect | Flaky tests erode trust in the suite faster than missing coverage does — worth tracking and fixing as its own backlog item |
| **Maintenance cost per test** | Time spent updating tests per release vs. time spent writing new ones | If maintenance dominates, it's a signal to invest in better abstractions (Page Object Model, object repositories) rather than more tests |

## Why this belongs in a Test Management portfolio, not just an engineer's

Any individual contributor can report "tests passed." What a test manager adds is the judgment to say *which* of these numbers matters this sprint, and to make a resourcing case (more automation here, more exploratory testing there, accept this risk for now) based on them — the exact skill ISTQB's CTAL-TM syllabus calls out (test progress monitoring and control, risk-based reporting to stakeholders), and what this folder is meant to demonstrate on top of the 10 hands-on projects.
