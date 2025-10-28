from selenium.webdriver.common.by import By


class AccountsOverviewPage:
    """https://parabank.parasoft.com/parabank/overview.htm"""

    def __init__(self, driver):
        self.driver = driver

    def get_balance(self, account_id):
        row = self.driver.find_element(By.XPATH, f"//a[text()='{account_id}']/ancestor::tr")
        balance_text = row.find_elements(By.TAG_NAME, "td")[1].text
        return float(balance_text.replace("$", "").replace(",", ""))

    def get_account_ids(self):
        links = self.driver.find_elements(By.CSS_SELECTOR, "#accountTable tbody tr td a")
        return [el.text for el in links if el.text.isdigit()]
