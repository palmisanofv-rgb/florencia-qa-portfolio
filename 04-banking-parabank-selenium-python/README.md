# Project 04 — Banking/Fintech Web | [Parabank](https://parabank.parasoft.com/parabank/index.htm) (Parasoft)

**Domain:** Fintech/Banking | **Primary tools:** Selenium WebDriver + Python + pytest, SQL | **Lifecycle coverage:** Planning → Automation → Backend validation → Reporting

Parabank is Parasoft's own official demo banking application, built specifically to be automated (it explicitly documents its REST/SOAP API for that purpose). A **third** Selenium flavor in this portfolio (Python this time, vs. Java in [Project 02](../02-ecommerce-saucedemo-selenium-java)) — banking is also the highest-stakes domain here, so this project leans harder into data-integrity checks.

## Contents

- [`test-plan.md`](test-plan.md)
- `pages/` — Page Object Model (`login_page.py`, `register_page.py`, `transfer_page.py`, `accounts_overview_page.py`)
- `tests/` — pytest suites: registration, login, fund transfer, balance reconciliation
- `sql/` — a **local, self-contained** SQL data-validation companion (schema + reconciliation queries) demonstrating backend/DB-testing technique — see the note in [`sql/README.md`](sql/README.md) about why this isn't connected to Parabank's real database
- [`report.md`](report.md)

## Running

```bash
pip install -r requirements.txt
pytest -v
```
