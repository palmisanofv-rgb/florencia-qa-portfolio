import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { createAccountViaApi, deleteAccountViaApi, uniqueEmail } from '../helpers/account';

// Not assertion-bearing - captures one real screenshot per test case in
// ../../02-test-cases/test-cases.csv, saved to ../06-evidence/. Each step is
// wrapped so one flaky step doesn't cost the rest of the evidence set - this
// test's only job is capturing images, not asserting correctness (that's what
// customer-purchase-journey.spec.ts, login-security.spec.ts,
// catalog-and-engagement.spec.ts, and cart-persistence.spec.ts are for).
test('capture one evidence screenshot per test case', async ({ page, request }) => {
  const shoot = (name: string) => page.screenshot({ path: `../06-evidence/${name}.png`, fullPage: false });
  const step = async (name: string, fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (e) {
      console.log(`Evidence step "${name}" skipped: ${(e as Error).message}`);
    }
  };

  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const home = new HomePage(page);
  const detail = new ProductDetailPage(page);
  const cart = new CartPage(page);
  const email = `qa.${Date.now()}@example.com`;
  const password = 'P@ssw0rd123';

  await step('TC-01', async () => {
    await login.goto();
    await shoot('tc01-signup-form');
    await login.startSignup('QA Portfolio', email);
    await page.locator('#id_gender1').check();
    await page.locator('#password').fill(password);
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
    await shoot('tc01-account-created');
    await page.locator('[data-qa="continue-button"]').click();
    await shoot('tc02-logged-in-session');
  });

  await step('TC-04', async () => {
    await login.logout();
    await shoot('tc04-logged-out');
  });

  await step('TC-03', async () => {
    await login.goto();
    await login.login(email, 'wrong-password');
    await shoot('tc03-invalid-login-error');
  });

  await step('TC-05', async () => {
    await login.goto();
    await login.startSignup('QA Portfolio 2', email);
    await shoot('tc05-duplicate-email-error');
  });

  await step('TC-06', async () => {
    await page.goto('/contact_us');
    await shoot('tc06-contact-us-form');
  });

  await step('TC-07', async () => {
    await products.goto();
    await products.search('Dress');
    await shoot('tc07-search-results');
  });

  await step('TC-08', async () => {
    await products.goto();
    await products.addToCartByProductId(1).click();
    await products.continueShopping();
    await products.addToCartByProductId(2).click();
    await page.getByText('View Cart').click();
    await shoot('tc08-cart-with-two-products');
  });

  await step('TC-09', async () => {
    await page.goto('/product_details/1');
    await page.locator('#quantity').fill('4');
    await shoot('tc09-quantity-set-to-4');
  });

  await step('TC-13', async () => {
    await page.goto('/test_cases');
    await shoot('tc13-test-cases-page');
  });

  await step('TC-14', async () => {
    await detail.goto(1);
    await shoot('tc14-product-detail-page');
  });

  await step('TC-15', async () => {
    await home.goto();
    await home.subscribe(uniqueEmail('sub-home'));
    await shoot('tc15-subscribe-home-success');
  });

  await step('TC-16', async () => {
    await cart.goto();
    await home.subscribe(uniqueEmail('sub-cart'));
    await shoot('tc16-subscribe-cart-success');
  });

  await step('TC-18', async () => {
    await products.gotoCategory(1);
    await shoot('tc18-category-dress-products');
  });

  await step('TC-19', async () => {
    await products.gotoBrand('Polo');
    await shoot('tc19-brand-polo-products');
  });

  await step('TC-20', async () => {
    const guestCart = new CartPage(page);
    await products.goto();
    await products.addToCartByProductId(1).click();
    await page.getByText('View Cart').click();
    const account = await createAccountViaApi(request);
    await login.goto();
    await login.login(account.email, account.password);
    await guestCart.goto();
    await shoot('tc20-cart-persists-after-login');
    await deleteAccountViaApi(request, account);
  });

  await step('TC-21', async () => {
    await detail.goto(1);
    await detail.submitReview('QA Portfolio', uniqueEmail(), 'Solid product, accurate description.');
    await shoot('tc21-review-submitted');
  });

  await step('TC-22', async () => {
    await home.goto();
    await home.recommendedItems.scrollIntoViewIfNeeded();
    await home.recommendedAddToCart().click();
    await page.getByText('View Cart').click();
    await shoot('tc22-recommended-item-in-cart');
  });

  await step('home-page', async () => {
    await page.goto('/');
    await shoot('home-page');
  });

  // Cleanup - always try to delete the account this run created, regardless of
  // which steps above succeeded.
  await request.delete('https://automationexercise.com/api/deleteAccount', { form: { email, password } });
});
