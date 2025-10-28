-- Row-count reconciliation: nothing lost, nothing duplicated in transit.
-- (Weakest check in this suite on its own — see business_rule_checks.sql for why.)

SELECT 'customers vs dim_customer' AS check_name,
       (SELECT COUNT(*) FROM customers) AS source_count,
       (SELECT COUNT(*) FROM dim_customer) AS warehouse_count,
       (SELECT COUNT(*) FROM customers) - (SELECT COUNT(*) FROM dim_customer) AS diff
UNION ALL
SELECT 'orders vs fact_orders',
       (SELECT COUNT(*) FROM orders),
       (SELECT COUNT(*) FROM fact_orders),
       (SELECT COUNT(*) FROM orders) - (SELECT COUNT(*) FROM fact_orders);

-- Expected: diff = 0 for both. (It will be, even with the seeded revenue bug present —
-- that's the point: row counts alone would give this ETL job a clean bill of health.)
