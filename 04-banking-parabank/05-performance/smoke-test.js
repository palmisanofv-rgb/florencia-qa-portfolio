import http from 'k6/http';
import { check, sleep } from 'k6';

// Light smoke test against the real public REST API, staged (not flat) load.
//
// Real bug fixed while deepening this script: it previously hit
// /accounts/12345, an account id that doesn't exist (confirmed live: returns
// 400 "Could not find account #12345", not 200) - so the "returns 200" check
// had been silently failing this whole time. Fixed to use customer 12212's
// real, stable checking account (13344), the same known-good seeded demo
// customer already referenced in security-checks.md's authorization check.
export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '10s', target: 5 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const account = http.get('https://parabank.parasoft.com/parabank/services/bank/accounts/13344', {
    headers: { Accept: 'application/json' },
  });
  check(account, {
    'account lookup returns 200': (r) => r.status === 200,
    'response has an account id': (r) => JSON.parse(r.body).id !== undefined,
  });

  const customerAccounts = http.get('https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts', {
    headers: { Accept: 'application/json' },
  });
  check(customerAccounts, {
    'customer accounts lookup returns 200': (r) => r.status === 200,
    'response is a non-empty array': (r) => JSON.parse(r.body).length > 0,
  });

  sleep(1);
}
