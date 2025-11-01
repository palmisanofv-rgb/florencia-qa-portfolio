# Test Report — Technique Lab

## Real CI run (GitHub Actions) — the iframe test took 4 attempts to get right

| Attempt | Result | Root cause / lesson |
|---------|--------|------|
| 1 | `invalid element state` | `#tinymce` is a `contenteditable` `<body>`, not a form field — WebDriver's "element clear" endpoint (called by `clearValue()`) only supports actual inputs/textareas |
| 2 | `element click intercepted` | Added a manual `click()` before typing; the click point gets computed against the *outer* document, not the frame just switched into, so it hit the iframe boundary itself |
| 3 | No error, but wrong text (`"Your content goes here."`) | Switched to `setValue()`, assuming it types without clearing — it doesn't; WebdriverIO's `setValue()` does an implicit clear-then-type internally, so it silently failed to focus/type at all with no exception raised |
| 4 (fixed) | Pass | Focused the body directly via `browser.execute(() => document.body.focus())`, then typed with `browser.keys(...)` at the browser level — this sends raw keystrokes to whatever already has focus, with no element/click-point resolution involved, which is what a contenteditable editor inside an iframe actually needs |

Attempt 3 is the most instructive failure in this whole portfolio: it didn't throw anything, it just silently did nothing and the assertion caught it — a good reminder that "no exception" is not the same as "it worked."

Shadow DOM test (fixed in round 1, still holds): `shadow$$` only queries **inside the shadow root's own template** — the `<li>` items are *slotted* (light DOM) content, which visually relocates into the shadow tree but isn't part of it. Fixed via a plain `hosts[1].$$('li')`, which correctly reaches the host's light-DOM children.

Both bugs are exactly the "passes cleanly with the wrong result" failure mode this portfolio's test-strategy doc warns against (see [`00-qa-strategy-and-leadership/test-strategy-master.md`](../00-qa-strategy-and-leadership/test-strategy-master.md)).

See CI badge on the [root README](../README.md) for the current run.

## Summary

| Pattern | Result | Notes |
|---------|--------|-------|
| iframe | Pass (after fix above) | TinyMCE editor content read back correctly after switching frame context |
| Drag & drop | Pass | |
| File upload | Pass | Server echoes the uploaded filename back correctly |
| Dynamic loading | Pass | Explicit `waitForDisplayed`, no fixed `sleep()` |
| JS alerts (confirm/dismiss/prompt) | Pass | All 3 native dialog interactions verified |
| Shadow DOM | Pass (after fix above) | |
