# Project 05 — Media/Streaming Catalog API | [TVMaze API](https://www.tvmaze.com/api)

**Domain:** Media/Streaming (TV catalog data) | **Primary tools:** Postman + Newman | **Lifecycle coverage:** Planning → API automation → Reporting

TVMaze exposes a free, keyless, public REST API for TV show/episode/cast data — used here as the "streaming/media" vertical. (Testing an actual DRM-protected commercial streaming service like Netflix or Disney+ without authorization would violate its ToS; this is the legitimate public equivalent for that domain.)

## Contents

- [`test-plan.md`](test-plan.md)
- `postman/TVMaze-API.postman_collection.json` — show search, show detail, episodes, people search, schedule
- [`api-test-report.md`](api-test-report.md)

## Running

```bash
newman run postman/TVMaze-API.postman_collection.json
```

No API key or environment file needed — every endpoint is public.

## Evidence

Real Newman output from a GitHub Actions run against the live API (see the CI badge on the [root README](../README.md) for the current run):

```
┌─────────────────────────┬────────────────────┬────────────────────┐
│                         │            executed │             failed │
├─────────────────────────┼────────────────────┼────────────────────┤
│              iterations │                  1 │                  0 │
├─────────────────────────┼────────────────────┼────────────────────┤
│                requests │                  6 │                  0 │
├─────────────────────────┼────────────────────┼────────────────────┤
│              assertions │                 19 │                  0 │
├─────────────────────────┴────────────────────┴────────────────────┤
│ total run duration: 982ms                                         │
└─────────────────────────────────────────────────────────────────────┘
```
