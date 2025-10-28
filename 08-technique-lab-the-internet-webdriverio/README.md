# Project 08 — Cross-Cutting Technique Lab | [the-internet.herokuapp.com](https://the-internet.herokuapp.com)

**Domain:** N/A (technique breadth, not a single business domain) | **Primary tool:** WebdriverIO + JavaScript + Mocha | **Lifecycle coverage:** Automation → Reporting

"The Internet" (by Dave Haeffner) is the canonical Selenium/WebDriver practice ground — a deliberately awkward collection of UI patterns (iframes, drag & drop, dynamic loading, native alerts, file upload, Shadow DOM) that real applications throw at automation and that many "happy path" portfolios never touch.

This is a **fourth** distinct automation stack in this portfolio (Playwright/TS → Project 01, Selenium/Java → Project 02, Selenium/Python → Project 04, now **WebdriverIO/JavaScript** here) — chosen deliberately to show comfort across the whole WebDriver-family ecosystem, not just one framework.

## Contents

- [`test-plan.md`](test-plan.md)
- `test/specs/` — one spec per hard-to-automate pattern:
  - `iframe.spec.js` — WYSIWYG editor inside an iframe
  - `drag-and-drop.spec.js` — HTML5 drag & drop
  - `file-upload.spec.js` — native file input
  - `dynamic-loading.spec.js` — element that appears after an async delay
  - `javascript-alerts.spec.js` — native `alert`/`confirm`/`prompt`
  - `shadow-dom.spec.js` — piercing a Shadow DOM boundary
- [`report.md`](report.md)

## Running

```bash
npm install
npx wdio run wdio.conf.js
```
