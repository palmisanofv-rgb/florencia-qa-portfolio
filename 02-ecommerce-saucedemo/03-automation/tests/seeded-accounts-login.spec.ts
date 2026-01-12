import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// TC-01 through TC-06: the same login flow against all 6 seeded accounts, not
// just the clean one - see ../../01-planning-strategy/test-strategy.md for why
// this matters more than it looks like it should.
const accounts: { user: string; expectSuccess: boolean }[] = [
  { user: 'standard_user', expectSuccess: true },
  { user: 'locked_out_user', expectSuccess: false },
  { user: 'problem_user', expectSuccess: true },
  { user: 'performance_glitch_user', expectSuccess: true },
  { user: 'error_user', expectSuccess: true },
  { user: 'visual_user', expectSuccess: true },
];

for (const { user, expectSuccess } of accounts) {
  test(`login outcome for ${user} matches expectation`, async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(user, 'secret_sauce');

    if (expectSuccess) {
      await expect(page).toHaveURL(/inventory\.html/);
    } else {
      await expect(login.errorMessage).toContainText('locked out');
    }
  });
}

// Sprint 1's residual-risk note flagged that login success alone doesn't
// distinguish problem_user/performance_glitch_user from a healthy account -
// these two tests close that gap with real, verified assertions instead of
// just widening the login loop above.
test('problem_user has its documented seeded defect: every product image is the same broken placeholder', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  await login.goto();
  await login.login('problem_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);

  const srcs = await inventory.productImageSrcs();
  const uniqueSrcs = new Set(srcs);

  // Confirmed live before writing this assertion: standard_user's inventory
  // page has 6 distinct product image URLs; problem_user's has all 6 items
  // pointing at the exact same "sl-404" placeholder image. Asserting this
  // AS the current (broken) behavior - not asserting the healthy behavior
  // and letting it silently fail - documents the known seeded defect the
  // way this portfolio documents every other "accepted, currently broken"
  // behavior (e.g. Parabank's invalid-password finding).
  expect(uniqueSrcs.size, 'problem_user is expected to show 1 repeated broken image, not distinct product photos').toBe(1);
});

test('performance_glitch_user logs in, but measurably slower than a healthy account', async ({ page }) => {
  const login = new LoginPage(page);

  const standardStart = Date.now();
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);
  const standardDuration = Date.now() - standardStart;

  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  const glitchStart = Date.now();
  await login.goto();
  await login.login('performance_glitch_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/, { timeout: 15000 });
  const glitchDuration = Date.now() - glitchStart;

  console.log(`standard_user login: ${standardDuration}ms, performance_glitch_user login: ${glitchDuration}ms`);

  // The seeded delay is real and intentional (Sauce Labs' own documentation
  // frames this account as a deliberate performance-testing fixture), so
  // the point isn't "this should be fast" - it's confirming the account
  // still authenticates successfully within a generous bound, and logging
  // the real gap for anyone reading CI output rather than asserting a
  // specific millisecond figure that would make this test brittle.
  expect(glitchDuration, 'performance_glitch_user should still complete login well within a generous 15s bound').toBeLessThan(15000);
  expect(glitchDuration, 'performance_glitch_user is expected to be measurably slower than standard_user - if this ever stops being true, the seeded fixture itself has changed').toBeGreaterThan(standardDuration);
});
