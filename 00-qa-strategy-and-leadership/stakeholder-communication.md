# Stakeholder Communication Plan

**Author:** Florencia Palmisano

A metrics framework is only useful if the right person gets the right version of it at the right time. This document is the other half of [`metrics-and-reporting-framework.md`](metrics-and-reporting-framework.md): not *what* I measure, but *who* I tell, *how often*, and *what's urgent enough to break the normal cadence.*

## 1. Audiences and what each one actually needs

I don't send the same report to everyone — a business stakeholder and an engineer are asking different questions, and burying either one's answer in the wrong level of detail wastes their time and erodes trust in the report itself.

| Audience | What they need to know | Format | Cadence |
|---|---|---|---|
| **Product / business stakeholders** | Is quality risk trending the right direction? Is there anything that should delay a release? | 3-5 line summary: coverage %, open risk count by severity, one plain-language line per Critical/High item | End of sprint + immediately for anything Critical |
| **Engineering leads / developers** | Exactly what broke, how to reproduce it, and whether it's their code or the test | Full bug report format (severity, repro steps, expected vs. actual, suggested fix) — see [Project 01's template](../01-ecommerce-automationexercise/02-test-cases/bug-report-sample.md) | As found, plus rolled up in the sprint report |
| **Other testers / future team members** | How the suite is organized, what's already covered, what's deliberately not covered and why | This 00 folder + each project's `test-strategy.md` and `07-reports/` | Living documentation, not a point-in-time report |

## 2. Reporting cadence

- **Per-sprint report** (`07-reports/sprint-0X-report.md` in each project) — what was planned, what was executed, what was found. This is the CTAL-TM "test progress monitoring and control" skill applied literally: progress gets reported as it happens, not reconstructed at the end from memory.
- **Final report** (`07-reports/final-report.md` in each project) — coverage achieved, defects found with disposition, residual risk carried forward. This is the document I'd hand to a product owner asking "are we done."
- **Portfolio-level view** — this folder, updated as projects mature, not written once and left static.

## 3. What triggers an out-of-cycle escalation

Most findings wait for the next scheduled report. Three things in this portfolio didn't, and I'd apply the same bar on a real team:

- **A Critical or High severity security/data-integrity finding** — DemoBlaze's CORS misconfiguration ([R-14](risk-register.md)) and Parabank's broken-authentication finding ([R-11](risk-register.md)) are exactly this class. On a real team, either one gets a message to the engineering lead and product owner the same day it's confirmed, not folded quietly into the next sprint report — a live authentication bypass or a credentialed cross-origin read isn't a "by the way" item.
- **A finding that changes the release decision** — BlazeDemo's hardcoded confirmation route ([R-06](risk-register.md)) is user-facing and trust-damaging enough that I'd flag it before a release ships, even though its severity is lower than the two above.
- **An honest coverage gap that could be mistaken for tested-and-passing** — Project 09's unexecuted Appium suite is the clearest example: if a stakeholder assumed "there's a test folder for mobile" meant "mobile is covered," that's a worse outcome than the gap itself. I flag these proactively rather than waiting for someone to ask.

Everything else — informational security headers, environment noise like a shared-instance rate limit, an accepted known-gap like CURA's past-date validation — goes in the normal cadence. Escalating those too would train stakeholders to tune out real escalations.

## 4. A worked example

To make this concrete rather than abstract, here's roughly how I'd phrase the DemoBlaze CORS finding for each audience, using the real finding from [R-14](risk-register.md):

> **To product/business stakeholders:** "Found a medium-high severity security gap in the checkout API this sprint — it would let another website make authenticated requests on behalf of a logged-in user. Recommend holding this from any wider rollout until it's patched. Full detail with engineering."

> **To engineering:** "`api.demoblaze.com` reflects any `Origin` header back in `Access-Control-Allow-Origin` and also sends `Access-Control-Allow-Credentials: true` — confirmed by sending `Origin: https://evil.example.com` and getting it echoed back. That combination lets a malicious site issue credentialed requests against this API from a logged-in user's browser. Fix is to allowlist known origins server-side rather than reflecting the request's Origin header. See `08-ecommerce-demoblaze/04-security-api/security-checks.md` for the full request/response."

Same fact, two different jobs: one earns a release-decision input in one sentence, the other gives an engineer everything needed to start a fix without a follow-up meeting.
