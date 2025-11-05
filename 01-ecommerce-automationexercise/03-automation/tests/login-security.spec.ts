import { test, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// TC-03: negative-path login is a security concern (auth boundary), not just a
// functional nice-to-have, so it gets its own dedicated E2E test rather than
// being folded into the happy-path journey.
const password = 'P@ssw0rd123';
let email: string;

async function createAccount(request: APIRequestContext) {
  email = `qa.${Date.now()}@example.com`;
  const res = await request.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: 'QA Portfolio', email, password, title: 'Mr',
      birth_date: '10', birth_month: '5', birth_year: '1995',
      firstname: 'QA', lastname: 'Portfolio', company: 'Portfolio Inc',
      address1: '123 Test St', address2: '', country: 'United States',
      zipcode: '94107', state: 'CA', city: 'San Francisco', mobile_number: '5555555555',
    },
  });
  expect((await res.json()).responseCode).toBe(201);
}

async function deleteAccount(request: APIRequestContext) {
  await request.delete('https://automationexercise.com/api/deleteAccount', { form: { email, password } });
}

test.describe('Login security boundary', () => {
  test.beforeEach(async ({ request }) => {
    await createAccount(request);
  });

  test.afterEach(async ({ request }) => {
    await deleteAccount(request);
  });

  test('rejects an incorrect password and never establishes a session', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(email, 'a-completely-wrong-password');
    await expect(login.loginError).toBeVisible();
    await expect(login.loggedInAs).not.toBeVisible();
  });

  test('correct credentials authenticate, and logout actually clears the session', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(email, password);
    await expect(login.loggedInAs).toBeVisible();
    await login.logout();
    await expect(page.getByText('Login to your account')).toBeVisible();
  });
});
