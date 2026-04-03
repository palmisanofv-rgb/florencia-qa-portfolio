# Project 04 — Fintech/Banking (legacy system) | [Parabank](https://parabank.parasoft.com/parabank/index.htm)

**Domain:** Banking | **Primary tool:** Selenium WebDriver + Python | **Legacy system?** Yes (framed deliberately)

Parasoft's own demo banking app, framed as a legacy core-banking system. This project leans hardest into data-integrity checks of any project in this portfolio — balances are independently recomputed, never just read off a success banner.

## Contents

| Folder | What's in it |
|--------|--------------|
| [`01-planning-strategy`](01-planning-strategy) | Business value & risk analysis, test plan |
| [`02-test-cases`](02-test-cases) | 7 test cases (CSV) |
| [`03-automation`](03-automation) | Selenium + Python: registration, login, transfer with real balance reconciliation |
| [`04-security-api`](04-security-api) | Real Parabank REST API + security findings + SQL data-validation technique |
| [`05-performance`](05-performance) | k6 smoke test |
| [`06-evidence`](06-evidence) | Real screenshots, one per test case |
| [`07-reports`](07-reports) | Sprint report (includes a real 7-round debugging log) + final report |

See [`07-reports/sprint-01-report.md`](07-reports/sprint-01-report.md) for the real bugs found and fixed against this live site.
