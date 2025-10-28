from pages.login_page import LoginPage


def test_login_with_freshly_registered_account(driver, registered_user):
    # Parabank auto-logs-in right after registration; log out and back in to test the login form itself.
    driver.find_element("link text", "Log Out").click()

    login = LoginPage(driver)
    login.open()
    login.login(registered_user["username"], registered_user["password"])

    assert "Accounts Overview" in driver.page_source


def test_login_with_invalid_password_is_rejected(driver, registered_user):
    driver.find_element("link text", "Log Out").click()

    login = LoginPage(driver)
    login.open()
    login.login(registered_user["username"], "wrong-password")

    assert "could not be validated" in login.get_error_text().lower() or "error" in login.get_error_text().lower()
