# Performance Test Plan — BlazeDemo

## Objective

Validate that the core booking journey (search → select flight → purchase → confirmation) responds within acceptable thresholds under light concurrent load, and functionally completes correctly for every virtual user (not just fast, but *correct*).

## Scope

- Home page load
- Flight search (`POST /reserve.php`)
- Flight selection (`POST /purchase.php`)
- Purchase confirmation (`POST /confirmation.php`)

## Load Profile (intentionally light — see README responsible-use note)

| Parameter | Value |
|-----------|-------|
| Virtual users | 5 |
| Ramp-up | 5s |
| Loop count | 2 |
| Think time between requests | 1s (Constant Timer) |

## Non-Functional Requirement Thresholds (illustrative, for this demo)

| Metric | Threshold |
|--------|-----------|
| 95th percentile response time | < 3s per request |
| Error rate | 0% (every response assertion must pass) |

## Assertions per request

Each sampler has a **Response Assertion** checking for expected page content (not just HTTP 200), since a page can return 200 with an error banner:

| Request | Assertion |
|---------|-----------|
| Home | Contains "Find Flights" |
| Reserve | Contains "Choose This Flight" |
| Purchase | Contains "has been reserved" |
| Confirmation | Contains "Thank you for your purchase today!" |

## Finding worth noting

The purchase-page heading ("Your flight from TLV to SFO has been reserved.") is hardcoded and does **not** reflect the `fromPort`/`toPort` actually searched — confirmed by submitting Boston→London and still seeing "TLV to SFO". Low-severity, but a real content-accuracy defect a thorough tester should flag.
