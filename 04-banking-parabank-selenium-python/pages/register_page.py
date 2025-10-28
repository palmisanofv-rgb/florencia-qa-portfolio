from selenium.webdriver.common.by import By

BASE_URL = "https://parabank.parasoft.com/parabank/register.htm"


class RegisterPage:
    def __init__(self, driver):
        self.driver = driver

    def open(self):
        self.driver.get(BASE_URL)

    def register(self, first, last, address, city, state, zip_code, phone, ssn, username, password):
        d = self.driver
        d.find_element(By.ID, "customer.firstName").send_keys(first)
        d.find_element(By.ID, "customer.lastName").send_keys(last)
        d.find_element(By.ID, "customer.address.street").send_keys(address)
        d.find_element(By.ID, "customer.address.city").send_keys(city)
        d.find_element(By.ID, "customer.address.state").send_keys(state)
        d.find_element(By.ID, "customer.address.zipCode").send_keys(zip_code)
        d.find_element(By.ID, "customer.phoneNumber").send_keys(phone)
        d.find_element(By.ID, "customer.ssn").send_keys(ssn)
        d.find_element(By.ID, "customer.username").send_keys(username)
        d.find_element(By.ID, "customer.password").send_keys(password)
        d.find_element(By.ID, "repeatedPassword").send_keys(password)
        d.find_element(By.CSS_SELECTOR, "input[value='Register']").click()

    def get_error_text(self):
        return self.driver.find_element(By.CSS_SELECTOR, "#rightPanel .error").text
