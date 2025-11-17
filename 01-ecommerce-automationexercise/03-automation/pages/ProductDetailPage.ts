import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly info: Locator;
  readonly productName: Locator;
  readonly writeReviewTab: Locator;
  readonly reviewName: Locator;
  readonly reviewEmail: Locator;
  readonly reviewText: Locator;
  readonly reviewSubmit: Locator;
  readonly reviewSuccess: Locator;

  constructor(page: Page) {
    this.page = page;
    this.info = page.locator('.product-information');
    this.productName = this.info.locator('h2');
    this.writeReviewTab = page.locator('a[href="#reviews"]');
    this.reviewName = page.locator('#name');
    this.reviewEmail = page.locator('#email');
    this.reviewText = page.locator('#review');
    this.reviewSubmit = page.locator('#button-review');
    this.reviewSuccess = page.getByText('Thank you for your review.');
  }

  async goto(productId: number) {
    await this.page.goto(`/product_details/${productId}`);
  }

  async submitReview(name: string, email: string, text: string) {
    await this.writeReviewTab.click();
    await this.reviewName.fill(name);
    await this.reviewEmail.fill(email);
    await this.reviewText.fill(text);
    // Confirmed via a real CI-style run: a Google AdSense ad slot
    // intermittently renders directly over this button and intercepts
    // pointer events entirely (not a timing issue - Playwright's own
    // actionability check reports the ad iframe, not the button, as the
    // element that would receive the click). force:true dispatches the
    // click at the button's coordinates regardless, matching what the
    // button itself would do - but on a real page, a real user landing on
    // this ad placement genuinely could not click Submit either. Worth
    // flagging as a usability finding, not just worked around silently.
    await this.reviewSubmit.click({ force: true, timeout: 10000 });
  }
}
