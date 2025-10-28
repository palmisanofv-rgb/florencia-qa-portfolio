# API Test Report — TVMaze

| Endpoint | Scenarios | Status |
|----------|-----------|--------|
| `/search/shows` | valid query + relevance score check | Verified against live API |
| `/shows/{id}` | valid id + nonexistent id (404) | Verified — `/shows/999999999` confirmed to return 404 |
| `/shows/{id}/episodes` | ordering assertion | Verified |
| `/search/people` | valid query | Verified |
| `/schedule` | country + date filter | Verified |

All 6 requests and their live JSON response shapes were confirmed via direct HTTP calls before writing the Postman assertions (not just assumed from documentation) — see the conversation history for the raw `curl` output this collection was built from.
