import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('#cart_info tbody tr');
    this.cartInfo = page.locator('#cart_info');
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  rowByProductName(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }

  quantityFor(name: string): Locator {
    return this.rowByProductName(name).locator('.cart_quantity button, .cart_quantity');
  }

  totalPriceFor(name: string): Locator {
    return this.rowByProductName(name).locator('.cart_total_price');
  }

  removeButtonFor(name: string): Locator {
    return this.rowByProductName(name).locator('.cart_quantity_delete');
  }
}
