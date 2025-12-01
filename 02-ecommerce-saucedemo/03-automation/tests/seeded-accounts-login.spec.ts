import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

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
