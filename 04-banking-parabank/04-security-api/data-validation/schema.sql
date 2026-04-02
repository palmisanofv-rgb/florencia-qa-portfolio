-- Mock schema mirroring Parabank's domain, for local backend-validation demos only.

CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    username    TEXT NOT NULL UNIQUE,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL
);

CREATE TABLE accounts (
    account_id   INTEGER PRIMARY KEY,
    customer_id  INTEGER NOT NULL REFERENCES customers(customer_id),
    account_type TEXT NOT NULL CHECK (account_type IN ('CHECKING', 'SAVINGS')),
    balance      NUMERIC NOT NULL DEFAULT 0
);

CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY,
    account_id      INTEGER NOT NULL REFERENCES accounts(account_id),
    type            TEXT NOT NULL CHECK (type IN ('CREDIT', 'DEBIT')),
    amount          NUMERIC NOT NULL,
    description     TEXT,
    created_at      TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customers VALUES (1, 'qa_portfolio', 'QA', 'Portfolio');

INSERT INTO accounts VALUES
    (12456, 1, 'CHECKING', 450.00),
    (12457, 1, 'SAVINGS', 50.00);

INSERT INTO transactions (account_id, type, amount, description) VALUES
    (12456, 'CREDIT', 500.00, 'Initial deposit on registration'),
    (12456, 'DEBIT', 50.00, 'Transfer to account 12457'),
    (12457, 'CREDIT', 50.00, 'Transfer from account 12456');
