# Test Plan — BlazeDemo

**Application under test:** [blazedemo.com](https://blazedemo.com)

## 1. Scope

### 1.1 In scope
- Home → flight search → flight selection → purchase → confirmation
- Light performance smoke test of the same journey

### 1.2 Out of scope
- Real load/stress testing (see [`00-qa-strategy-and-leadership`](../../00-qa-strategy-and-leadership) — this portfolio never runs heavy load against a third-party site)

## 2. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Confirmation shows wrong city/route | Medium | High | Assertion on confirmation content vs. what was searched |
| Funnel slows under light concurrent load | Medium | Medium | JMeter thresholds (p95 < 3s, 0% errors) |

## 3. Strategy

Playwright for the functional E2E journey; JMeter (not k6) for performance — deliberately, to demonstrate the GUI-authored `.jmx` tool a non-developer performance tester would actually use, per [`00-qa-strategy-and-leadership/tool-tech-matrix.md`](../../00-qa-strategy-and-leadership/tool-tech-matrix.md).

## 4. Exit Criteria
- Booking funnel automated and green
- JMeter thresholds met (or a documented finding if not)
