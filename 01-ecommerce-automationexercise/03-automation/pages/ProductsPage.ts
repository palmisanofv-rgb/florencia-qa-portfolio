import { Page, Locator } from '@playwright/test';
import { clickThroughAdInterstitial } from '../helpers/navigation';

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeader: Locator;
  readonly productCards: Locator;
  readonly listingHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeader = page.getByText('Searched Products');
    this.productCards = page.locator('.product-image-wrapper');
    // Scoped to h2.title specifically - a bare ".features_items h2" also
    // matches every product card's price heading ("Rs. 1000"), a strict-mode
    // violation confirmed while writing this. h2.title is reused for "All
    // Products", a category header (e.g. "Women -  Dress Products"), and a
    // brand header - it's what actually confirms which listing is showing.
    this.listingHeader = page.locator('.features_items h2.title');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async gotoCategory(categoryId: number) {
    await this.page.goto(`/category_products/${categoryId}`);
  }

  async gotoBrand(brandName: string) {
    await this.page.goto(`/brand_products/${encodeURIComponent(brandName)}`);
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  addToCartByProductId(productId: number): Locator {
    // automationexercise.com renders each product's "Add to cart" link twice in the
    // DOM (a hover overlay + a static footer link) - .first() disambiguates.
    return this.page.locator(`a[data-product-id="${productId}"].add-to-cart`).first();
  }

  async continueShopping() {
    await this.page.getByText('Continue Shopping').click();
  }

  async openFirstProduct() {
    const link = this.productCards.first().locator('a[href^="/product_details/"]');
    await clickThroughAdInterstitial(this.page, link, '/products');
  }
}
