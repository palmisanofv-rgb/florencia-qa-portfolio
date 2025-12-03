# Project 02 — Retail | [saucedemo.com](https://www.saucedemo.com) (Swag Labs)

**Domain:** Retail | **Primary tool:** Playwright | **Legacy system?** No

Sauce Labs' own demo storefront, seeded with 6 accounts (several deliberately broken) — used here to demonstrate regression testing against known-bad builds, not just a clean happy path.

## Contents

| Folder | What's in it |
|--------|--------------|
| [`01-planning-strategy`](01-planning-strategy) | Business value & risk analysis, test plan |
| [`02-test-cases`](02-test-cases) | 10 test cases (CSV) |
| [`03-automation`](03-automation) | Playwright: 6-account login regression + full checkout journey |
| [`04-security-api`](04-security-api) | Basic security checks (no public backend API on this app) |
| [`05-performance`](05-performance) | k6 smoke test |
| [`06-evidence`](06-evidence) | Real screenshots, one per test case |
| [`07-reports`](07-reports) | Sprint report + final report |

See [`07-reports/sprint-01-report.md`](07-reports/sprint-01-report.md) for why this project moved from Selenium/Java to Playwright.
