# Project 03 — Healthcare (legacy system) | [CURA Healthcare Service](https://katalon-demo-cura.herokuapp.com/)

**Domain:** Healthcare | **Primary tool:** Selenium WebDriver + Java | **Legacy system?** Yes (framed deliberately — see strategy)

Katalon's own official demo app, framed here as a legacy hospital appointment-booking system a QA team inherited rather than built.

## Contents

| Folder | What's in it |
|--------|--------------|
| [`01-planning-strategy`](01-planning-strategy) | Business value & risk analysis, test plan |
| [`02-test-cases`](02-test-cases) | 5 test cases (CSV) |
| [`03-automation`](03-automation) | Selenium + Java: login + confirmation data-integrity check |
| [`04-security-api`](04-security-api) | Session/access-control checks (real 302 redirect confirmed) + accessibility findings (clean pass) |
| [`05-performance`](05-performance) | k6 staged-load smoke test — real run in [`last-run-results.md`](05-performance/last-run-results.md) |
| [`06-evidence`](06-evidence) | 5 real screenshots |
| [`07-reports`](07-reports) | Sprint 01 + sprint 02 reports, final report |
