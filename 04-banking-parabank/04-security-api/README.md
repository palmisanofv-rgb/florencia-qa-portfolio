# Security & API Testing

- [`postman/`](postman) — Parabank's real public REST API (account lookup, customer accounts, error handling)
- [`security-checks.md`](security-checks.md) — session cookie flags, security headers, API authorization boundary — 2 findings
- [`data-validation/`](data-validation) — SQL-level reconciliation technique (local mock ledger) for defects that live below the API/UI layer

## Running the API collection

```bash
newman run postman/Parabank-API.postman_collection.json
```
