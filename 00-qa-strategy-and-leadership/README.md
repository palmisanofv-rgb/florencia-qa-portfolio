# 00 — QA Strategy & Leadership

This is the test-management layer of the portfolio: the reasoning that sits above the 10 hands-on projects and turns them into one coherent quality program instead of 10 unrelated exercises.

The other 10 projects are execution: hands-on testing across 10 domains, each with its own strategy, test cases, automation, security/API checks, performance testing, evidence, and reports. Here, I cover how I assess value and risk per product, why I chose a given tool over another, what actually broke and how I found it, and what I'd report upward and to whom.

It's built around the ISTQB **CTAL-TM (Certified Tester Advanced Level Test Management)** syllabus. Every claim below traces back to a specific decision or finding in one of the 10 projects — if a sentence doesn't point to a project number, I've tried to cut it.

If you're new to this repo, [`test-strategy-master.md`](test-strategy-master.md) is the one to read first — everything else in this folder supports a claim made there.

## How to read this folder

| Document | What it answers |
|---|---|
| [`test-strategy-master.md`](test-strategy-master.md) | How do I decide where testing effort goes, across 10 very different domains? Start here — everything else in this folder supports a claim made in this document. |
| [`risk-register.md`](risk-register.md) | Every risk I scored before testing began, and which ones turned out to be real. The direct evidence that the strategy above isn't theoretical. |
| [`tool-tech-matrix.md`](tool-tech-matrix.md) | Why Playwright, Selenium, and Appium all exist side by side in this portfolio — including two real migrations away from a tool that turned out to be the wrong fit. |
| [`metrics-and-reporting-framework.md`](metrics-and-reporting-framework.md) | The KPIs I track, with real numbers from this portfolio, plus what a real sprint report looks like assembled end to end. |
| [`stakeholder-communication.md`](stakeholder-communication.md) | Who gets told what, how often, and what's urgent enough to escalate outside the normal cadence — with a worked example. |
| [`project-template.md`](project-template.md) | The 7-folder shape every project follows, and why I organize by project rather than by testing discipline. |
| [`roadmap.md`](roadmap.md) | What's left, grouped by whether it's a coverage gap, a pending product decision, or automation debt that needs revisiting. |

## The 10 projects at a glance

Every project shares the same 7-folder shape (`01-planning-strategy`, `02-test-cases`, `03-automation`, `04-security-api`, `05-performance`, `06-evidence`, `07-reports`) — see [`project-template.md`](project-template.md) for what each folder holds and why.

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

## What this folder is really about

Ten green checkmarks don't say much about how someone thinks. What matters more to me: I score risk before writing a test case, and this folder can point to three findings that came directly from that scoring, not from luck ([`risk-register.md`](risk-register.md)). I've changed tools mid-project when the evidence said the first choice was wrong, and kept the record of *why* instead of quietly rewriting history ([`tool-tech-matrix.md`](tool-tech-matrix.md)). And when something couldn't be verified — Project 09's mobile suite, written without a real device available to run it against — that gets said directly instead of letting a green folder imply otherwise. That habit, more than any of the tools, is the one I care most about keeping.
