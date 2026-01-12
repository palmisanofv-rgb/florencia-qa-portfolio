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

  async productImageSrcs(): Promise<string[]> {
    return this.page.locator('.inventory_item img').evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src')));
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(value);
  }

  async productPrices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allTextContents();
    return texts.map((t) => Number(t.replace(/[^0-9.]/g, '')));
  }
}
