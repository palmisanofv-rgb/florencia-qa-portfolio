import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Confirmed via a real CI run: evidence.spec.ts's single test walks ~10
  // sequential real page loads (signup, logout, invalid login, duplicate
  // email, search, cart x2, product details) against the live public site -
  // the default 30s test timeout cut it off mid-run, tearing down the
  // browser context before its own cleanup (deleting the test account via
  // the API) could run.
  timeout: 90 * 1000,
  retries: process.env.CI ? 1 : 0,
  reporter: 'html',
  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
