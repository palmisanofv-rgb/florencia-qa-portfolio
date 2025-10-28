-- Every fact row must resolve to a real dimension row. Should return zero rows.

SELECT f.order_key, f.order_id, f.customer_key
FROM fact_orders f
LEFT JOIN dim_customer dc ON dc.customer_key = f.customer_key
WHERE dc.customer_key IS NULL;

-- Every dim_customer row should map back to a real source customer. Should return zero rows.

SELECT dc.customer_key, dc.customer_id
FROM dim_customer dc
LEFT JOIN customers c ON c.customer_id = dc.customer_id
WHERE c.customer_id IS NULL;
