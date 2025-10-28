-- Target star schema (simplified)

CREATE TABLE dim_customer (
    customer_key INTEGER PRIMARY KEY,
    customer_id  INTEGER NOT NULL UNIQUE, -- natural key from source
    full_name    TEXT NOT NULL,
    email        TEXT NOT NULL
);

CREATE TABLE fact_orders (
    order_key    INTEGER PRIMARY KEY,
    order_id     INTEGER NOT NULL UNIQUE, -- natural key from source
    customer_key INTEGER NOT NULL REFERENCES dim_customer(customer_key),
    order_date   TEXT NOT NULL,
    status       TEXT NOT NULL,
    revenue      NUMERIC NOT NULL -- sum(quantity * unit_price) for COMPLETED orders only
);
