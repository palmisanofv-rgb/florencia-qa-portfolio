# Evidence

Real screenshots captured live against the production site, one per functional test case, captured by [`../03-automation/tests/evidence.spec.ts`](../03-automation/tests/evidence.spec.ts).

| File | Test Case |
|------|-----------|
| `tc01-home-search-form.png`, `tc01-flight-results.png` | TC-01 Search flights from home page |
| `tc02-purchase-page.png` | TC-02 Select a flight and proceed to purchase (also shows TC-04's hardcoded-route finding) |
| `tc03-billing-form-filled.png`, `tc03-confirmation-thank-you.png` | TC-03 Complete purchase with valid billing details |

TC-05 (performance) has no screenshot — its evidence is the real JMeter run in [`../05-performance/last-run-results.md`](../05-performance/last-run-results.md).
