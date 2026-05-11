# Security & API Testing

- [`postman/`](postman) — Parabank's real public REST API (account lookup, customer accounts, error handling)
- [`security-checks.md`](security-checks.md) — broken authentication, session cookie flags, security headers, API authorization boundary, accessibility — 7 findings total (1 High, rest Low-Medium)
- [`data-validation/`](data-validation) — SQL-level reconciliation technique (local mock ledger) for defects that live below the API/UI layer

## Running the API collection

```bash
newman run postman/Parabank-API.postman_collection.json
```
