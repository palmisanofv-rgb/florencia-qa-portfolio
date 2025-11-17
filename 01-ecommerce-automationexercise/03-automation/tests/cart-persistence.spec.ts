import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { createAccountViaApi, deleteAccountViaApi, TestAccount } from '../helpers/account';

// TC-20: a guest adds to cart, then logs in - does the site actually merge
// the session, or silently drop the cart? Manually verified against the
// live site before writing this assertion (see sprint-01-report.md): the
// item survives login, so this codifies real, confirmed behavior rather
// than an assumption.
test.describe('Cart persists across login', () => {
  let account: TestAccount;

  test.beforeEach(async ({ request }) => {
    account = await createAccountViaApi(request);
  });

  test.afterEach(async ({ request }) => {
    await deleteAccountViaApi(request, account);
  });

  test('a product added while logged out is still in the cart after logging in', async ({ page }) => {
    const products = new ProductsPage(page);
    const login = new LoginPage(page);
    const cart = new CartPage(page);

    // Add to cart as a guest - no login yet.
    await products.goto();
    await products.addToCartByProductId(1).click();
    await page.getByText('View Cart').click();
    await expect(cart.cartItems).toHaveCount(1);

    // Log in with an account that has never touched this cart.
    await login.goto();
    await login.login(account.email, account.password);
    await expect(login.loggedInAs).toBeVisible();

    // The pre-login cart item must still be there - a silent drop here
    // would be a real defect: a customer would need to re-add everything
    // just because they logged in partway through shopping.
    await cart.goto();
    await expect(cart.cartItems).toHaveCount(1);
  });
});
