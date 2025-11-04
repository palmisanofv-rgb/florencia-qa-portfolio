# Traceability Matrix — 26 scenarios published by automationexercise.com

Scenario names as published by the site itself at `/test_cases`. Maps every official scenario to a test case in [`test-cases.csv`](test-cases.csv) or marks it as covered exploratorily.

| # | Scenario | Priority | Coverage |
|---|----------|----------|----------|
| 1 | Register User | P1 | TC-01 (automated) |
| 2 | Login User with correct email and password | P1 | TC-02 (automated) |
| 3 | Login User with incorrect email and password | P1 | TC-03 (automated) |
| 4 | Logout User | P2 | TC-04 (manual) |
| 5 | Register User with existing email | P2 | TC-05 (manual) |
| 6 | Contact Us Form | P2 | TC-06 (manual) |
| 7 | Verify Test Cases Page | P3 | Exploratory |
| 8 | Verify All Products and product detail page | P2 | Exploratory |
| 9 | Search Product | P1 | TC-07 (automated) |
| 10 | Verify Subscription in home page | P3 | Exploratory |
| 11 | Verify Subscription in Cart page | P3 | Exploratory |
| 12 | Add Products in Cart | P1 | TC-08 (automated) |
| 13 | Verify Product quantity in Cart | P2 | TC-09 (automated) |
| 14 | Place Order: Register while Checkout | P1 | Exploratory |
| 15 | Place Order: Register before Checkout | P1 | TC-11 (manual) |
| 16 | Place Order: Login before Checkout | P1 | TC-12 (manual) |
| 17 | Remove Products From Cart | P2 | TC-10 (manual) |
| 18 | View Category Products | P3 | Exploratory |
| 19 | View & Cart Brand Products | P3 | Exploratory |
| 20 | Search Products and Verify Cart After Login | P2 | Exploratory |
| 21 | Add review on product | P3 | Exploratory |
| 22 | Add to cart from Recommended items | P3 | Exploratory |
| 23 | Verify address details in checkout page | P1 | Exploratory |
| 24 | Download Invoice after purchase order | P2 | Exploratory |
| 25 | Verify Scroll Up using 'Arrow' button | P3 | Exploratory |
| 26 | Verify Scroll Up without 'Arrow' button | P3 | Exploratory |

**Automation ratio on P1 scenarios:** 6/8 P1 scenarios automated end-to-end via a single Playwright journey (see [`../03-automation`](../03-automation)); checkout (scenarios 14–16) is intentionally kept manual since it exercises a simulated, non-idempotent payment form.
