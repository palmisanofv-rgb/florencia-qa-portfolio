# API Test Coverage Report — AutomationExercise

## Coverage

All 8 endpoints / 14 documented scenarios from [`/api_list`](https://automationexercise.com/api_list) are covered:

| Endpoint | Method(s) tested | Scenarios |
|----------|------------------|-----------|
| `/api/productsList` | GET, POST (405 case) | 2 |
| `/api/brandsList` | GET, PUT (405 case) | 2 |
| `/api/searchProduct` | POST (valid + missing-param 400) | 2 |
| `/api/verifyLogin` | POST (valid, missing-email 400, invalid 404), DELETE (405) | 4 |
| `/api/createAccount` | POST (201) | 1 |
| `/api/getUserDetailByEmail` | GET | 1 |
| `/api/updateAccount` | PUT | 1 |
| `/api/deleteAccount` | DELETE | 1 |
| **Total** | | **14/14** |

## Running the collection (CI-ready)

```bash
npm install -g newman
newman run postman/AutomationExercise-API.postman_collection.json \
  -e postman/AutomationExercise-API.postman_environment.json \
  --reporters cli,junit --reporter-junit-export results.xml
```

The `Account Lifecycle` folder runs in order (create → read → update → delete) so it self-contains its own test data and never leaves accounts behind on the shared sandbox.

## Notes

- Assertions check both HTTP status and the API's own `responseCode`/`message` fields, since this API returns `200 OK` at the transport level even for some documented "error" responses (e.g. invalid login returns HTTP 200 with `responseCode: 404` in the body) — a good example of why status-code-only assertions are insufficient for this API.
- Résumé claim of "200+ critical endpoints validated" (see root [README](../../README.md)) reflects cumulative professional experience across employers, not this specific demo collection.
