# Test Plan — TVMaze API

## Scope

- Show search (`/search/shows`) — fuzzy text match with a relevance `score`
- Show detail by ID (`/shows/{id}`)
- Episode list by show (`/shows/{id}/episodes`)
- People search (`/search/people`)
- Schedule by country/date (`/schedule`)

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Search returns results with a broken/negative relevance score | Low | Low | Assert `score > 0` on every result |
| Show detail for a nonexistent ID returns 200 with empty body instead of 404 | Medium | Medium | Explicit test against a known-invalid ID, assert status code |
| Episode list is not ordered by season/number | Low | Low | Assert monotonically non-decreasing `(season, number)` ordering |
| Schedule endpoint silently ignores an invalid country code | Medium | Low | Test with an invalid 2-letter code, assert error handling |

## Strategy

Contract/schema-focused: assert field presence and types (`id` is integer, `rating.average` is number or null, `premiered` matches `YYYY-MM-DD`), not just status codes — this is the pattern that catches breaking API changes early, which matters most when the API has no versioning in its URL.
