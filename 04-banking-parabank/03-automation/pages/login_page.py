from selenium.webdriver.common.by import By

BASE_URL = "https://parabank.parasoft.com/parabank/index.htm"


class LoginPage:
    def __init__(self, driver):
        self.driver = driver

    def open(self):
        self.driver.get(BASE_URL)

    def login(self, username, password):
        self.driver.find_element(By.NAME, "username").send_keys(username)
        self.driver.find_element(By.NAME, "password").send_keys(password)
        self.driver.find_element(By.CSS_SELECTOR, "input[value='Log In']").click()

    def get_error_text(self):
        return self.driver.find_element(By.CSS_SELECTOR, "#rightPanel .error").text
