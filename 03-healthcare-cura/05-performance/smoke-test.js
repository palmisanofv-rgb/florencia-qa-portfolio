import http from 'k6/http';
import { check, sleep } from 'k6';

// Light smoke test (5 VUs, 20s) on the home and login pages - a legacy system
// like this one is rarely under heavy load, so this checks baseline
// responsiveness rather than capacity.
export const options = {
  vus: 5,
  duration: '20s',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const home = http.get('https://katalon-demo-cura.herokuapp.com/');
  check(home, { 'home page loads': (r) => r.status === 200 });

  const login = http.get('https://katalon-demo-cura.herokuapp.com/profile.php');
  check(login, { 'login page loads': (r) => r.status === 200 });

  sleep(1);
}
