import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

// One real end-to-end customer journey instead of several disconnected,
// single-assertion tests: register -> search -> build a cart -> verify
// pricing -> clean up. Covers TC-01, TC-02, TC-07, TC-08, TC-09
// (see ../../02-test-cases/test-cases.csv).
test('a new customer registers, searches, builds a cart, and the totals are correct', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const uniqueEmail = `qa.${Date.now()}@example.com`;

  // TC-01: Register
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

  // TC-02: registration leaves the user logged in - confirm the session is real
  await expect(login.loggedInAs).toBeVisible();

  // TC-07: Search for a product
  await products.goto();
  await products.search('Dress');
  await expect(products.searchedProductsHeader).toBeVisible();
  const resultCount = await products.productCards.count();
  expect(resultCount).toBeGreaterThan(0);

  // TC-08: Add two products to the cart and verify pricing, not just a success toast
  await products.goto();
  await products.addToCartByProductId(1).click();
  await products.continueShopping();
  await products.addToCartByProductId(2).click();
  await page.getByText('View Cart').click();

  await expect(cart.cartItems).toHaveCount(2);
  for (const row of await cart.cartItems.all()) {
    const price = await row.locator('.cart_price p').textContent();
    const qty = await row.locator('.cart_quantity button').textContent();
    const total = await row.locator('.cart_total_price').textContent();
    const priceNum = Number(price?.replace(/[^0-9.]/g, ''));
    const qtyNum = Number(qty?.trim());
    const totalNum = Number(total?.replace(/[^0-9.]/g, ''));
    expect(totalNum).toBeCloseTo(priceNum * qtyNum, 2);
  }

  // TC-09: quantity set on the detail page carries through to the cart
  await page.goto('/product_details/1');
  await page.locator('#quantity').fill('4');
  await page.locator('button.cart').click();
  await page.getByText('View Cart').click();
  const quantityCell = cart.cartItems.first().locator('.cart_quantity button');
  await expect(quantityCell).toHaveText('4');

  // Teardown - this is a shared public sandbox, never leave test accounts behind
  await page.locator('a[href="/delete_account"]').click();
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
});
