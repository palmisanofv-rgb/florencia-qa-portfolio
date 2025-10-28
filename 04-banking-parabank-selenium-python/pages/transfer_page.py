from selenium.webdriver.common.by import By

BASE_URL = "https://parabank.parasoft.com/parabank/transfer.htm"


class TransferPage:
    def __init__(self, driver):
        self.driver = driver

    def open(self):
        self.driver.get(BASE_URL)

    def transfer(self, amount, from_account_id, to_account_id):
        d = self.driver
        d.find_element(By.ID, "amount").send_keys(str(amount))
        self._select_by_visible_text(d.find_element(By.ID, "fromAccountId"), from_account_id)
        self._select_by_visible_text(d.find_element(By.ID, "toAccountId"), to_account_id)
        d.find_element(By.CSS_SELECTOR, "input[value='Transfer']").click()

    @staticmethod
    def _select_by_visible_text(select_element, text):
        from selenium.webdriver.support.ui import Select
        Select(select_element).select_by_visible_text(text)

    def get_confirmation_text(self):
        return self.driver.find_element(By.CSS_SELECTOR, "#showResult h1").text
