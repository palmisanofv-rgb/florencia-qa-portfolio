import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// TC-10: asserts the actual resulting order, not just "no error was thrown"
// when the sort dropdown is changed - the same "assert the real state"
// principle this portfolio applies everywhere else.
test('sorting by price (low to high) actually reorders the product list ascending', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);

  await inventory.sortBy('lohi');
  const prices = await inventory.productPrices();

  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices, `expected ascending order, got ${JSON.stringify(prices)}`).toEqual(sorted);
});
