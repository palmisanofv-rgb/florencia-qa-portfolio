import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

// TC-08 — Add Products in Cart
test('adds two products to the cart with correct prices and totals', async ({ page }) => {
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

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
});

// TC-09 — Verify product quantity in Cart
test('setting quantity to 4 on the detail page is reflected in the cart', async ({ page }) => {
  const cart = new CartPage(page);

  await page.goto('/product_details/1');
  await page.locator('#quantity').fill('4');
  await page.locator('button.cart').click();
  await page.getByText('View Cart').click();

  const quantityCell = cart.cartItems.first().locator('.cart_quantity button');
  await expect(quantityCell).toHaveText('4');
});
