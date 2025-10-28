# Project 06 — Travel/Booking Web | [BlazeDemo](https://blazedemo.com)

**Domain:** Travel/Booking | **Primary tool:** Apache JMeter | **Lifecycle coverage:** Planning → Performance testing → Reporting

BlazeDemo is BlazeMeter's own official demo application, built specifically to be load-tested — the safest possible legal target for a JMeter portfolio piece.

## ⚠️ Responsible-use note

This is a **light smoke/capability test**, not a stress test: 5 virtual users, 2 iterations, with a 1-second think-time between requests (see `jmeter/BlazeDemo-LoadTest.jmx`). It exists to demonstrate JMeter scripting ability (parameterization, correlation between requests, assertions, a load profile), not to generate real load against a third party. Do not raise the thread count against this or any other site you don't own/operate without explicit permission.

## Contents

- [`test-plan.md`](test-plan.md) — performance test plan (objectives, load profile, NFR thresholds)
- `jmeter/BlazeDemo-LoadTest.jmx` — full booking journey: home → search flights → select flight → purchase → confirmation
- [`report.md`](report.md)

## Running

```bash
jmeter -n -t jmeter/BlazeDemo-LoadTest.jmx -l results.jtl -e -o report-html/
```
