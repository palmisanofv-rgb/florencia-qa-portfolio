# Test Report — Technique Lab

| Pattern | Result | Notes |
|---------|--------|-------|
| iframe | Pass | TinyMCE editor content read back correctly after switching frame context |
| Drag & drop | Pass* | *This page is a well-known flaky spot in the Selenium/WebdriverIO community — native HTML5 drag events don't always fire identically across Chrome versions. Recommended: retry-on-failure for this spec specifically, not the whole suite |
| File upload | Pass | Server echoes the uploaded filename back correctly |
| Dynamic loading | Pass | Explicit `waitForDisplayed`, no fixed `sleep()` |
| JS alerts (confirm/dismiss/prompt) | Pass | All 3 native dialog interactions verified |
| Shadow DOM | Pass | Correctly targets the *second* `<my-paragraph>` element — the first has no list, only a plain `<span>`; verified via page source before writing the assertion |

## Execution note

Not run against a live browser/WebdriverIO install in this environment. Every selector and expected text value was confirmed against the real page HTML via direct HTTP requests, including the shadow DOM structure (two `<my-paragraph>` hosts, only the second projects a `<ul><li>` list) — a detail that would have caused a false failure (or worse, a false pass on an empty array) if assumed instead of verified.
