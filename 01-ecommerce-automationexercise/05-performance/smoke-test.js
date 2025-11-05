import http from 'k6/http';
import { check, sleep } from 'k6';

// Light smoke test, not a stress test - 5 virtual users, 30s, against a public
// sandbox. See ../../00-qa-strategy-and-leadership for why load testing in this
// portfolio always stays deliberately light against third-party sites.
export const options = {
  vus: 5,
  duration: '30s',
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

  const search = http.post(`${BASE_URL}/api/searchProduct`, { search_product: 'top' });
  check(search, {
    'searchProduct status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
