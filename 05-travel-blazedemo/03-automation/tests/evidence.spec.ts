import { test } from '@playwright/test';

test('capture one evidence screenshot per test case', async ({ page }) => {
  const shoot = (name: string) => page.screenshot({ path: `../06-evidence/${name}.png`, fullPage: false });
  const step = async (name: string, fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (e) {
      console.log(`Evidence step "${name}" skipped: ${(e as Error).message}`);
    }
  };

  await step('TC-01', async () => {
    await page.goto('/');
    await shoot('tc01-home-search-form');
    await page.selectOption('select[name="fromPort"]', 'Boston');
    await page.selectOption('select[name="toPort"]', 'London');
    await page.getByText('Find Flights').click();
    await shoot('tc01-flight-results');
  });

  await step('TC-02', async () => {
    await page.getByText('Choose This Flight').first().click();
    await shoot('tc02-purchase-page');
  });

  await step('TC-03-and-04', async () => {
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
    await shoot('tc03-billing-form-filled');
    await page.getByText('Purchase Flight').click();
    await shoot('tc03-confirmation-thank-you');
  });
});
