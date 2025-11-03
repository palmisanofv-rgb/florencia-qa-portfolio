# Per-Project Folder Template

Every numbered project (01–10) follows this exact shape, so the *process* is identical even as the *product under test* changes — the same discipline a test manager would enforce across a real team's projects.

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

The previous version of this portfolio organized by *discipline* (all manual testing across every site in one folder, all API testing in another). That's a reasonable way to show tool breadth, but it doesn't read the way a real project does: a stakeholder asking "where do things stand on the Parabank effort" wants one place to look, not four. Organizing by *project* instead means each folder is a self-contained artifact you could hand to a manager or a new team member and say "this is everything on this initiative."
