# Project 10 — Backend/Data QA | ETL & Data Warehouse Validation (local SQLite)

**Domain:** Data engineering / backend | **Primary tool:** SQL (SQLite for portability) | **Lifecycle coverage:** Planning → Data validation → Reporting

Everything else in this portfolio tests through a UI or an API. This project tests the layer most QA portfolios skip entirely: **does the data itself stay correct** as it moves from an operational (OLTP) schema into a reporting/warehouse (star) schema? This is entirely self-contained and local — no third-party system involved, so there's no authorization question at all.

## Contents

- [`test-plan.md`](test-plan.md)
- `schema/source_schema.sql` — OLTP-style source: `customers`, `orders`, `order_items`
- `schema/warehouse_schema.sql` — target star schema: `dim_customer`, `fact_orders`
- `etl/seed_and_simulate_etl.sql` — seeds the source and simulates an ETL load into the warehouse (**with one deliberately seeded discrepancy**, to demonstrate the validation queries actually catch something real, not just pass trivially)
- `validation/` — four independent validation suites: row-count reconciliation, referential integrity, data quality (nulls/duplicates/orphans), and business-rule checks (revenue totals)
- [`report.md`](report.md) — the discrepancy the validation queries caught, and how

## Running

```bash
sqlite3 warehouse.db < schema/source_schema.sql
sqlite3 warehouse.db < schema/warehouse_schema.sql
sqlite3 warehouse.db < etl/seed_and_simulate_etl.sql
sqlite3 warehouse.db < validation/row_count_reconciliation.sql
sqlite3 warehouse.db < validation/referential_integrity_checks.sql
sqlite3 warehouse.db < validation/data_quality_checks.sql
sqlite3 warehouse.db < validation/business_rule_checks.sql
```

## Evidence

Real output from a GitHub Actions run (see the CI badge on the [root README](../README.md) for the current run):

```
--- Row-count reconciliation (expected: clean) ---
check_name                 source_count  warehouse_count  diff
-------------------------  ------------  ---------------  ----
customers vs dim_customer  5             5                0
orders vs fact_orders      8             8                0

--- Business rule checks (expected: the seeded order_id=5 discrepancy) ---
order_id  expected_revenue  warehouse_revenue  drift
--------  ----------------  -----------------  -----
5         50.0              12.5               -37.5

source_total_revenue  warehouse_total_revenue
--------------------  -----------------------
400.5                 363.0
```

Row counts are perfectly clean — and the revenue totals still don't match. That's the entire point of this project: a row-count check alone would have called this ETL job healthy.
