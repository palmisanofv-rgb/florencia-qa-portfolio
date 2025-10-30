# API Test Report — TVMaze

| Endpoint | Scenarios | Status |
|----------|-----------|--------|
| `/search/shows` | valid query + relevance score check | Verified against live API |
| `/shows/{id}` | valid id + nonexistent id (404) | Verified — `/shows/999999999` confirmed to return 404 |
| `/shows/{id}/episodes` | ordering assertion | Verified |
| `/search/people` | valid query | Verified |
| `/schedule` | country + date filter | Verified |

All 6 requests and their live JSON response shapes were confirmed via direct HTTP calls before writing the Postman assertions (not just assumed from documentation) — see the conversation history for the raw `curl` output this collection was built from.

## Real CI run (GitHub Actions) — 1 bug found in the assertion itself

First run failed on `Schedule By Country And Date`: the test asserted every returned entry's `airdate` exactly equals the requested date, but the live API returned 81/82 entries matching and **1 entry dated the day before** (a real TVMaze boundary quirk, not a client mistake — reproduced with a plain `curl` and confirmed the same 1-entry mismatch). The original assertion was too strict for how the real API actually behaves. Fixed by asserting each entry is within 1 day of the requested date, plus a ≥95% exact-match threshold — a good example of why contract tests need to be validated against live behavior once, not just written from documentation.
