# Data Validation Report — ETL / Warehouse Load

## Row-count reconciliation
✅ Clean — `customers` (5) vs `dim_customer` (5); `orders` (8) vs `fact_orders` (8). Zero diff on both.

## Referential integrity
✅ Clean — every `fact_orders` row resolves to a real `dim_customer` row and vice versa.

## Data quality
✅ Clean — no NULLs in required fields, no duplicate natural keys, no orphaned `order_items`.

## Business-rule check — **1 discrepancy found**

| order_id | expected_revenue (source) | warehouse_revenue | drift |
|----------|---------------------------|--------------------|-------|
| 5 | 50.00 | 12.50 | **-37.50** |

**Root cause:** the ETL transform for `fact_orders.revenue` used `unit_price` alone instead of `SUM(quantity * unit_price)` for this order — a transformation bug, not a source-data problem (confirmed: `order_items` for order 5 is correct: qty 4 @ $12.50).

**Total revenue impact:** source total for COMPLETED orders is $400.50; warehouse total is $363.00 — a $37.50 (~9.4%) understatement that would silently under-report revenue on any dashboard built on the warehouse table.

## Why this matters for the suite design

This is exactly the failure mode **row-count reconciliation cannot see** — the row exists, it references a valid customer, no field is NULL. Only the aggregate business-rule check (comparing `SUM(revenue)` against the source of truth) catches it. This is the argument for always including at least one arithmetic/business-rule check in a data-validation suite, not stopping at structural checks.

## Disposition

Filed as a **data-integrity defect** against the ETL transform logic (not the source schema). Fix: correct the revenue expression to `SUM(quantity * unit_price)` for every order, re-run the load, re-run `business_rule_checks.sql` to confirm zero drift.
