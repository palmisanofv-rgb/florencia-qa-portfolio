import { test, expect } from '@playwright/test';

// One real E2E flow: home -> search -> select flight -> purchase -> confirmation.
// Covers TC-01 through TC-04.
test('a customer searches, books, and pays for a flight', async ({ page }) => {
  await page.goto('/');
  await page.selectOption('select[name="fromPort"]', 'Boston');
  await page.selectOption('select[name="toPort"]', 'London');
  await page.getByText('Find Flights').click();

  await expect(page.getByText('Choose This Flight').first()).toBeVisible();
  await page.getByText('Choose This Flight').first().click();

  await expect(page.getByText('has been reserved')).toBeVisible();

  // TC-04 finding: this heading is hardcoded regardless of the real route
  // searched (Boston -> London) - documented as a real, reproducible finding,
  // not silently ignored.
  const reservedHeading = await page.locator('h2').first().textContent();
  console.log(`Finding: purchase-page heading reads "${reservedHeading}" despite searching Boston -> London`);

  await page.fill('#inputName', 'QA Portfolio');
  await page.fill('#address', '123 Test St');
  await page.fill('#city', 'San Francisco');
  await page.fill('#state', 'CA');
  await page.fill('#zipCode', '94107');
  await page.selectOption('#cardType', 'visa');
  await page.fill('#creditCardNumber', '4111111111111111');
  await page.fill('#creditCardMonth', '12');
  await page.fill('#creditCardYear', '2026');
  await page.fill('#nameOnCard', 'QA Portfolio');
  await page.getByText('Purchase Flight').click();

  await expect(page.getByText('Thank you for your purchase today!')).toBeVisible();
});
