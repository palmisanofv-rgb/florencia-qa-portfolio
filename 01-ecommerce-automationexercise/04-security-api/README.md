# Security & API Testing

- [`postman/`](postman) — Postman collection covering all 8 endpoints / 14 documented scenarios of automationexercise's public API (account lifecycle, products, search, login verification)
- [`security-checks.md`](security-checks.md) — basic security testing: response headers, injection/XSS probes, auth boundary, error verbosity — with 3 real findings

## Running the API collection

```bash
npm install -g newman
newman run postman/AutomationExercise-API.postman_collection.json \
  -e postman/AutomationExercise-API.postman_environment.json
```
