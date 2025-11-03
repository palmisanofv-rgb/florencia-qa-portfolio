# 00 — QA Strategy & Leadership

The other 10 projects in this portfolio are execution: hands-on testing across 10 domains. This folder is the layer above that — the thinking a **test manager** applies to turn 10 individual projects into one coherent quality program: how value and risk get assessed per product, why a given tool was chosen, and what gets reported upward. It maps directly to the ISTQB **CTAL-TM (Certified Tester Advanced Level Test Management)** syllabus areas: test strategy, risk-based test management, test progress monitoring, and stakeholder communication.

## Contents

- [`test-strategy-master.md`](test-strategy-master.md) — the organizing philosophy behind every project in this portfolio (test pyramid, risk-based prioritization, environment strategy)
- [`tool-tech-matrix.md`](tool-tech-matrix.md) — decision framework for tool selection (why Playwright *and* Selenium *and* Appium exist side by side, rather than picking just one)
- [`metrics-and-reporting-framework.md`](metrics-and-reporting-framework.md) — the KPIs a test manager would track and report to stakeholders, applied retrospectively to this portfolio's 10 projects
- [`project-template.md`](project-template.md) — the 7-folder structure every project follows, and why

## The 10 projects at a glance

Every project shares the same 7-folder shape (`01-planning-strategy`, `02-test-cases`, `03-automation`, `04-security-api`, `05-performance`, `06-evidence`, `07-reports`) — see the root [README](../README.md) for what each folder holds.

| # | Project | Domain | Primary tool |
|---|---------|--------|---------------|
| 01 | [automationexercise.com](../01-ecommerce-automationexercise) | E-commerce | Playwright |
| 02 | [saucedemo.com](../02-ecommerce-saucedemo) | Retail | Playwright |
| 03 | [CURA Healthcare](../03-healthcare-cura) | Healthcare (legacy system) | Selenium + Java |
| 04 | [Parabank](../04-banking-parabank) | Fintech (legacy system) | Selenium + Python |
| 05 | [BlazeDemo](../05-travel-blazedemo) | Travel/Airline | Playwright + performance |
| 06 | [the-internet.herokuapp.com](../06-legacy-tools-theinternet) | Legacy internal tools | Selenium |
| 07 | [OrangeHRM](../07-hr-orangehrm) | HR/Enterprise SaaS | Playwright |
| 08 | [DemoBlaze](../08-ecommerce-demoblaze) | E-commerce + public API | Playwright |
| 09 | [Mobile (Appium sample app)](../09-mobile-appium) | Mobile | Appium |
| 10 | [TodoMVC](../10-productivity-todomvc) | Productivity/SaaS | Playwright |
