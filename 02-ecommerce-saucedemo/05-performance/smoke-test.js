import http from 'k6/http';
import { check, sleep } from 'k6';

// Swag Labs has no backend API - this checks static asset delivery performance
// (the page shell + JS bundle), which is the only "backend" there is to load-test.
export const options = {
  vus: 5,
  duration: '20s',
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://www.saucedemo.com/');
  check(res, {
    'home page loads with 200': (r) => r.status === 200,
    'page contains the app root': (r) => r.body.includes('root'),
  });
  sleep(1);
}
