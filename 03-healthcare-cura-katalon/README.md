# Project 03 — Healthcare Web | [CURA Healthcare Service](https://katalon-demo-cura.herokuapp.com/) (Katalon's official demo AUT)

**Domain:** Healthcare | **Primary tool:** Katalon Studio (Groovy) | **Lifecycle coverage:** Planning → Automation → Reporting

CURA is Katalon's **own** official demo application, used across their Academy courses and shipped as the sample project inside Katalon Studio itself — as legitimate a target for a Katalon skills demo as it gets.

## Contents

- [`test-plan.md`](test-plan.md)
- `Object Repository/Page_CURA Healthcare/` — Katalon `TestObject` definitions (`.rs` files)
- `Scripts/Login/` — login test cases (Groovy)
- `Scripts/MakeAppointment/` — appointment booking flow (Groovy)
- `Test Suites/` — suite bundling both
- [`report.md`](report.md)

## Opening this project

This folder mirrors a real Katalon Studio project layout (`Object Repository`, `Scripts`, `Test Suites`, `.prj` descriptor). Open Katalon Studio → **File > Open Project** → select this folder to load it directly.

## Why Katalon here (vs. Playwright/Selenium elsewhere in this portfolio)

Katalon is common in QA teams that need **low-code test authoring for manual-leaning testers** alongside full-code scripting (it supports both). Including it — on top of Playwright ([Project 01](../01-ecommerce-automationexercise)) and Selenium+Java ([Project 02](../02-ecommerce-saucedemo-selenium-java)) — demonstrates the ability to pick the right tool for a team's actual skill mix, which is a core QA Lead/Manager responsibility (see [`00-qa-strategy-and-leadership/tool-tech-matrix.md`](../00-qa-strategy-and-leadership/tool-tech-matrix.md)).
