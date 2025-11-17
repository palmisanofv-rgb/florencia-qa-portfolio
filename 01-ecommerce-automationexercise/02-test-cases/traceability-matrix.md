# Traceability Matrix — 26 scenarios published by automationexercise.com

Scenario names as published by the site itself at `/test_cases`. Maps every official scenario to a test case in [`test-cases.csv`](test-cases.csv) or marks it as covered exploratorily.

| # | Scenario | Priority | Coverage |
|---|----------|----------|----------|
| 1 | Register User | P1 | TC-01 (automated) |
| 2 | Login User with correct email and password | P1 | TC-02 (automated) |
| 3 | Login User with incorrect email and password | P1 | TC-03 (automated) |
| 4 | Logout User | P2 | TC-04 (automated) |
| 5 | Register User with existing email | P2 | TC-05 (manual) |
| 6 | Contact Us Form | P2 | TC-06 (manual) |
| 7 | Verify Test Cases Page | P3 | TC-13 (automated) |
| 8 | Verify All Products and product detail page | P2 | TC-14 (automated) |
| 9 | Search Product | P1 | TC-07 (automated) |
| 10 | Verify Subscription in home page | P3 | TC-15 (automated) |
| 11 | Verify Subscription in Cart page | P3 | TC-16 (automated) |
| 12 | Add Products in Cart | P1 | TC-08 (automated) |
| 13 | Verify Product quantity in Cart | P2 | TC-09 (automated) |
| 14 | Place Order: Register while Checkout | P1 | TC-17 (manual) |
| 15 | Place Order: Register before Checkout | P1 | TC-11 (manual) |
| 16 | Place Order: Login before Checkout | P1 | TC-12 (manual) |
| 17 | Remove Products From Cart | P2 | TC-10 (manual) |
| 18 | View Category Products | P3 | TC-18 (automated) |
| 19 | View & Cart Brand Products | P3 | TC-19 (automated) |
| 20 | Search Products and Verify Cart After Login | P2 | TC-20 (automated) |
| 21 | Add review on product | P3 | TC-21 (automated) |
| 22 | Add to cart from Recommended items | P3 | TC-22 (automated) |
| 23 | Verify address details in checkout page | P1 | TC-23 (manual) |
| 24 | Download Invoice after purchase order | P2 | TC-24 (manual) |
| 25 | Verify Scroll Up using 'Arrow' button | P3 | TC-25 (manual) |
| 26 | Verify Scroll Up without 'Arrow' button | P3 | TC-26 (manual) |

**Automation ratio on P1 scenarios:** 5/9 P1 scenarios automated end-to-end. The P1 count grew from 7 to 9 this sprint (TC-17 and TC-23 were formalized as P1, matching the existing checkout-variant scenarios), and all 4 unautomated P1s are checkout/payment variants (scenarios 14, 15, 16, 23) kept manual since they exercise a simulated, non-idempotent payment form — see [`../01-planning-strategy/test-strategy.md`](../01-planning-strategy/test-strategy.md) §3. The ratio looking flat rather than improved is the correct picture, not a rounding artifact: this sprint's automation gains landed on P2/P3 scenarios (TC-04, TC-13 through TC-22), not on the P1 checkout path, which is exactly what §3's "deliberate, not automated by default" reasoning predicts.
**Overall automation ratio:** 16/26 scenarios automated (up from 6/26 before this pass). See [`../03-automation`](../03-automation).
