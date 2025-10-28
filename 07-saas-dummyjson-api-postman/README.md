# Project 07 — SaaS/Product Catalog API | [DummyJSON](https://dummyjson.com)

**Domain:** SaaS / product catalog & auth | **Primary tools:** Postman + Newman | **Lifecycle coverage:** Planning → API automation (auth/JWT + CRUD) → Reporting

DummyJSON is a free, keyless REST API explicitly built for testing/prototyping — includes JWT authentication, product/cart CRUD, and search, which makes it a good complement to [Project 05](../05-media-tvmaze-api-postman)'s read-only catalog API by adding **auth flows and write operations** to the portfolio.

## Contents

- [`test-plan.md`](test-plan.md)
- `postman/DummyJSON-API.postman_collection.json` — auth (login/me), product CRUD, search, cart lookup
- [`api-test-report.md`](api-test-report.md)

## Running

```bash
newman run postman/DummyJSON-API.postman_collection.json
```
