import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

// Not a assertion-bearing test - this just captures real screenshots of the
// live site for the portfolio's README, so evidence in the repo is an actual
// screenshot from a CI run against automationexercise.com, not a mockup.
test('capture evidence screenshots for the README', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: '../../evidence/01-home.png', fullPage: false });

  const products = new ProductsPage(page);
  await products.goto();
  await products.search('Dress');
  await page.screenshot({ path: '../../evidence/02-search-results.png', fullPage: false });

  await products.goto();
  await products.addToCartByProductId(1).click();
  await products.continueShopping();
  await page.getByText('View Cart').click();
  await page.screenshot({ path: '../../evidence/03-cart.png', fullPage: false });
});
