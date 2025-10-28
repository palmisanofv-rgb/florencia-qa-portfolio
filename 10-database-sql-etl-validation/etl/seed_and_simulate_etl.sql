-- 1. Seed the OLTP source

INSERT INTO customers (customer_id, email, first_name, last_name) VALUES
    (1, 'ana@example.com', 'Ana', 'Gomez'),
    (2, 'bruno@example.com', 'Bruno', 'Diaz'),
    (3, 'carla@example.com', 'Carla', 'Ruiz'),
    (4, 'diego@example.com', 'Diego', 'Lopez'),
    (5, 'elena@example.com', 'Elena', 'Torres');

INSERT INTO orders (order_id, customer_id, order_date, status) VALUES
    (1, 1, '2026-01-05', 'COMPLETED'),
    (2, 2, '2026-01-06', 'COMPLETED'),
    (3, 3, '2026-01-06', 'CANCELLED'),
    (4, 1, '2026-01-08', 'COMPLETED'),
    (5, 4, '2026-01-09', 'COMPLETED'),
    (6, 5, '2026-01-10', 'PENDING'),
    (7, 2, '2026-01-11', 'COMPLETED'),
    (8, 3, '2026-01-12', 'COMPLETED');

INSERT INTO order_items (order_id, product_name, quantity, unit_price) VALUES
    (1, 'Widget A', 2, 10.00),
    (1, 'Widget B', 1, 15.00),
    (2, 'Widget C', 3, 8.50),
    (3, 'Widget D', 1, 100.00),
    (4, 'Widget E', 5, 4.00),
    (5, 'Widget F', 4, 12.50),
    (6, 'Widget G', 2, 9.99),
    (7, 'Widget H', 1, 200.00),
    (8, 'Widget I', 2, 30.00),
    (8, 'Widget J', 1, 10.00);

-- 2. Simulate the ETL load into the warehouse.
-- dim_customer load: straightforward 1:1 copy — correct.
INSERT INTO dim_customer (customer_id, full_name, email)
SELECT customer_id, first_name || ' ' || last_name, email
FROM customers;

-- fact_orders load: revenue should be SUM(quantity * unit_price) per COMPLETED order.
-- *** Order 5 is loaded with a seeded bug: revenue = unit_price only (12.50), missing
-- the quantity multiplication (should be 4 * 12.50 = 50.00). Row counts are unaffected —
-- this is exactly the class of bug row-count reconciliation alone would miss. ***
INSERT INTO fact_orders (order_id, customer_key, order_date, status, revenue)
SELECT
    o.order_id,
    dc.customer_key,
    o.order_date,
    o.status,
    CASE
        WHEN o.status != 'COMPLETED' THEN 0
        WHEN o.order_id = 5 THEN 12.50 -- seeded bug: should be 50.00
        ELSE (SELECT SUM(quantity * unit_price) FROM order_items oi WHERE oi.order_id = o.order_id)
    END
FROM orders o
JOIN dim_customer dc ON dc.customer_id = o.customer_id;
