import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly testCasesLink: Locator;
  readonly recommendedItems: Locator;
  readonly subscribeEmail: Locator;
  readonly subscribeButton: Locator;
  readonly subscribeSuccess: Locator;

  constructor(page: Page) {
    this.page = page;
    // The real nav label has a leading space in the DOM (" Test Cases");
    // matching by href avoids a brittle whitespace-sensitive text selector.
    // Scoped to the top nav specifically - a raw a[href="/test_cases"]
    // selector also matches 3 unrelated "test_cases_list"-class promo
    // buttons elsewhere on the home page (the hero banner renders twice,
    // once per responsive breakpoint, both present in the DOM at once).
    this.testCasesLink = page.locator('.nav a[href="/test_cases"]');
    this.recommendedItems = page.locator('.recommended_items');
    // #susbscribe_email is the site's own (misspelled) id - not a typo here.
    this.subscribeEmail = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscribeSuccess = page.locator('#success-subscribe');
  }

  async goto() {
    await this.page.goto('/');
  }

  async subscribe(email: string) {
    await this.subscribeEmail.fill(email);
    await this.subscribeButton.click();
  }

  recommendedAddToCart(): Locator {
    // The carousel renders 2 "item" slides at once (one hidden, one
    // ".item active") - a plain .add-to-cart.first() intermittently grabs
    // a link inside the *hidden* slide, which Playwright then waits on
    // forever since it's never actionable. Scoped to the active slide.
    return this.recommendedItems.locator('.item.active .add-to-cart').first();
  }

  private async expandAndClickSubCategory(topLevel: string, sub: string) {
    await this.page.locator(`a[href="#${topLevel}"]`).click();
    // Scoped to the panel's own id (e.g. #Women) rather than the whole
    // #accordian, because two top-level categories (Women, Kids) both have
    // a "Dress" sub-category - searching the whole accordion hits a
    // strict-mode violation on that shared label.
    await this.page.locator(`#${topLevel}`).getByRole('link', { name: sub, exact: true }).click();
  }

  async openCategory(topLevel: string, sub: string) {
    await this.expandAndClickSubCategory(topLevel, sub);
    // Same ad-interstitial behavior as ProductsPage.openFirstProduct - a
    // reload clears it, but also re-collapses the accordion, so the retry
    // has to re-expand the panel rather than just re-clicking the sub-link.
    if (this.page.url().includes('google_vignette')) {
      await this.page.goto('/');
      await this.expandAndClickSubCategory(topLevel, sub);
    }
  }
}
