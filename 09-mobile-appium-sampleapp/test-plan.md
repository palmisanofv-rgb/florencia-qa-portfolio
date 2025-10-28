# Test Plan — ApiDemos (Appium sample app)

## Scope

- App launch and home list navigation (activity transitions)
- Native Android alert dialog interaction (OK/Cancel)
- Text/label verification after a native UI interaction

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Element locator strategy breaks between Android versions (resource-id vs accessibility id) | Medium | Medium | Prefer `AppiumBy.accessibilityId` over resource-id where the app exposes one, since content-desc tends to be more stable across OS versions than generated resource IDs |
| Native dialogs/toasts aren't part of the standard DOM/view hierarchy and get missed by naive waits | Medium | High | Explicit `WebDriverWait` on the dialog's button element before interacting |
| Session isn't cleaned up between tests, causing state to leak across the suite | Medium | Medium | `@AfterMethod` always calls `driver.quit()`, mirroring the same discipline used for web sessions elsewhere in this portfolio |

## Strategy

Same page-object-style separation as the web projects in this portfolio, adapted to mobile: a `BaseTest` owns driver lifecycle (setup/teardown), test classes only contain navigation + assertions — demonstrating that the *architecture* of a good automation suite transfers across web and mobile, even though the tool (Appium vs. Selenium/Playwright) and locator strategy differ.

## Exit Criteria

Navigation and alert-dialog suite green on a local Android emulator running `ApiDemos-debug.apk`.
