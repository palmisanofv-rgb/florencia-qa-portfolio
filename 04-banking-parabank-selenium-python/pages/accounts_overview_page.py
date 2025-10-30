from selenium.webdriver.common.by import By


class AccountsOverviewPage:
    """https://parabank.parasoft.com/parabank/overview.htm"""

    def __init__(self, driver):
        self.driver = driver

    def _rows(self):
        return self.driver.find_elements(By.CSS_SELECTOR, "#accountTable tbody tr")

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
