import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addToCartBySlug(slug: string) {
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async waitForBadgeCount(expected: number) {
    await this.page.waitForFunction(
      (n) => document.querySelector('.shopping_cart_badge')?.textContent === String(n),
      expected,
    );
  }
}
