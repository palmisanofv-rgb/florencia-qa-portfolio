import http from 'k6/http';
import { check, sleep } from 'k6';

// Light smoke test, not a stress test - staged ramp up/steady/down against a
// public sandbox, deliberately capped at 8 VUs. See
// ../../00-qa-strategy-and-leadership for why load testing in this portfolio
// always stays deliberately light against third-party sites - BlazeDemo's
// own performance project (05-travel-blazedemo) documents this same sandbox
// hitting real rate limiting after repeated back-to-back runs.
export const options = {
  stages: [
    { duration: '10s', target: 8 }, // ramp up
    { duration: '20s', target: 8 }, // steady state
    { duration: '10s', target: 0 }, // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
    http_req_failed: ['rate<0.01'],    // less than 1% errors
  },
};

const BASE_URL = 'https://automationexercise.com';

export default function () {
  const productsList = http.get(`${BASE_URL}/api/productsList`);
  check(productsList, {
    'productsList status is 200': (r) => r.status === 200,
    'productsList has products array': (r) => JSON.parse(r.body).products !== undefined,
  });

  const brandsList = http.get(`${BASE_URL}/api/brandsList`);
  check(brandsList, {
    'brandsList status is 200': (r) => r.status === 200,
    'brandsList has brands array': (r) => JSON.parse(r.body).brands !== undefined,
  });

  const search = http.post(`${BASE_URL}/api/searchProduct`, { search_product: 'top' });
  check(search, {
    'searchProduct status is 200': (r) => r.status === 200,
  });

  // Read-only auth-boundary check under load, not a mutation - confirms the
  // login endpoint's 404-on-unknown-user behavior holds up under concurrent
  // traffic too, not just in isolation.
  const verifyLogin = http.post(`${BASE_URL}/api/verifyLogin`, {
    email: `nonexistent.${Date.now()}.${__VU}@example.com`,
    password: 'whatever',
  });
  check(verifyLogin, {
    'verifyLogin (unknown user) status is 200': (r) => r.status === 200,
    'verifyLogin (unknown user) responseCode is 404': (r) => JSON.parse(r.body).responseCode === 404,
  });

  sleep(1);
}
