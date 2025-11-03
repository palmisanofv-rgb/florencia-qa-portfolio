# 👋 Hi, I'm Florencia

**QA Engineer | ISTQB Certified (Foundation + AI + GenAI) | Manual, Automation & Test Strategy**

[![QA Portfolio CI](https://github.com/palmisanofv-rgb/florencia-qa-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/palmisanofv-rgb/florencia-qa-portfolio/actions/workflows/ci.yml)

This is my personal QA engineering lab — a place to practice and document full-lifecycle testing (planning, manual cases, automation, API/security, performance, reporting) across different tools and domains, and to build toward test **management** skills, not just execution. Every suite that can run unattended runs for real on every push via GitHub Actions — click the badge above for live results, not just static code.

---

## 🎓 Certifications & Study

![ISTQB](https://img.shields.io/badge/ISTQB-Foundation-0052CC?style=for-the-badge)
![ISTQB](https://img.shields.io/badge/ISTQB-AI_Testing-2EAD33?style=for-the-badge)
![ISTQB](https://img.shields.io/badge/ISTQB-GenAI_Testing-FF6C37?style=for-the-badge)
![ISTQB](https://img.shields.io/badge/ISTQB-CTAL--TM_(study)-6c757d?style=for-the-badge)

- **ISTQB Certified Tester – Foundation Level (CTFL)**
- **ISTQB AI Testing (CT-AI)** — testing AI-based systems
- **ISTQB Testing with Generative AI (CT-GenAI)** — testing LLMs & GenAI applications
- Studying for **ISTQB Certified Tester Advanced Level Test Management (CTAL-TM)** — this portfolio's [`00-qa-strategy-and-leadership`](00-qa-strategy-and-leadership) folder, and the `01-planning-strategy` folder inside every project, are built around exactly that syllabus: test strategy, risk-based management, stakeholder communication, and metrics — not just test execution.

---

## 🛠 Tech Stack

### 🤖 Automation
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white)
![Appium](https://img.shields.io/badge/Appium-662D91?style=for-the-badge&logo=appium&logoColor=white)

### 🔧 API, Security & Performance
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![JMeter](https://img.shields.io/badge/JMeter-D22128?style=for-the-badge&logo=apachejmeter&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

### 📋 Management & Methodologies
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![TestRail](https://img.shields.io/badge/TestRail-65C179?style=for-the-badge)
![Agile](https://img.shields.io/badge/Agile/Scrum-0096D6?style=for-the-badge)

---

## 📁 Portfolio Structure

Every project runs against a real, public, legally-testable sandbox (official vendor demo apps, or free developer APIs) — nothing here targets a real company's production system without authorization. Every project follows the **same 7-folder shape**, so the *process* stays consistent even as the *domain* changes:

| Folder | Contents |
|--------|----------|
| `01-planning-strategy` | Test strategy (product/business value, business risk, stakeholder view) + test plan (scope, entry/exit criteria) |
| `02-test-cases` | Manual test cases in spreadsheet format (CSV, Excel-readable) |
| `03-automation` | E2E automation scripts (Playwright or Selenium WebDriver) |
| `04-security-api` | API contract tests + basic security checks (auth, injection, headers) |
| `05-performance` | Load/performance testing (k6 or JMeter) |
| `06-evidence` | Screenshots — one per test case, not a curated sample |
| `07-reports` | Per-sprint reports + a final summary report |

| # | Project | Domain | Primary tool |
|---|---------|--------|---------------|
| 00 | [QA Strategy & Leadership](00-qa-strategy-and-leadership) | — | Strategy, tool matrix, metrics/reporting framework |
| 01 | [automationexercise.com](01-ecommerce-automationexercise) | E-commerce | Playwright |
| 02 | [saucedemo.com](02-ecommerce-saucedemo) | Retail | Playwright |
| 03 | [CURA Healthcare](03-healthcare-cura) | Healthcare (legacy system) | Selenium + Java |
| 04 | [Parabank](04-banking-parabank) | Fintech (legacy system) | Selenium + Python |
| 05 | [BlazeDemo](05-travel-blazedemo) | Travel/Airline | Playwright + performance |
| 06 | [the-internet.herokuapp.com](06-legacy-tools-theinternet) | Legacy internal tools | Selenium |
| 07 | [OrangeHRM](07-hr-orangehrm) | HR/Enterprise SaaS | Playwright |
| 08 | [DemoBlaze](08-ecommerce-demoblaze) | E-commerce + public API | Playwright |
| 09 | [Mobile (Appium sample app)](09-mobile-appium) | Mobile | Appium |
| 10 | [TodoMVC](10-productivity-todomvc) | Productivity/SaaS | Playwright |

---

## 🎯 My Quality Approach

- **Risk-based testing** — every project's strategy starts with business value and risk, not a feature checklist
- **Tool fit over tool preference** — Playwright day-to-day, Selenium WebDriver on legacy-style stacks, Appium for mobile (see [tool selection matrix](00-qa-strategy-and-leadership/tool-tech-matrix.md))
- **Assert the real state, not the happy banner** — cart totals, account balances, real data reconciliation, not just "no error was thrown"
- **Report in numbers a stakeholder can act on** — see [metrics & reporting framework](00-qa-strategy-and-leadership/metrics-and-reporting-framework.md)

---

*"I don't just find bugs. I build quality that scales."*
