# Sprint 01 Report — Parabank

**Sprint goal:** automate registration/login/transfer with real balance reconciliation, add API + security coverage, and restructure into the 7-folder template.

## Debugging log (real CI rounds, not fabricated)

| Round | Bug found | Root cause | Fix |
|-------|-----------|-----------|-----|
| 1 | Invalid-password test failed on a wrong string match | Assumed error text "could not be **validated**"; Parabank's actual copy is "could not be **verified**" | Updated the assertion to the real string |
| 1 | Both transfer tests failed with `NoSuchElementException` | Fragile `//a[text()='{id}']/ancestor::tr` XPath didn't reliably match the account-number link | Rewrote `AccountsOverviewPage` to read `#accountTable` row-by-row instead of searching by link text |
| 3 | Registration "succeeded" but the suite reported it as not landing on the dashboard | An instant `"Log Out" in driver.page_source` check doesn't wait or retry — it raced a still-settling redirect. Once, it genuinely hit a Cloudflare **"Just a moment..."** interstitial on Parabank's shared public demo instance | Replaced with a real `WebDriverWait` for the `Log Out` link |
| 4 | Same page_source race in `test_login.py`, plus the accounts table occasionally read empty | Parabank populates `#accountTable`'s rows slightly *after* the page's initial HTML | Explicit `WebDriverWait` for a row with a real numeric account id |
| 6 | Transfer tests failed with a blank id for the *newly opened* savings account | `#newAccountId`'s text fills in slightly after the element appears — same failure class | Waited for non-empty `.text`, not just element presence |
| 7 | Transfer confirmation text came back empty | `#showResult h1` fills in via AJAX slightly after the form submits — same pattern a fourth time | Applied the identical non-empty-text wait |

By round 7 this was a recognizable **application pattern**, not four unrelated bugs: Parabank renders a container first and fills its text in a beat later, everywhere. Recognizing the pattern turned later instances into a one-line fix instead of a fresh investigation each time.

## Infrastructure risk observed

Parabank's Cloudflare bot-check recurred on a completely unrelated line of code in a later run — direct confirmation this is the shared instance being occasionally cautious about CI traffic, not a defect in this suite. Documented rather than hidden (see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md), §3).

## This sprint's new work

- Restructured into the 7-folder template
- Added `04-security-api`: real Parabank REST API collection + session-cookie/header security findings
- Added `05-performance`: k6 smoke test
- Added evidence capture to every automated test case

## Metrics

| Metric | Value |
|--------|-------|
| P1 scenario automation ratio | 6/6 |
| Open defects | 0 (1 finding: $0 transfer accepted, disposition: low-severity, reported) |
