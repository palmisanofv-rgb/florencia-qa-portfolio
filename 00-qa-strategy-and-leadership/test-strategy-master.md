# Master Test Strategy

**Author:** Florencia Palmisano
**Scope:** All 10 projects in this portfolio
**Aligned to:** ISTQB CTAL-TM syllabus (test strategy, risk-based test management, test progress monitoring, stakeholder communication)

## 1. Purpose

This document is the strategy I apply across every project in this portfolio, written the way I'd write it for a real team: one philosophy, adapted per domain, not ten disconnected test plans that happen to share a folder structure. If you're reviewing this portfolio as a hiring manager, this is the document that should tell you how I think about testing before you look at a single line of automation code.

Each of the 10 projects has its own `01-planning-strategy/test-strategy.md` that applies these principles to that specific product. This document is the layer above that: the reasoning a test manager owns across a whole program, not just one project.

## 2. Testing Mission

Across 10 very different domains — banking, healthcare, HR, travel, e-commerce, mobile — I hold every project to the same mission: **spend the team's limited testing time where a defect would actually cost the business something, and be honest about what wasn't covered and why.** That second half matters as much as the first. A test suite that only reports green is not the same thing as a product that's actually safe to ship, and I'd rather a report say "this is untested and here's why" than imply coverage that isn't there. Project 09 (Mobile/Appium) in this portfolio is a direct example of that principle in practice — see §8.

## 3. Risk-Based Strategy: How I Decide Where Effort Goes

Coverage follows risk, not the other way around. Before writing a single test case, I ask what actually breaks the business if it fails silently, and that shapes everything downstream — what gets automated first, what stays manual, what gets a P1 label.

### 3.1 Risk categories I assess for every project

| Category | Question I ask | Where it drove real decisions in this portfolio |
|---|---|---|
| **Data / business-logic integrity** | Does the system compute or persist the right value, not just render *a* value? | Banking balance arithmetic ([04](../04-banking-parabank)), cart totals ([01](../01-ecommerce-automationexercise)), active-item counts ([10](../10-productivity-todomvc)) |
| **Authentication / authorization** | Can the system be entered, or made to leak data, by someone who shouldn't have access? | Login validation across every project's `04-security-api`; found materially broken in [04](../04-banking-parabank) — see §6 |
| **Availability / performance under load** | Does the experience degrade or fail under realistic concurrent use? | [05](../05-travel-blazedemo)'s paired functional + JMeter load test |
| **Regulatory / compliance posture** | Would this fail an audit or a real compliance review, even informally? | Security-header and cookie-flag checks across every project's `04-security-api`; explicit OWASP framing on [04](../04-banking-parabank) and [08](../08-ecommerce-demoblaze) |
| **Usability / UI correctness on patterns automation tends to skip** | Does the "hard to automate" UI pattern actually work, or does it just look fine in a demo? | [06](../06-legacy-tools-theinternet)'s iframes, shadow DOM, native dialogs, drag-and-drop |
| **Legal / ethical scope of the test itself** | Am I authorized to test this, and am I testing something I can legally automate? | [09](../09-mobile-appium) deliberately targets Appium's own published sample app, not a branded commercial app |

### 3.2 Likelihood × impact, not gut feeling

Every project's `test-strategy.md` scores its top risks on likelihood and impact before anything gets prioritized. A few examples, pulled directly from this portfolio rather than invented for illustration:

- **CURA Healthcare** ([03](../03-healthcare-cura)): "Confirmation screen shows different data than submitted" — scored Medium likelihood / Critical impact, specifically because a healthcare booking confirmation showing the wrong facility or date is not a cosmetic bug, it's a patient-safety-adjacent one. This is the risk that made `getConfirmedFacility()` correctness a P1 assertion rather than an afterthought.
- **Parabank** ([04](../04-banking-parabank)): "Transfer debits one account without crediting the other" was scored Low likelihood / Critical impact — low likelihood because it's a well-trodden banking-demo code path, but the impact score is what justified automating balance reconciliation instead of just checking for a "Transfer Complete" banner.
- **BlazeDemo** ([05](../05-travel-blazedemo)): "Confirmation page shows the wrong route/city" was scored Medium/High — and this is a risk that *materialized*: the real purchase-confirmation heading turned out to be hardcoded to a fixed route regardless of what was actually searched. That's the direct payoff of scoring this risk high enough to write a real assertion for it instead of just checking that *a* confirmation page rendered.

The full cross-portfolio view of every scored risk, and which ones materialized into real findings, lives in [`risk-register.md`](risk-register.md) — I'd treat that as the companion document to this section.

## 4. Test Levels: Why This Portfolio Runs an Actual Pyramid

I deliberately weight this portfolio toward a pyramid shape, not a top-heavy "automate everything through the UI" approach, because that's the shape that keeps a suite fast and maintainable in a real CI budget:

- **API / security checks** (bottom, largest share) — fast, stable, cheap to maintain. Every project's `04-security-api` folder runs auth-boundary, injection, and header checks that don't need a browser at all.
- **E2E automation** (middle) — Playwright, Selenium, or Appium, reserved for user-journey-critical paths. I do not write a wall of granular single-assertion browser tests; each automated flow proves a real journey works end to end.
- **Manual / exploratory** (top, smallest but deliberate) — reserved for what automation structurally can't do well: visual judgment calls, one-off investigation, and cases where the cost of maintaining an automated check exceeds the risk it covers.

Automation ratio is a *deliberate* number in this portfolio, not "everything I got around to." Project 01 automated 6 of 8 P1 scenarios end-to-end and kept checkout manual on purpose — the sandbox's payment form isn't idempotent across runs, and in a real project with a live payment gateway, that decision would need to be revisited before a production release rather than left manual indefinitely. That reasoning, written down, is the difference between an automation ratio that reflects judgment and one that just reflects effort.

## 5. Test Design Techniques Applied

These aren't abstract ISTQB vocabulary here — each technique below is tied to a real case in this portfolio:

- **Equivalence partitioning** — CURA's date-of-appointment field: valid future dates vs. past dates are two classes, and testing revealed the app doesn't actually enforce the past-date partition at all (documented as an exploratory finding requiring a product decision, not silently automated around).
- **Boundary value analysis** — Parabank's transfer amount: the interesting boundary isn't "a large transfer," it's **$0** — and the real system accepted a $0 transfer without rejection, exactly the kind of edge case boundary analysis is meant to surface.
- **Decision tables** — Login test matrices across every project (valid/invalid username × valid/invalid password × account state) are structured as decision tables before being reduced to the automated subset that's actually worth running on every CI build.
- **Exploratory testing** — Used deliberately, not as a fallback, in cases like CURA's past-date gap and Parabank's $0-transfer finding: both surfaced from asking "what happens if I do the thing the happy-path spec doesn't mention," not from a pre-written script.
- **State-based / negative testing** — Parabank's invalid-password case is the sharpest example in this portfolio: what looked like a flaky test turned out to be a real defect once I stopped assuming the test was wrong and checked the server response directly (see §9).

## 6. Entry & Exit Criteria

At the program level, I hold every project to the same gate before I call it "done enough to report on":

**Entry criteria:** environment reachable and stable enough to run a baseline smoke pass; test data (synthetic or the sandbox's own seeded accounts) identified; risk-scored strategy document written before test case authoring begins.

**Exit criteria:** 100% of documented P1 scenarios executed (manually or automated); every finding triaged with a severity and a disposition (fix now / accept / needs product decision — never left as a bare "found a bug"); CI green on the current default branch, or a documented, investigated reason for anything red (see §7 on distinguishing real defects from environment noise).

Each project's own `01-planning-strategy/test-plan.md` operationalizes this with IEEE 829-style scope, schedule, and specific entry/exit conditions for that product.

## 7. Environment & Test Data Strategy

Every target in this portfolio is a public sandbox built for testing practice, or an official demo instance of real open-source/vendor software — deliberately chosen so every project is runnable and legally unambiguous without needing access to a real employer's production systems. In a real organization, the same strategy applies to a dedicated QA/staging environment with synthetic data, for the identical reason: tests need a stable, disposable environment that won't be disrupted by, or disrupt, production traffic.

Running against *shared public* infrastructure instead of a private staging environment adds one real test-management skill this portfolio deliberately exercises: **telling apart a real defect from environment noise.**

- Parabank ([04](../04-banking-parabank)) intermittently serves an automated-traffic bot-check (a Cloudflare interstitial) because it's a single public instance used by QA learners worldwide — not a defect, and documented as such rather than silently retried into invisibility.
- BlazeDemo's ([05](../05-travel-blazedemo)) load test hit its own rate limiting after repeated same-day CI runs — real `429` responses, correctly *not* filed as a regression, and instead written up as a reminder to space performance runs out against shared infrastructure.
- automationexercise.com ([01](../01-ecommerce-automationexercise)) occasionally serves the same kind of bot-check to CI runner IPs specifically, confirmed by re-running the identical request moments later and getting a clean response.

I treat this distinction as a first-class test management judgment call, not noise to explain away after the fact — a report that mislabels environment flakiness as a product regression (or vice versa) damages stakeholder trust in the suite either way.

## 8. Honesty About Coverage Gaps

Project 09 (Mobile/Appium) is the clearest example of a principle I hold across this whole portfolio: **an untested or unverified path gets flagged as exactly that, not quietly presented as covered.** That project's automation was written against Appium's own published `ApiDemos-debug.apk` structure, but could not be executed or independently re-verified in this environment — no emulator, no device, no running Appium server. Every other (web-based) project in this portfolio had its selectors checked against the live site with a raw HTTP request; this one couldn't be, and the final report says so directly, along with the specific next step (run it once against a real emulator before relying on it). A test manager's job includes saying "I don't know yet" precisely, not padding a coverage number.

## 9. Defect Management

Every project that models a defect follows the same triage format: severity, reproduction steps, expected vs. actual, and a disposition — never just "found a bug" with no next step. See [Project 01's bug report template](../01-ecommerce-automationexercise/02-test-cases/bug-report-sample.md) for the format every other project reuses, and [`risk-register.md`](risk-register.md) for the full list of real findings mapped back to the risks that predicted them.

The most instructive defect-management lesson in this portfolio isn't a defect at all — it's how long it took to correctly diagnose one. Parabank's invalid-password test kept failing in a way that looked like test flakiness across several debugging rounds, until a raw `curl POST` to the live login endpoint with a valid username and a deliberately wrong password came back `302 Found` — proof that **the login endpoint doesn't validate the password at all, only that the username exists** (a broken-authentication defect, OWASP A07:2021). The test was renamed to `test_login_with_invalid_password_is_currently_accepted` rather than deleted or silently loosened, so the finding stays visible in the suite itself, not just in a report that ages out of anyone's attention. I apply the same discipline to OrangeHRM's employee-list 404, below.

## 10. Automation Strategy & Maintenance Economics

Tool choice in this portfolio is never "what I already knew" — see [`tool-tech-matrix.md`](tool-tech-matrix.md) for the full decision framework, including two real migrations (Selenium/Java → Playwright on saucedemo, WebdriverIO → Selenium/Python on the-internet) driven by actual timing bugs, not preference. The underlying economics I apply to every automation decision: a test is worth automating when the cost of maintaining it is lower than the cost of the risk it continuously covers. Checkout in Project 01 fails that test today (non-idempotent sandbox payment form) and stays manual; login-security checks pass it easily (cheap, stable, high-value) and are automated everywhere.

## 11. Test Progress Monitoring & Reporting

Each project's `07-reports/` folder contains per-sprint reports (planned / executed / found) plus a final summary, so progress is reported on a cadence, not just at the end. The KPIs I track and how I'd present them to different audiences are in [`metrics-and-reporting-framework.md`](metrics-and-reporting-framework.md); who gets told what, and when something is urgent enough to escalate outside the normal cadence, is in [`stakeholder-communication.md`](stakeholder-communication.md).

## 12. Continuous Improvement

Three separate debugging sagas in this portfolio taught me the same lesson from different angles, and I've deliberately kept the record of the *wrong* turns each one took rather than editing the story down to just the final fix:

- **OrangeHRM's employee-list 404** ([07](../07-hr-orangehrm)): a blank page after search was blamed on a session race, then a parallel-session conflict, then a `networkidle` wait that never resolved — three timing-shaped theories in a row, before checking the URL itself and finding `/pim/employeeList` was simply a 404 on this server. The real fix was a one-line route correction.
- **CURA's calendar widget** ([03](../03-healthcare-cura)): ten rounds across `ng-model` binding, a `readonly` attribute, the wrong DOM target, and full-form resets on validation failure, before landing on a patient retry of the real calendar icon — this one turned out to be a genuine CI-load-dependent race in the widget itself, not a misdiagnosis, which is its own useful data point: not every stubborn bug is a wrong assumption, sometimes it really is just a fragile widget.
- **Parabank's invalid-password test** (§9): the same "assume it's a timing/test problem before checking the system's actual response" trap, this time revealing a real security defect once it was checked.

The retrospective takeaway I carry forward: **when a test fails in a way that looks like flakiness, check the simplest, least interesting explanation (wrong URL, wrong assumption about the app) before reaching for a race-condition theory** — it was right two out of three times in this portfolio, and free to check first.

## 13. Standards Alignment

This strategy is written against, and maps directly to:

- **ISTQB CTAL-TM** — risk-based test management (§3), test progress monitoring and control (§11, `metrics-and-reporting-framework.md`), stakeholder communication (`stakeholder-communication.md`), defect management (§9).
- **ISO/IEC 25010** quality characteristics — functional correctness and security are the two characteristics this portfolio weights most heavily, reflecting where the scored risks in §3 actually landed across 10 projects; performance efficiency is exercised directly in [05](../05-travel-blazedemo).
- **IEEE 829** test documentation structure — each project's `01-planning-strategy/test-plan.md` follows this shape (scope, entry/exit criteria, schedule) at the individual-project level.

## 14. How This Folder Is Organized

- [`risk-register.md`](risk-register.md) — every scored risk across all 10 projects, and which ones turned out to be real
- [`tool-tech-matrix.md`](tool-tech-matrix.md) — why each tool was chosen, including two real tool migrations
- [`metrics-and-reporting-framework.md`](metrics-and-reporting-framework.md) — the KPIs I track and report upward
- [`stakeholder-communication.md`](stakeholder-communication.md) — who gets told what, how often, and what triggers an out-of-cycle escalation
- [`project-template.md`](project-template.md) — the 7-folder shape every project follows, and why
