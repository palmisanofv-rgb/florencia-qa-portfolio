-- The strongest check in this suite: aggregate revenue must match between source and warehouse
-- for COMPLETED orders. Row counts can be perfect while a monetary value is still wrong —
-- this is the query that actually catches the seeded bug on order_id = 5.

WITH source_truth AS (
    SELECT o.order_id, SUM(oi.quantity * oi.unit_price) AS true_revenue
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.order_id
    WHERE o.status = 'COMPLETED'
    GROUP BY o.order_id
)
SELECT
    f.order_id,
    st.true_revenue AS expected_revenue,
    f.revenue AS warehouse_revenue,
    f.revenue - st.true_revenue AS drift
FROM fact_orders f
JOIN source_truth st ON st.order_id = f.order_id
WHERE f.revenue != st.true_revenue;

-- Expected (before the fix): one row — order_id 5, expected 50.00, warehouse 12.50, drift -37.50.
-- See report.md for how this was triaged.

-- Portfolio-level total revenue check (what a dashboard consumer would notice first):
SELECT
    (SELECT SUM(quantity * unit_price) FROM order_items oi
        JOIN orders o ON o.order_id = oi.order_id WHERE o.status = 'COMPLETED') AS source_total_revenue,
    (SELECT SUM(revenue) FROM fact_orders WHERE status = 'COMPLETED') AS warehouse_total_revenue;
