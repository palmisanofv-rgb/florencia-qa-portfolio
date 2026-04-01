# Test Plan — Parabank

## Scope

- Customer registration
- Login (valid/invalid)
- Fund transfer between own accounts
- Account overview balance correctness after a transfer

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Transfer debits source account but doesn't credit destination (or vice versa) | Low | Critical | Balance assertion on **both** accounts before/after transfer, not just a success message |
| Transfer of a negative or zero amount is accepted | Medium | High | Negative test cases with `0` and `-100` |
| Registration accepts a duplicate username | Low | Medium | Negative test re-registering an existing username |
| UI shows a stale balance (cache) after transfer | Medium | Medium | Force a page reload before re-reading the balance |

## Strategy

Because this is a banking app, the highest-value assertion isn't "the success message appeared" — it's **arithmetic correctness of account balances**. Every transfer test captures both account balances before the transfer and asserts `to_balance_after == to_balance_before + amount` and `from_balance_after == from_balance_before - amount`, not just a happy-path success banner.

## Exit Criteria

- Registration, login and transfer suites green
- No transfer test relies solely on a success banner without a balance assertion
