-- 1. Required-field NULLs in the warehouse. Should return zero rows.
SELECT * FROM dim_customer WHERE full_name IS NULL OR email IS NULL;
SELECT * FROM fact_orders WHERE order_date IS NULL OR status IS NULL;

-- 2. Duplicate natural keys (same source customer/order loaded twice). Should return zero rows.
SELECT customer_id, COUNT(*) FROM dim_customer GROUP BY customer_id HAVING COUNT(*) > 1;
SELECT order_id, COUNT(*) FROM fact_orders GROUP BY order_id HAVING COUNT(*) > 1;

-- 3. Orphaned source order_items (line items pointing at a nonexistent order). Should return zero rows.
SELECT oi.order_item_id, oi.order_id
FROM order_items oi
LEFT JOIN orders o ON o.order_id = oi.order_id
WHERE o.order_id IS NULL;
