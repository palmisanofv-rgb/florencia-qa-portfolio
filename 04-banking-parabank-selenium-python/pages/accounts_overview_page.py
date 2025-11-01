from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait


class AccountsOverviewPage:
    """https://parabank.parasoft.com/parabank/overview.htm"""

    def __init__(self, driver):
        self.driver = driver

    def _rows(self):
        # Parabank populates #accountTable's rows slightly after the page's initial
        # HTML - reading it immediately after driver.get() can see zero/partial rows.
        # Wait for at least one row with a real numeric account id before reading.
        def has_account_row(d):
            rows = d.find_elements(By.CSS_SELECTOR, "#accountTable tbody tr")
            for row in rows:
                cells = row.find_elements(By.TAG_NAME, "td")
                if cells and cells[0].text.strip().isdigit():
                    return rows
            return False

        return WebDriverWait(self.driver, 10).until(has_account_row)

    def get_account_ids(self):
        ids = []
        for row in self._rows():
            cells = row.find_elements(By.TAG_NAME, "td")
            if cells and cells[0].text.strip().isdigit():
                ids.append(cells[0].text.strip())
        return ids

    def get_balance(self, account_id):
        for row in self._rows():
            cells = row.find_elements(By.TAG_NAME, "td")
            if cells and cells[0].text.strip() == str(account_id):
                return float(cells[1].text.replace("$", "").replace(",", ""))
        raise ValueError(f"Account {account_id} not found in #accountTable")
