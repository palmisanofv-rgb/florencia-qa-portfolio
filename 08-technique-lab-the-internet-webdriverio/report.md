# Test Report — Technique Lab

## Real CI run (GitHub Actions)

First run: 4/6 specs passed, 2 failed — both genuine bugs, now fixed:

| Bug found | Root cause | Fix |
|-----------|-----------|-----|
| iframe test threw `invalid element state` | `#tinymce` is a `contenteditable` `<body>`, not a form field — WebDriver's "element clear" endpoint only supports actual inputs/textareas | Replaced `clearValue()` with click + `Ctrl+A` before typing |
| Shadow DOM test got `Received length: 0` instead of 2 | `shadow$$` only queries **inside the shadow root's own template** — the `<li>` items are *slotted* (light DOM) content, which visually relocates into the shadow tree but isn't part of it | Changed `hosts[1].shadow$$('li')` to a plain `hosts[1].$$('li')`, which correctly reaches the host's light-DOM children |

The Shadow DOM bug is a genuinely instructive one: it's easy to assume "shadow DOM → always use `shadow$$`", but slotted/projected content specifically lives in the light DOM. Getting this wrong doesn't throw an error — it just silently returns 0 elements, which is exactly the "passes cleanly on an empty result" failure mode this portfolio's test-strategy doc warns against (see [`00-qa-strategy-and-leadership/test-strategy-master.md`](../00-qa-strategy-and-leadership/test-strategy-master.md)).

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
