import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { createAccountViaApi, deleteAccountViaApi, TestAccount } from '../helpers/account';

// TC-03/TC-04: negative-path login and logout are security concerns (auth
// boundary), not just a functional nice-to-have, so they get their own
// dedicated E2E test rather than being folded into the happy-path journey.
test.describe('Login security boundary', () => {
  let account: TestAccount;

  test.beforeEach(async ({ request }) => {
    account = await createAccountViaApi(request);
  });

  test.afterEach(async ({ request }) => {
    await deleteAccountViaApi(request, account);
  });

  test('rejects an incorrect password and never establishes a session', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(account.email, 'a-completely-wrong-password');
    await expect(login.loginError).toBeVisible();
    await expect(login.loggedInAs).not.toBeVisible();
  });

  test('correct credentials authenticate, and logout actually clears the session', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(account.email, account.password);
    await expect(login.loggedInAs).toBeVisible();
    await login.logout();
    await expect(page.getByText('Login to your account')).toBeVisible();
  });
});
