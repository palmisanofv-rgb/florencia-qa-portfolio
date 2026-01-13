# Project 02 — Retail | [saucedemo.com](https://www.saucedemo.com) (Swag Labs)

**Domain:** Retail | **Primary tool:** Playwright | **Legacy system?** No

Sauce Labs' own demo storefront, seeded with 6 accounts (several deliberately broken) — used here to demonstrate regression testing against known-bad builds, not just a clean happy path. Two of those seeded accounts (`problem_user`, `performance_glitch_user`) now have real, verified assertions tied to their actual documented defects, not just a shared login-success check.

## Contents

| Folder | What's in it |
|--------|--------------|
| [`01-planning-strategy`](01-planning-strategy) | Business value & risk analysis, test plan |
| [`02-test-cases`](02-test-cases) | 10/10 test cases (CSV), all automated |
| [`03-automation`](03-automation) | Playwright: 6-account login regression (2 with defect-specific assertions), checkout journey, inventory sort |
| [`04-security-api`](04-security-api) | Basic security checks (no public backend API on this app) + accessibility findings |
| [`05-performance`](05-performance) | k6 staged-load smoke test — real run in [`last-run-results.md`](05-performance/last-run-results.md) |
| [`06-evidence`](06-evidence) | 11 real screenshots |
| [`07-reports`](07-reports) | Sprint 01 + sprint 02 reports, final report |

See [`07-reports/sprint-01-report.md`](07-reports/sprint-01-report.md) for why this project moved from Selenium/Java to Playwright, and [`07-reports/sprint-02-report.md`](07-reports/sprint-02-report.md) for the seeded-account defect assertions and real evidence added this sprint.

## Real findings

- **`problem_user`'s inventory page shows 1 repeated broken image across all 6 products** (`standard_user`'s shows 6 distinct ones) — confirmed live, now asserted directly.
- **`performance_glitch_user` logs in ~11x slower than `standard_user`** in a real captured run (5.1s vs. 0.5s).
- **A plain HTTP client gets a different, simplified response from the site than a real browser does** — the same bot-aware serving pattern documented on Project 01 and Project 04, found while deepening the k6 script.
