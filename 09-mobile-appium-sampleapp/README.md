# Project 09 — Mobile | Appium's official sample app (ApiDemos)

**Domain:** Mobile (Android) | **Primary tools:** Appium + Java + TestNG | **Lifecycle coverage:** Planning → Automation → Reporting

## Why this app, specifically

Automating a **real commercial mobile app** (a banking app, a streaming app, etc.) without the vendor's authorization would violate almost every mobile app's Terms of Service, and most also use anti-automation/anti-tampering protections. Instead, this project targets **`ApiDemos-debug.apk`** — Appium's own official Android sample app, distributed by the Appium project itself specifically for learning/demoing mobile automation (referenced throughout Appium's own documentation and the `appium/java-client` sample tests). This is the legally-clean equivalent of the web sandboxes used elsewhere in this portfolio, for the mobile layer.

## Contents

- [`test-plan.md`](test-plan.md)
- `pom.xml` — Appium Java client + TestNG
- `src/test/java/base/BaseTest.java` — Appium driver setup/teardown (W3C capabilities)
- `src/test/java/tests/ApiDemosNavigationTest.java` — list navigation + native alert-dialog interaction
- [`report.md`](report.md)

## Running

Requires Appium Server 2.x running locally, an Android emulator/device, and `ApiDemos-debug.apk` (downloadable from the Appium project's sample-code) installed at the path referenced in `BaseTest.java`.

```bash
appium &
mvn test
```
