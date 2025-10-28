# Test Plan — ETL / Data Warehouse Validation

## Scope

- Row-count reconciliation between source and warehouse (nothing lost, nothing duplicated in transit)
- Referential integrity in the warehouse (every fact row resolves to a valid dimension row)
- Data quality: required-field NULLs, duplicate natural keys, orphaned rows
- Business-rule checks: aggregate revenue in the warehouse must equal aggregate revenue in the source

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| ETL job silently drops rows (network blip, batch size bug) | Medium | High | Row-count reconciliation per table, per load |
| A monetary field is transformed incorrectly (currency conversion, rounding) during load | Medium | Critical | Business-rule check: `SUM(fact.revenue)` must equal `SUM(source.line totals)` — not just row counts |
| Fact table references a customer that doesn't exist in the dimension | Low | High | Referential integrity check: `LEFT JOIN ... WHERE dim.id IS NULL` |
| Duplicate customer records (same natural key loaded twice) inflate downstream reports | Medium | Medium | `GROUP BY natural_key HAVING COUNT(*) > 1` |

## Strategy

Treat the ETL job like any other system under test: know its expected input/output relationship precisely enough to write an oracle for it. Row counts alone are the weakest possible check (a swapped/corrupted value doesn't change row counts) — the strongest one here is the aggregate business-rule check, which is where this suite actually finds the seeded discrepancy (see [`report.md`](report.md)).

## Exit Criteria

Zero rows returned by every referential-integrity and data-quality query; row counts reconcile exactly; any business-rule discrepancy is either explained (documented, expected) or filed as a defect — never silently ignored.
