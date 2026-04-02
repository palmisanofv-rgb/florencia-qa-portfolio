-- 1. Does the stored balance match the sum of its own transaction ledger?
-- A mismatch here means the balance column and the transaction log have drifted
-- (a classic banking-system defect class: UI/cache shows one number, the ledger says another).
SELECT
    a.account_id,
    a.balance AS stored_balance,
    SUM(CASE WHEN t.type = 'CREDIT' THEN t.amount ELSE -t.amount END) AS ledger_balance,
    a.balance - SUM(CASE WHEN t.type = 'CREDIT' THEN t.amount ELSE -t.amount END) AS drift
FROM accounts a
JOIN transactions t ON t.account_id = a.account_id
GROUP BY a.account_id
HAVING drift != 0;

-- 2. Every DEBIT on one account in a transfer should have a matching CREDIT elsewhere
-- for the same amount (double-entry sanity check) — flags orphaned/unbalanced transfers.
SELECT d.account_id AS debited_account, d.amount, d.created_at
FROM transactions d
WHERE d.type = 'DEBIT'
  AND NOT EXISTS (
      SELECT 1 FROM transactions c
      WHERE c.type = 'CREDIT'
        AND c.amount = d.amount
        AND c.account_id != d.account_id
  );

-- 3. No account should ever go negative (a core banking invariant).
SELECT account_id, balance FROM accounts WHERE balance < 0;
