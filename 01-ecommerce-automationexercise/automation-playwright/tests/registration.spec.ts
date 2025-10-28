import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// TC-01 — Register User (see ../../manual-testing/test-cases.md)
test('registers a new user and deletes the account (teardown)', async ({ page }) => {
  const login = new LoginPage(page);
  const uniqueEmail = `qa.${Date.now()}@example.com`;

  await login.goto();
  await expect(page.getByText('New User Signup!')).toBeVisible();
  await login.startSignup('QA Portfolio', uniqueEmail);

  await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();

  await page.locator('#id_gender1').check();
  await page.locator('#password').fill('P@ssw0rd123');
  await page.locator('#days').selectOption('10');
  await page.locator('#months').selectOption('5');
  await page.locator('#years').selectOption('1995');
  await page.locator('#first_name').fill('QA');
  await page.locator('#last_name').fill('Portfolio');
  await page.locator('#address1').fill('123 Test St');
  await page.locator('#country').selectOption('United States');
  await page.locator('#state').fill('CA');
  await page.locator('#city').fill('San Francisco');
  await page.locator('#zipcode').fill('94107');
  await page.locator('#mobile_number').fill('5555555555');

  await page.locator('[data-qa="create-account"]').click();
  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();

  await page.locator('[data-qa="continue-button"]').click();
  await expect(login.loggedInAs).toBeVisible();

  // Teardown: this is a shared public sandbox — never leave test accounts behind.
  await page.locator('a[href="/delete_account"]').click();
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
});
