# Metrics & Reporting Framework

**Author:** Florencia Palmisano

What I report upward isn't "tests passed" — it's whether quality risk is trending in the right direction, and where the team's time is best spent next. Every number below is pulled from the real 10 projects in this portfolio, not a generic KPI list applied retroactively.

## 1. Coverage & automation

| Metric | Definition | Applied to this portfolio |
|--------|------------|----------------------------|
| **Scenario coverage** | % of documented user scenarios mapped to a test (manual or automated) | 26/26 (100%) on Project 01 — see its [traceability matrix](../01-ecommerce-automationexercise/02-test-cases/traceability-matrix.md); every other project in the portfolio also reports 100% scenario-to-test mapping in its final report |
| **Automation ratio** | % of P1/P2 scenarios automated end-to-end | 6/8 on Project 01 (checkout intentionally kept manual — non-idempotent payment form); 8/10 on Project 02; 4/5 on Project 03 and Project 05; 7/7 on Project 04; full P1 automation (4/4, 5/5, or 6/6) on Projects 06–08 and 10. Automation ratio should reflect a deliberate choice, not just "everything we got to" — see [`test-strategy-master.md` §4](test-strategy-master.md) |
| **Tool diversity / bus factor** | How many people (and which skillsets) could maintain the suite if one person left | 7 tools across 10 projects, chosen to match different team skillsets and app architectures — see [`tool-tech-matrix.md`](tool-tech-matrix.md) |

## 2. Defect metrics

| Metric | Definition | Applied to this portfolio |
|--------|------------|----------------------------|
| **Defect detection rate** | Real findings surfaced by the suite vs. by manual review alone | 5 real findings across this portfolio, all found by writing a test that checked actual resulting state rather than a success banner: login accepting any password for a valid username ([04](../04-banking-parabank), OWASP A07:2021 broken authentication), a reflected-origin CORS misconfiguration with credentials allowed ([08](../08-ecommerce-demoblaze) — the most severe finding in the portfolio), a $0 transfer accepted without rejection ([04](../04-banking-parabank)), a hardcoded confirmation-page route regardless of the actual search ([05](../05-travel-blazedemo)), and a session cookie missing `SameSite`/`Secure` ([04](../04-banking-parabank)). Full list with likelihood/impact scoring in [`risk-register.md`](risk-register.md) |
| **Escape rate** | Defects that reach later stages (or a later stage of testing) that an earlier stage should have caught | Parabank's broken-authentication finding is the sharpest illustration: it initially presented as a *flaky test*, and would have escaped detection entirely if the failure had been re-run and accepted rather than root-caused with a raw `curl` request against the live endpoint |
| **Severity distribution** | Are defects skewing toward cosmetic or toward data/security-integrity? | This portfolio's real findings skew toward authentication and data-integrity (broken auth, CORS, $0 transfer) over cosmetic issues — a signal that automation effort went where risk scoring in [`risk-register.md`](risk-register.md) said it should |
| **False-negative catches** | Cases where a test would have silently passed on a real defect if not caught during development | CURA's original `getConfirmedFacility()` selector assumed a table layout that never existed; an earlier CURA login test was passing on a failed login because its assertion matched CURA's own page copy regardless of login outcome. Both were caught and fixed before they could mask a real regression — a category of risk worth tracking on its own, since a false-negative is worse than an untested gap (it actively signals "safe" when it isn't) |

## 3. Delivery / process metrics

| Metric | Definition | Why I track it |
|--------|------------|----------------------------|
| **Suite execution time** | Wall-clock time for the full regression suite | Directly affects how often a team can afford to run it (every PR vs. nightly only) |
| **Flakiness rate & root-cause classification** | % of test runs that fail intermittently, split into *real environment noise* vs. *a real defect misclassified as flaky* | This portfolio tracks both sides deliberately: BlazeDemo's rate-limit 429s and Parabank's Cloudflare interstitials are real flakiness, correctly classified as environment noise (see [`test-strategy-master.md` §7](test-strategy-master.md)); Parabank's invalid-password failure looked identical to flakiness at first glance and was actually a real security defect (see [`risk-register.md`](risk-register.md) R-11). Treating every red run the same way is how the second category goes unnoticed |
| **Misdiagnosis rounds before root cause** | How many wrong theories got tried before the real cause was found | OrangeHRM's employee-list blank page took three timing-shaped theories (session race, parallel-session conflict, `networkidle` wait) before the actual cause — a 404 on the wrong route — was checked; CURA's calendar widget took ten. Tracked not to assign blame but because it's a direct, cheap lever: checking the simplest explanation first would have saved real time in both cases |
| **Maintenance cost per test** | Time spent updating tests per release vs. time spent writing new ones | If maintenance dominates, it's a signal to invest in better abstractions (Page Object Model, object repositories) rather than more tests — the driver behind the saucedemo Selenium→Playwright migration in [`tool-tech-matrix.md`](tool-tech-matrix.md) |

## 4. A sample sprint snapshot

To show what this looks like assembled into an actual report rather than a metrics glossary, here's the shape of a real per-sprint update I'd send (using Project 04's numbers as the example):

> **Parabank — Sprint 2 summary**
> Scenario coverage: 7/7 (100%). Automation ratio: 7/7 P1 scenarios, plus 3 API scenarios against the live REST service.
> Findings this sprint: 1 High (broken authentication — any password accepted for a valid username, OWASP A07:2021, escalated same-day per [`stakeholder-communication.md`](stakeholder-communication.md)), 1 Low (accepted $0 transfer, pending product decision), 1 Medium (session cookie missing `SameSite`/`Secure`).
> Environment notes: one CI run flagged by the shared instance's bot-check — confirmed as environment noise, not a regression, no action needed.
> Residual risk carried forward: none blocking; the $0-transfer disposition needs a product owner decision before close-out.

That's the level of specificity I aim for in every real report: a stakeholder reading this knows exactly what changed, what's urgent, and what's still open — not just a coverage percentage.

## 5. Why this belongs in a test management portfolio, not just an engineer's

Any individual contributor can report "tests passed." What I add on top of that is the judgment to say *which* of these numbers matters this sprint, when a finding is urgent enough to break the normal reporting cadence (see [`stakeholder-communication.md`](stakeholder-communication.md)), and how to make a resourcing case — more automation here, more exploratory testing there, accept this risk for now — based on the data rather than a hunch. That's the exact skill ISTQB's CTAL-TM syllabus calls test progress monitoring and control and risk-based reporting to stakeholders, and it's what this folder is built to demonstrate on top of the 10 hands-on projects.
