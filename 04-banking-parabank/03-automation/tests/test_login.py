from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from pages.login_page import LoginPage


def test_login_with_freshly_registered_account(driver, registered_user, evidence):
    evidence("tc01-account-registered")
    # Parabank auto-logs-in right after registration; log out and back in to test the login form itself.
    driver.find_element("link text", "Log Out").click()

    login = LoginPage(driver)
    login.open()
    evidence("tc02-login-page")
    login.login(registered_user["username"], registered_user["password"])

    # An instant page_source check here raced the redirect once already (see conftest.py's
    # registered_user fixture, which hit the same class of bug) - wait for the real heading.
    WebDriverWait(driver, 10).until(EC.text_to_be_present_in_element((By.TAG_NAME, "h1"), "Accounts Overview"))
    evidence("tc02-accounts-overview")


def test_login_with_invalid_password_is_rejected(driver, registered_user, evidence):
    driver.find_element("link text", "Log Out").click()

    login = LoginPage(driver)
    login.open()
    login.login(registered_user["username"], "wrong-password")

    # Confirmed via a real CI run: Parabank's actual copy is "could not be verified", not
    # "validated" as an initial (untested) guess assumed - fixed to match the real string.
    evidence("tc03-invalid-password-error")
    assert "could not be verified" in login.get_error_text().lower()
