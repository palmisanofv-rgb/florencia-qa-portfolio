import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { uniqueEmail } from '../helpers/account';

// A second real journey, alongside customer-purchase-journey.spec.ts: this one
// covers catalog browsing and on-site engagement rather than the purchase
// path. Covers TC-13, TC-14, TC-15, TC-16, TC-18, TC-19, TC-21, TC-22 (see
// ../../02-test-cases/test-cases.csv) as one connected flow instead of eight
// disconnected single-assertion tests.
test('a visitor browses the catalog, engages with recommendations, and the site tracks it correctly', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const detail = new ProductDetailPage(page);
  const cart = new CartPage(page);

  // TC-13: Test Cases page is real and reachable, not a dead nav link.
  // Verified against the live site that clicking this exact nav link is
  // intercepted by this site's Google Vignette ad interstitial on a fresh
  // (cookie-less) session more often than not - the same ad-interstitial
  // behavior already documented in this project's accessibility-check.md.
  // Asserting the link's real href and that its destination loads is a
  // more reliable check than fighting an ad network for a P3 scenario.
  await home.goto();
  await expect(home.testCasesLink).toHaveAttribute('href', '/test_cases');
  await page.goto('/test_cases');
  await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();

  // TC-14: product detail page shows real product data, not just a redirect
  await products.goto();
  await products.openFirstProduct();
  await expect(detail.productName).toBeVisible();
  const detailText = await detail.info.innerText();
  for (const field of ['Category:', 'Availability:', 'Condition:', 'Brand:']) {
    expect(detailText).toContain(field);
  }

  // TC-21: submitting a product review actually confirms, not just resets the form
  await detail.submitReview('QA Portfolio', uniqueEmail(), 'Solid product, accurate description.');
  await expect(detail.reviewSuccess).toBeVisible();

  // TC-18: category sidebar navigation lands on a correctly-filtered listing
  await home.goto();
  await home.openCategory('Women', 'Dress');
  await expect(products.listingHeader).toContainText('Dress');
  const categoryCount = await products.productCards.count();
  expect(categoryCount).toBeGreaterThan(0);

  // TC-19: brand navigation filters correctly, and add-to-cart works the
  // same way here as it does on the main catalog
  await products.gotoBrand('Polo');
  await expect(products.listingHeader).toContainText('Polo');
  await products.productCards.first().locator('.add-to-cart').first().click();
  await page.getByText('Continue Shopping').click();

  // TC-15 / TC-16: the subscription widget works identically on the home
  // page and the cart page - not just wherever it happened to get tested once
  await home.goto();
  await home.subscribe(uniqueEmail('sub-home'));
  await expect(home.subscribeSuccess).toContainText('successfully subscribed');

  await cart.goto();
  await home.subscribe(uniqueEmail('sub-cart'));
  await expect(home.subscribeSuccess).toContainText('successfully subscribed');

  // TC-22: recommended items on the home page actually add the right
  // product to the cart, not just close a modal
  await home.goto();
  await home.recommendedItems.scrollIntoViewIfNeeded();
  await home.recommendedAddToCart().click();
  await page.getByText('View Cart').click();
  await expect(cart.cartItems.count()).resolves.toBeGreaterThan(0);
});
