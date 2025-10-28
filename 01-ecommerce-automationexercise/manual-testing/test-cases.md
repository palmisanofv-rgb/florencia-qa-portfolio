# Manual Test Cases — AutomationExercise

Format: ID / Title / Priority / Preconditions / Steps / Expected Result.
Base URL: `https://automationexercise.com`

---

### TC-01 — Register User
**Priority:** P1 | **Type:** Functional | **Automated:** ✅ (`tests/registration.spec.ts`)

**Preconditions:** Email not previously registered.

**Steps:**
1. Navigate to the home page and verify it loads successfully.
2. Click **Signup / Login**.
3. Verify **New User Signup!** is visible.
4. Enter name and a unique email address, click **Signup**.
5. Verify **ENTER ACCOUNT INFORMATION** is visible.
6. Fill title, password, date of birth, address details.
7. Click **Create Account**.
8. Verify **ACCOUNT CREATED!**, click **Continue**.
9. Verify **Logged in as <username>** is visible in the header.
10. Click **Delete Account**, verify **ACCOUNT DELETED!**.

**Expected result:** Account is created, session is authenticated, and teardown (delete) succeeds — no orphaned test data left behind.

---

### TC-02 — Login with correct email and password
**Priority:** P1 | **Type:** Functional | **Automated:** ✅ (`tests/login.spec.ts`)

**Preconditions:** A valid, existing account.

**Steps:**
1. Navigate to home page → **Signup / Login**.
2. Verify **Login to your account** is visible.
3. Enter correct email and password, click **Login**.
4. Verify **Logged in as <username>** is visible.

**Expected result:** User is authenticated and redirected to the home page with the session reflected in the header nav.

---

### TC-03 — Login with incorrect email/password
**Priority:** P1 | **Type:** Negative | **Automated:** ✅ (`tests/login.spec.ts`)

**Steps:**
1. Navigate to **Signup / Login**.
2. Enter an incorrect email/password combination, click **Login**.

**Expected result:** Error message **"Your email or password is incorrect!"** is shown; no session is created.

---

### TC-04 — Logout User
**Priority:** P2 | **Type:** Functional | **Automated:** ✅ (`tests/login.spec.ts`)

**Steps:**
1. Log in with valid credentials.
2. Click **Logout**.

**Expected result:** User is redirected to the login page and the session is cleared (header shows **Signup / Login** again).

---

### TC-05 — Register with an already-registered email
**Priority:** P2 | **Type:** Negative | **Automated:** ❌ manual

**Steps:**
1. Navigate to **Signup / Login**.
2. Enter a name and an email that already has an account.
3. Click **Signup**.

**Expected result:** Error **"Email Address already exist!"** is displayed; no duplicate account is created.

---

### TC-06 — Contact Us form
**Priority:** P2 | **Type:** Functional | **Automated:** ❌ manual (file upload not covered by current automation)

**Steps:**
1. Navigate to **Contact us**.
2. Verify **GET IN TOUCH** is visible.
3. Fill name, email, subject, message.
4. Upload a file.
5. Click **Submit**, accept the confirmation dialog.

**Expected result:** Success message **"Success! Your details have been submitted successfully."** is shown; **Home** button returns to the home page.

---

### TC-07 — Search Product
**Priority:** P1 | **Type:** Functional | **Automated:** ✅ (`tests/product-search.spec.ts`)

**Steps:**
1. Navigate to **Products**.
2. Enter a keyword in the search box, click search.
3. Verify **SEARCHED PRODUCTS** header is visible.

**Expected result:** Only products whose name/description matches the keyword are returned; result count > 0 for a known valid keyword.

---

### TC-08 — Add Products to Cart
**Priority:** P1 | **Type:** Functional | **Automated:** ✅ (`tests/cart.spec.ts`)

**Steps:**
1. Navigate to **Products**.
2. Hover the first product, click **Add to cart**, then **Continue Shopping**.
3. Hover the second product, click **Add to cart**, then **View Cart**.

**Expected result:** Both products appear in the cart page with correct unit price, quantity (1 each), and a total price equal to `price × quantity` summed across rows.

---

### TC-09 — Verify product quantity in Cart
**Priority:** P2 | **Type:** Functional | **Automated:** ✅ (`tests/cart.spec.ts`)

**Steps:**
1. Open a product's detail page.
2. Set quantity to 4.
3. Click **Add to cart**, then **View Cart**.

**Expected result:** Cart shows the product with quantity exactly 4 and a line total of `unit price × 4`.

---

### TC-10 — Remove Products from Cart
**Priority:** P2 | **Type:** Functional | **Automated:** ❌ manual

**Steps:**
1. Add a product to the cart and go to **View Cart**.
2. Click the "X" (remove) icon on that row.

**Expected result:** The row is removed from the cart without a page reload; cart total recalculates immediately.

---

### TC-11 — Place Order: Register before Checkout
**Priority:** P1 | **Type:** Functional (E2E) | **Automated:** ❌ manual (requires simulated payment form — kept manual/exploratory by design, see test plan §1.2)

**Steps:**
1. Register a new account (see TC-01).
2. Add products to cart → **Cart** → **Proceed To Checkout**.
3. Verify address details and order review are correct.
4. Enter an order comment, click **Place Order**.
5. Fill payment details (name, card number, CVC, expiry), click **Pay and Confirm Order**.
6. Verify success message **"Your order has been placed successfully!"**.
7. Delete the account created in step 1.

**Expected result:** Order total on the review screen matches the cart total; success confirmation is shown; account cleanup succeeds.

---

### TC-12 — Place Order: Login before Checkout
**Priority:** P1 | **Type:** Functional (E2E) | **Automated:** ❌ manual (same rationale as TC-11)

**Steps:** Same as TC-11, but starting from an existing account via **Login** instead of **Signup**.

**Expected result:** Same as TC-11 — order confirms successfully for an already-registered user.

---

## Traceability Matrix — full 26-scenario coverage

Scenario names as published by the site at `/test_cases`.

| # | Scenario | Priority | Coverage |
|---|----------|----------|----------|
| 1 | Register User | P1 | Manual (TC-01) + Automated |
| 2 | Login User with correct email and password | P1 | Manual (TC-02) + Automated |
| 3 | Login User with incorrect email and password | P1 | Manual (TC-03) + Automated |
| 4 | Logout User | P2 | Manual (TC-04) + Automated |
| 5 | Register User with existing email | P2 | Manual (TC-05) |
| 6 | Contact Us Form | P2 | Manual (TC-06) |
| 7 | Verify Test Cases Page | P3 | Manual (exploratory) |
| 8 | Verify All Products and product detail page | P2 | Manual (exploratory) |
| 9 | Search Product | P1 | Manual (TC-07) + Automated |
| 10 | Verify Subscription in home page | P3 | Manual (exploratory) |
| 11 | Verify Subscription in Cart page | P3 | Manual (exploratory) |
| 12 | Add Products in Cart | P1 | Manual (TC-08) + Automated |
| 13 | Verify Product quantity in Cart | P2 | Manual (TC-09) + Automated |
| 14 | Place Order: Register while Checkout | P1 | Manual (exploratory) |
| 15 | Place Order: Register before Checkout | P1 | Manual (TC-11) |
| 16 | Place Order: Login before Checkout | P1 | Manual (TC-12) |
| 17 | Remove Products From Cart | P2 | Manual (TC-10) |
| 18 | View Category Products | P3 | Manual (exploratory) |
| 19 | View & Cart Brand Products | P3 | Manual (exploratory) |
| 20 | Search Products and Verify Cart After Login | P2 | Manual (exploratory) |
| 21 | Add review on product | P3 | Manual (exploratory) |
| 22 | Add to cart from Recommended items | P3 | Manual (exploratory) |
| 23 | Verify address details in checkout page | P1 | Manual (exploratory) |
| 24 | Download Invoice after purchase order | P2 | Manual (exploratory) |
| 25 | Verify Scroll Up using 'Arrow' button | P3 | Manual (exploratory) |
| 26 | Verify Scroll Up without 'Arrow' button | P3 | Manual (exploratory) |

**Automation ratio on P1/P2 scenarios:** 8/19 automated end-to-end via Playwright (see [`../automation-playwright`](../automation-playwright)); the remainder are covered manually, with checkout intentionally kept manual since it exercises a simulated (non-idempotent) payment form.
