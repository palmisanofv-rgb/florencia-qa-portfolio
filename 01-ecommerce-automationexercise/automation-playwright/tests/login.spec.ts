import { test, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// TC-02/03/04 — Login (correct/incorrect credentials) & Logout.
// Test data is seeded via the public API (faster and more reliable than doing
// registration through the UI for every test) and torn down the same way.

const password = 'P@ssw0rd123';
let email: string;

async function createAccount(request: APIRequestContext) {
  email = `qa.${Date.now()}@example.com`;
  const res = await request.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: 'QA Portfolio',
      email,
      password,
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1995',
      firstname: 'QA',
      lastname: 'Portfolio',
      company: 'Portfolio Inc',
      address1: '123 Test St',
      address2: '',
      country: 'United States',
      zipcode: '94107',
      state: 'CA',
      city: 'San Francisco',
      mobile_number: '5555555555',
    },
  });
  const body = await res.json();
  expect(body.responseCode).toBe(201);
}

async function deleteAccount(request: APIRequestContext) {
  await request.delete('https://automationexercise.com/api/deleteAccount', {
    form: { email, password },
  });
}

test.describe('Login / Logout', () => {
  test.beforeEach(async ({ request }) => {
    await createAccount(request);
  });

  test.afterEach(async ({ request }) => {
    await deleteAccount(request);
  });

  test('logs in with correct credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(email, password);
    await expect(login.loggedInAs).toBeVisible();
  });

  test('rejects incorrect credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(email, 'wrong-password');
    await expect(login.loginError).toBeVisible();
    await expect(login.loggedInAs).not.toBeVisible();
  });

  test('logs out and returns to the login page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(email, password);
    await expect(login.loggedInAs).toBeVisible();
    await login.logout();
    await expect(page.getByText('Login to your account')).toBeVisible();
  });
});
