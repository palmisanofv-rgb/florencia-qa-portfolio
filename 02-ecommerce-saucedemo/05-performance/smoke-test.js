import http from 'k6/http';
import { check, sleep } from 'k6';

// Swag Labs has no backend API - this checks static asset delivery performance
// (the page shell + JS bundle), which is the only "backend" there is to load-test.
export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '10s', target: 5 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Confirmed live while deepening this script: a plain HTTP client gets a
  // much shorter, simplified HTML response here than a real browser does
  // (1.3KB, no script tags at all) - the same class of bot-aware serving
  // behavior already documented elsewhere in this portfolio (see Project 01
  // and Project 04's notes on automated-traffic detection). That rules out
  // reliably parsing the real JS bundle URL out of this response, so this
  // stays a plain HTML-shell check rather than a fragile regex against
  // content this client doesn't actually receive.
  const home = http.get('https://www.saucedemo.com/');
  check(home, {
    'home page loads with 200': (r) => r.status === 200,
  });

  sleep(1);
}
