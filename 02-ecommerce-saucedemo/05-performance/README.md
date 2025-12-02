# Performance — k6

Light smoke test on static asset delivery (5 virtual users, 20s) — there's no backend API to load-test on this app, so this checks page-shell load performance instead.

```bash
k6 run smoke-test.js
```
