import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeader: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeader = page.getByText('Searched Products');
    this.productCards = page.locator('.product-image-wrapper');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  addToCartByProductId(productId: number): Locator {
    return this.page.locator(`a[data-product-id="${productId}"].add-to-cart`);
  }

  async continueShopping() {
    await this.page.getByText('Continue Shopping').click();
  }
}
