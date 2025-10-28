# API Test Report — DummyJSON

| Area | Scenarios | Status |
|------|-----------|--------|
| Auth | login (valid/invalid), `/auth/me` (valid/malformed token) | All verified against live API |
| Products | search, add, update, delete | All verified — response fields (`price`, `isDeleted`) confirmed via direct HTTP calls |
| Carts | line-item total reconciliation | Verified |

All response shapes in this collection were confirmed against the live API via direct HTTP requests before writing the corresponding Postman test scripts.
