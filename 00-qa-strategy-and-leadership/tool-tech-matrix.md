# Tool Selection Matrix

**Author:** Florencia Palmisano

A test manager's job includes choosing tools for a team's actual skill mix, budget, and CI constraints — not defaulting to whatever's personally preferred. Every tool decision in this portfolio is written up as if it were a real team decision, and two of them are backed by an actual migration away from a tool that turned out to be a bad fit, not a hypothetical trade-off table.

## 1. Decision framework

Before picking a tool for a project, I weigh five factors against each other rather than optimizing for just one:

| Factor | Question |
|---|---|
| **Application architecture fit** | Is this a modern JS-rendered SPA, or an older server-rendered / partial-AJAX stack? |
| **Team skill fit & hiring pool** | Who can maintain this six months from now, and how easily could a new hire ramp up? |
| **CI portability** | Can this run headless, unattended, on every push, without a GUI or manual license step? |
| **Maintenance cost** | How much of the suite's future time goes into fighting the tool itself vs. writing new coverage? |
| **Reviewability** | Can a hiring manager or teammate meaningfully review this in a plain-text git diff? |

## 2. The matrix

| Tool | Used in | Chosen because | Trade-off accepted |
|------|---------|-----------------|---------------------|
| **Playwright + TypeScript** | [01](../01-ecommerce-automationexercise), [02](../02-ecommerce-saucedemo), [05](../05-travel-blazedemo), [07](../07-hr-orangehrm), [08](../08-ecommerce-demoblaze), [10](../10-productivity-todomvc) | Default choice for modern, JS-rendered SPAs — built-in auto-waiting removes most of the timing flakiness plain Selenium hits against React/Vue/Angular apps; native API-testing support means one tool covers UI and API in the same language | Smaller long-term hiring pool than Selenium; younger ecosystem for enterprise plugins |
| **Selenium WebDriver** | [03](../03-healthcare-cura) (Java), [04](../04-banking-parabank) (Python), [06](../06-legacy-tools-theinternet) (Python) | Still the tool most likely already in use on **older, server-rendered systems** a team inherits rather than builds from scratch — exactly the "legacy system" framing these three projects use; largest hiring pool for teams that need to onboard testers quickly | More boilerplate than Playwright; explicit waits required (no built-in auto-wait) — which is precisely why it fits *legacy* stacks better than fast-moving SPAs |
| **Appium** | [09](../09-mobile-appium) | Same WebDriver protocol as Selenium — a Selenium-literate team can pick up mobile automation without learning an entirely new paradigm | Requires real device/emulator infrastructure to run in CI, which is the actual cost center for mobile automation, not the scripting itself — see [`risk-register.md`](risk-register.md) R-27 for how that constraint played out here |
| **Postman/Newman** | every project's `04-security-api` folder | Lowest barrier to entry for API testing; collections are readable/maintainable by less code-heavy team members; Newman makes it CI-portable | Less expressive than writing API tests in the same language as the rest of the suite |
| **k6 / Apache JMeter** | every project's `05-performance` folder | k6's JS scripts stay in the same language as the Playwright suites for most projects; JMeter is kept specifically for [05](../05-travel-blazedemo) because a GUI-authored `.jmx` better represents the tool a non-developer performance tester would actually reach for | JMeter's XML-based `.jmx` is genuinely hard to code-review in a PR — a real trade-off, not a formality |

## 3. Two real migrations, not hypothetical trade-offs

The table above states tool trade-offs the way most portfolios do — as reasoning. These two are different: they're documented cases where the *original* tool choice was tested against a real app, found wanting, and replaced, with the specific bugs that drove the switch kept on record rather than quietly deleted from history.

### 3.1 saucedemo: Selenium/Java → Playwright

The earlier Selenium/Java version of Project 02 went through several rounds of debugging real timing bugs against this exact React app: a shared-WebDriver-instance thread-safety race when tests ran in parallel, a click that silently didn't register on the app's controlled inputs, and a submission race between Selenium's `sendKeys()` and React's controlled-input re-render cycle. None of these were exotic — they're the textbook failure mode of a WebDriver-generation tool against a framework that re-renders on every keystroke. Playwright's `fill()` (which sets the value and dispatches the right events in one atomic action) and its built-in auto-waiting were adopted specifically to close that gap. This is a real, evidence-backed tool-fit decision, not a preference for the newer tool.

### 3.2 the-internet: WebdriverIO → Selenium/Python

Project 06 carries forward two lessons from an earlier WebdriverIO implementation rather than starting its Selenium/Python rewrite from a blank slate: shadow-DOM slotted content needs a light-DOM query regardless of which tool is driving the browser, and drag-and-drop is a known-flaky automation pattern worth documenting as accepted risk rather than chasing to artificial 100% green (see [`risk-register.md`](risk-register.md) R-25). A `click()` issued right before `send_keys()` inside a TinyMCE iframe also threw the same `element click intercepted` error under both tools — because Selenium computes the click coordinate against the outer document, not the frame just switched into, a property of the UI pattern itself, not a quirk of one tool's API. That recurrence across two different tools is exactly why I write these lessons into the project rather than treating them as one-off notes: they transfer.

## 4. What this reflects

When picking a tool, the real question isn't "which tool is best" — it's *who will maintain this, what does the CI budget allow, and what failure mode does this layer need to catch that others can't?* Splitting Playwright (modern SPAs) from Selenium (legacy, server-rendered systems) mirrors the actual reason a real QA org ends up running more than one automation tool: different systems in the same company are frequently built years apart on different stacks, and a one-size-fits-all tool choice usually means forcing a bad fit onto at least one of them. The two migrations above are what that looks like in practice, not just in theory.
