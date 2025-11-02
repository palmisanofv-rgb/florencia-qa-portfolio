import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

// Not an assertion-bearing test - this just captures real screenshots of the
// live site for the portfolio's README, so evidence in the repo is an actual
// screenshot from a CI run against automationexercise.com, not a mockup.
// The cart screenshot is best-effort: it occasionally hits the same
// intermittent slowness documented in ../../README.md, and a missing bonus
// screenshot shouldn't fail the whole suite the way a real assertion should.
test('capture evidence screenshots for the README', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: '../evidence/01-home.png', fullPage: false });

  const products = new ProductsPage(page);
  await products.goto();
  await products.search('Dress');
  await page.screenshot({ path: '../evidence/02-search-results.png', fullPage: false });

  try {
    await products.goto();
    await products.addToCartByProductId(1).click({ timeout: 10000 });
    await products.continueShopping();
    await page.getByText('View Cart').click();
    await page.screenshot({ path: '../evidence/03-cart.png', fullPage: false });
  } catch {
    console.log('Cart evidence screenshot skipped (site was slow to respond this run).');
  }
});
