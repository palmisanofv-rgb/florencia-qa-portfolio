from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait

BASE_URL = "https://parabank.parasoft.com/parabank/openaccount.htm"


class OpenAccountPage:
    """Registration funds the first (Checking) account with $500. Opening a second
    account requires funding it with at least $100 transferred out of an existing one —
    this page is a prerequisite for any transfer test that needs two real accounts."""

    def __init__(self, driver):
        self.driver = driver

    def open(self):
        self.driver.get(BASE_URL)

    def open_savings_account(self, from_account_id):
        d = self.driver
        Select(d.find_element(By.ID, "type")).select_by_visible_text("SAVINGS")
        Select(d.find_element(By.ID, "fromAccountId")).select_by_visible_text(from_account_id)
        d.find_element(By.CSS_SELECTOR, "input[value='Open New Account']").click()

    def get_new_account_id(self):
        # Same class of bug as AccountsOverviewPage's rows: #newAccountId exists in the
        # DOM as soon as the confirmation page loads, but its text is filled in slightly
        # after that (implicit wait only waits for the element to *exist*, not for its
        # text to be non-empty) - confirmed via CI, where this returned '' at read time.
        return WebDriverWait(self.driver, 10).until(
            lambda d: d.find_element(By.ID, "newAccountId").text or False
        )
