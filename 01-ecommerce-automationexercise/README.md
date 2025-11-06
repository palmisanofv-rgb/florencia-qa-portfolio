# Project 01 — E-commerce | [automationexercise.com](https://automationexercise.com)

**Domain:** E-commerce | **Primary tool:** Playwright (TypeScript) | **Legacy system?** No — modern server-rendered app

Full-lifecycle QA project against a live public e-commerce sandbox, following this portfolio's standard 7-folder shape (see [`00-qa-strategy-and-leadership/project-template.md`](../00-qa-strategy-and-leadership/project-template.md)).

## Contents

| Folder | What's in it |
|--------|--------------|
| [`01-planning-strategy`](01-planning-strategy) | Business value & risk analysis, direction/scope decisions, test plan |
| [`02-test-cases`](02-test-cases) | 12 test cases (CSV, Excel-readable) + full 26-scenario traceability matrix |
| [`03-automation`](03-automation) | 2 real Playwright E2E flows (purchase journey, login security boundary) |
| [`04-security-api`](04-security-api) | Postman collection (14/14 API scenarios) + basic security checks (3 findings) |
| [`05-performance`](05-performance) | k6 smoke test on the 2 highest-traffic API endpoints |
| [`06-evidence`](06-evidence) | Real screenshots, one per test case |
| [`07-reports`](07-reports) | Sprint report + final report |

## Evidence

![automationexercise.com home page](06-evidence/home-page.png)
*Home page, captured mid-CI-run.*

![Search results for "Dress"](06-evidence/tc07-search-results.png)
*Search results — confirms the search feature returns real, matching products.*

## Real CI findings

- **Real bug found & fixed:** product id 1's "Add to cart" link renders **twice** in the DOM (hover overlay + static link) — caused a Playwright strict-mode violation, fixed with `.first()`. See [`07-reports/sprint-01-report.md`](07-reports/sprint-01-report.md).
- **Known intermittent failure mode (infrastructure, not code):** automationexercise.com occasionally serves a bot-protection challenge to GitHub Actions' runner IPs. Confirmed via a saved screenshot, not assumed — see the CI badge on the [root README](../README.md) for the current run's actual outcome.
