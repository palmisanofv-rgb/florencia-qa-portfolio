# Automation — Selenium WebDriver + Python

- `pages/` — Page Object Model
- `tests/test_login.py` — registration, login, invalid-password rejection
- `tests/test_transfer.py` — transfer with independent balance reconciliation + the $0-transfer finding
- `tests/conftest.py` — driver + `registered_user` + `evidence` fixtures

## Running

```bash
pip install -r requirements.txt
pytest -v
```

See [`../07-reports/sprint-01-report.md`](../07-reports/sprint-01-report.md) for the real debugging history behind every wait/retry pattern in this code — none of it is defensive programming for its own sake.
