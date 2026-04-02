import http from 'k6/http';
import { check, sleep } from 'k6';

// Light smoke test (5 VUs, 20s) against the real public REST API.
export const options = {
  vus: 5,
  duration: '20s',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://parabank.parasoft.com/parabank/services/bank/accounts/12345', {
    headers: { Accept: 'application/json' },
  });
  check(res, {
    'account lookup returns 200': (r) => r.status === 200,
    'response has an account id': (r) => JSON.parse(r.body).id !== undefined,
  });
  sleep(1);
}
