# Per-Project Folder Template

**Author:** Florencia Palmisano

Every numbered project (01–10) follows this exact shape, so the *process* is identical even as the *product under test* changes — the same discipline I'd enforce across a real team's projects, so that a new hire dropped into project 07 already knows where to look because they've seen project 02.

```
0X-domain-sitename/
├── README.md                    — 1-paragraph overview + links to every folder below
├── 01-planning-strategy/
│   ├── test-strategy.md         — product/business value, business risk, stakeholder & management view
│   └── test-plan.md             — scope, entry/exit criteria, schedule (IEEE 829-style)
├── 02-test-cases/
│   └── test-cases.csv           — manual test cases, Excel-readable (ID, title, preconditions, steps, expected, priority)
├── 03-automation/
│   └── (Playwright or Selenium) — a handful of real E2E flows, not a wall of granular single-assertion tests
├── 04-security-api/
│   ├── postman/                 — API contract collection
│   └── security-checks.md       — basic security testing: auth boundaries, injection attempts, security headers
├── 05-performance/
│   └── (k6 or JMeter)           — a light load/performance smoke test
├── 06-evidence/
│   └── *.png                    — one real screenshot per test case in 02-test-cases (not a curated sample of 2)
└── 07-reports/
    ├── sprint-01-report.md      — (repeat per sprint as the project evolved)
    └── final-report.md          — end-of-project summary: coverage achieved, defects found, residual risk
```

## Why this shape, not "one folder per discipline" (the old structure)

An earlier version of this portfolio organized by *discipline* — all manual testing across every site in one folder, all API testing in another. That's a reasonable way to show tool breadth on its own, but it doesn't read the way a real project does: if a product owner asks "where do things stand on the Parabank effort," they want one place to look, not four separate folders to cross-reference. I rebuilt the whole portfolio around *project* instead, so each folder is a self-contained artifact I could hand to a manager or a new team member on day one and say "this is everything on this initiative, front to back."

The 7-folder order itself is also deliberate, not alphabetical: strategy and planning come before a single test case is written, because I don't want a test suite that reflects "whatever occurred to me first" instead of a documented risk assessment; evidence and reports come last because they're the output of the work above them, not an input to it.
