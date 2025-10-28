# SQL — Backend Data Validation Companion

## Why this is local, not connected to Parabank's real database

Parabank is a public demo app; Parasoft does not expose its backend database for external connections, and attempting to reach it would be unauthorized. This folder instead demonstrates the **technique** a QA engineer/lead would apply if given (authorized) read access to a banking system's database: reconciling what the UI/API reports against what the ledger actually stored.

`schema.sql` seeds a small SQLite database that mirrors Parabank's domain (customers, accounts, transactions). `reconciliation-queries.sql` contains the kind of validation queries a QA would run after a UI/API test (like the transfer test in [`../tests/test_transfer.py`](../tests/test_transfer.py)) to independently verify the backend agrees with what the UI displayed.

## Running

```bash
sqlite3 parabank_mock.db < schema.sql
sqlite3 parabank_mock.db < reconciliation-queries.sql
```
