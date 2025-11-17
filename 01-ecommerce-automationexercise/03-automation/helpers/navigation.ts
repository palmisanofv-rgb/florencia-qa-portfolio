import { Page, Locator } from '@playwright/test';

// Real, confirmed site behavior (not a guess): after a couple of page views
// in the same browser context, automationexercise.com's Google Vignette ad
// network intercepts the next click-driven navigation - the click never
// reaches the underlying link, and the URL gets `#google_vignette` appended
// instead of navigating anywhere. Reproduced directly via a debug script
// before writing this helper. The same interstitial is independently
// documented in this project's accessibility-check.md ("Stray click hit a
// #google_vignette ad interstitial mid-session, cleared with reload").
//
// Fix: reload the current page (which clears the interstitial) and retry
// the click once. This is a third-party ad-network quirk, not a defect in
// the site under test - same disposition as this portfolio's other
// documented third-party flakiness (Parabank's bot-check, BlazeDemo's rate
// limiting).
export async function clickThroughAdInterstitial(page: Page, link: Locator, currentPath: string) {
  await link.click();
  if (page.url().includes('google_vignette')) {
    await page.goto(currentPath);
    await link.click();
  }
}
