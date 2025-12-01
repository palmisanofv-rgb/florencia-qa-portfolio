import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// TC-07/TC-08: one real end-to-end purchase journey.
test('standard_user adds two products and completes checkout', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addToCartBySlug('sauce-labs-backpack');
  await inventory.waitForBadgeCount(1);
  await inventory.addToCartBySlug('sauce-labs-bike-light');
  await inventory.waitForBadgeCount(2);

  await inventory.goToCart();
  await expect(page.locator('.cart_item')).toHaveCount(2);

  await checkout.checkoutButton.click();
  await checkout.fillInformation('Florencia', 'Palmisano', '94107');
  await expect(checkout.summaryTotal).toContainText('Total');
  await checkout.finishButton.click();

  await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
});

// TC-09: negative path - checkout must reject an incomplete order, not just
// display a nice error and let it through anyway.
test('checkout rejects a missing last name', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await inventory.addToCartBySlug('sauce-labs-backpack');
  await inventory.waitForBadgeCount(1);
  await inventory.goToCart();

  await checkout.checkoutButton.click();
  await checkout.fillInformation('Florencia', '', '94107');

  await expect(checkout.errorMessage).toHaveText('Error: Last Name is required');
});
