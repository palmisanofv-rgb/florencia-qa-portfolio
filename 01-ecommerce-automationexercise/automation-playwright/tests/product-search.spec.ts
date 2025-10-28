import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

// TC-07 — Search Product
test('searches for a product and returns matching results', async ({ page }) => {
  const products = new ProductsPage(page);
  await products.goto();

  await products.search('Dress');

  await expect(products.searchedProductsHeader).toBeVisible();
  await expect(products.productCards.first()).toBeVisible();

  const count = await products.productCards.count();
  expect(count).toBeGreaterThan(0);
});

test('search with a nonsense keyword returns no products', async ({ page }) => {
  const products = new ProductsPage(page);
  await products.goto();

  await products.search('zzz-nonexistent-product-zzz');

  await expect(products.searchedProductsHeader).toBeVisible();
  await expect(products.productCards).toHaveCount(0);
});
