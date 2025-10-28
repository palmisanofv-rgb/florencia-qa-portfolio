# Test Report — ApiDemos (Appium)

| Test | Status |
|------|--------|
| Navigate App → Alert Dialogs → OK Cancel dialog, accept, confirm return to list | Written, not executed in this environment |

## Execution note — please read before relying on this in an interview

Unlike every web-based project in this portfolio, this one **could not be verified via HTTP requests** — there's no way to inspect a mobile app's UI hierarchy without a running emulator/device and the Appium server, neither of which is available in this environment. The accessibility IDs used here ("App", "Alert Dialogs", "OK Cancel dialog with a message") reflect the widely-published structure of Appium's own ApiDemos sample app used throughout Appium's official documentation and sample tests, but they were **not independently re-verified against a live install** the way every other project's selectors were confirmed with `curl`.

**Recommended before using this in an interview:** install Appium + Android Studio emulator locally, install `ApiDemos-debug.apk`, and run this suite once to confirm the exact accessibility IDs on the APK version you're using (they can shift between ApiDemos releases).
