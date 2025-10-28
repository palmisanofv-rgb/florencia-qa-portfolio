# Test Plan — Technique Lab

## Scope

Six UI patterns that are disproportionately likely to break a naive automation suite:

| Pattern | Why it's hard | Page |
|---------|---------------|------|
| iframe | Locators must switch context into the frame and back | `/iframe` |
| Drag & drop | HTML5 drag events don't map to a simple click | `/drag_and_drop` |
| File upload | Native OS file dialogs can't be automated directly — must set the `<input>` value | `/upload` |
| Dynamic loading | Element doesn't exist until an async delay completes — naive automation races it | `/dynamic_loading/1` |
| Native alerts | Alerts/confirms/prompts are outside the DOM, need browser-level API | `/javascript_alerts` |
| Shadow DOM | Standard CSS selectors can't pierce a shadow boundary | `/shadowdom` |

## Risk Analysis

| Risk | Mitigation |
|------|-----------|
| Flaky dynamic-loading test (race condition) | Explicit wait on the finish text, not a fixed `sleep()` |
| Drag & drop works in the tool's simulated events but not real user drag | Assert the actual resulting DOM state (columns swapped), not just "no error thrown" |
| Shadow DOM test silently finds 0 elements (querying the wrong root) and reports a false pass | Assert a specific expected text value, not just element-count > 0 |

## Exit Criteria

All 6 patterns automated and green, each with a state-based assertion (not just "no exception was thrown").
