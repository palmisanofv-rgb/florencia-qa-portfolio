-- OLTP-style source schema

CREATE TABLE customers (
    customer_id  INTEGER PRIMARY KEY,
    email        TEXT NOT NULL UNIQUE,
    first_name   TEXT NOT NULL,
    last_name    TEXT NOT NULL,
    created_at   TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id     INTEGER PRIMARY KEY,
    customer_id  INTEGER NOT NULL REFERENCES customers(customer_id),
    order_date   TEXT NOT NULL,
    status       TEXT NOT NULL CHECK (status IN ('COMPLETED', 'CANCELLED', 'PENDING'))
);

CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY,
    order_id      INTEGER NOT NULL REFERENCES orders(order_id),
    product_name  TEXT NOT NULL,
    quantity      INTEGER NOT NULL CHECK (quantity > 0),
    unit_price    NUMERIC NOT NULL CHECK (unit_price >= 0)
);
