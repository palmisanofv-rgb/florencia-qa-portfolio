import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Not assertion-bearing - one screenshot per test case in ../../02-test-cases.
test('capture one evidence screenshot per test case', async ({ page }) => {
  const shoot = (name: string) => page.screenshot({ path: `../06-evidence/${name}.png`, fullPage: false });
  const step = async (name: string, fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (e) {
      console.log(`Evidence step "${name}" skipped: ${(e as Error).message}`);
    }
  };

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);

  await step('TC-01', async () => {
    await login.goto();
    await shoot('tc01-login-page');
    await login.login('standard_user', 'secret_sauce');
    await shoot('tc01-standard-user-inventory');
  });

  await step('TC-02', async () => {
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await shoot('tc02-locked-out-user-error');
  });

  await step('TC-03', async () => {
    await login.goto();
    await login.login('problem_user', 'secret_sauce');
    await shoot('tc03-problem-user-inventory');
  });

  await step('TC-04-glitch-timing', async () => {
    await login.goto();
    await login.login('performance_glitch_user', 'secret_sauce');
    await shoot('tc04-performance-glitch-user-inventory');
  });

  await step('TC-07-and-08', async () => {
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.addToCartBySlug('sauce-labs-backpack');
    await inventory.waitForBadgeCount(1);
    await inventory.addToCartBySlug('sauce-labs-bike-light');
    await inventory.waitForBadgeCount(2);
    await shoot('tc07-two-items-in-cart-badge');
    await inventory.goToCart();
    await shoot('tc07-cart-page');
    await checkout.checkoutButton.click();
    await checkout.fillInformation('Florencia', 'Palmisano', '94107');
    await shoot('tc08-order-summary');
    await checkout.finishButton.click();
    await shoot('tc08-order-complete');
  });

  await step('TC-09', async () => {
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.addToCartBySlug('sauce-labs-backpack');
    await inventory.waitForBadgeCount(1);
    await inventory.goToCart();
    await checkout.checkoutButton.click();
    await checkout.fillInformation('Florencia', '', '94107');
    await shoot('tc09-missing-last-name-error');
  });

  await step('TC-10', async () => {
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await page.locator('.product_sort_container').selectOption('lohi');
    await shoot('tc10-sorted-low-to-high');
  });
});
