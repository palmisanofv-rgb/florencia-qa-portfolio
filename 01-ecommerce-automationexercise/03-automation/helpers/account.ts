import { APIRequestContext, expect } from '@playwright/test';

// Shared account create/delete helper - used to be duplicated inline in
// login-security.spec.ts and (differently) in customer-purchase-journey's
// UI-driven signup. Any test that only needs a *logged-in account* to exist
// (rather than testing the signup UI itself) should go through this API
// helper instead of re-implementing the same createAccount form fill.
export interface TestAccount {
  email: string;
  password: string;
}

const BASE_URL = 'https://automationexercise.com';

export function uniqueEmail(prefix = 'qa'): string {
  return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 1000)}@example.com`;
}

export async function createAccountViaApi(request: APIRequestContext, overrides: Partial<TestAccount> = {}): Promise<TestAccount> {
  const email = overrides.email ?? uniqueEmail();
  const password = overrides.password ?? 'P@ssw0rd123';

  const res = await request.post(`${BASE_URL}/api/createAccount`, {
    form: {
      name: 'QA Portfolio',
      email,
      password,
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1995',
      firstname: 'QA',
      lastname: 'Portfolio',
      company: 'Portfolio Inc',
      address1: '123 Test St',
      address2: '',
      country: 'United States',
      zipcode: '94107',
      state: 'CA',
      city: 'San Francisco',
      mobile_number: '5555555555',
    },
  });
  expect((await res.json()).responseCode).toBe(201);
  return { email, password };
}

export async function deleteAccountViaApi(request: APIRequestContext, account: TestAccount): Promise<void> {
  // Best-effort cleanup - this is a shared public sandbox, so a test that
  // fails partway through must never leave an orphaned account behind.
  await request.delete(`${BASE_URL}/api/deleteAccount`, {
    form: { email: account.email, password: account.password },
  });
}
