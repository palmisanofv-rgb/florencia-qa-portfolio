> **Note:** this is a sample bug report used to demonstrate reporting format and level of detail — it is not a live defect filed against automationexercise.com.

# BUG-EXAMPLE-001 — Cart total not recalculated after removing a product

| Field | Value |
|-------|-------|
| **Severity** | High |
| **Priority** | P2 |
| **Status** | Example / Template |
| **Environment** | Chrome 126, Windows 10, `https://automationexercise.com/view_cart` |
| **Reported by** | Florencia Palmisano |

## Summary
After removing a product from the cart, the "Total Price" column for the remaining line item is not recalculated on the visible page until a manual refresh, which can mislead a user into overpaying/underpaying if the confirmation step relies on the on-screen total.

## Steps to Reproduce
1. Add two different products to the cart with quantity 1 each.
2. Go to **View Cart**.
3. Note the total price for each row and the (implicit) grand total.
4. Click the remove ("X") icon on the first row.
5. Observe the remaining row's total and the page state without reloading.

## Expected Result
The remaining row's total and any grand total shown update immediately, reflecting only the remaining item(s).

## Actual Result
The removed row disappears correctly, but the remaining total is not visibly recalculated/re-rendered until the page is refreshed — a user proceeding straight to checkout could act on stale totals.

## Evidence
_(In a real report: screenshot or screen recording attached here, plus browser console/network log if relevant.)_

## Impact
Medium-high: affects trust in pricing at the exact moment the user is about to pay. Does not block checkout, but is a usability/data-integrity risk.

## Suggested Fix
Re-render the cart summary component after any cart mutation (add/remove/update quantity) instead of relying on a full page reload.
