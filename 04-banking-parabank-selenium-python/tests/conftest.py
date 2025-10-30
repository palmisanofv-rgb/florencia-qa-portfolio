import random
import string
import time

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from pages.register_page import RegisterPage


def _random_string(n):
    return "".join(random.choices(string.ascii_lowercase, k=n))


@pytest.fixture
def driver():
    # Headless by default so this suite runs unattended in CI; drop these
    # arguments locally if you want to watch the browser drive itself.
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1920,1080")

    drv = webdriver.Chrome(options=options)  # Selenium Manager resolves the driver binary automatically
    drv.implicitly_wait(10)
    yield drv
    drv.quit()


@pytest.fixture
def registered_user(driver):
    """Registers a fresh Parabank customer for each test (avoids collisions on the shared demo instance)."""
    timestamp = str(int(time.time()))  # numeric-only, safe for phone/SSN fields
    username = f"qa_{timestamp}{_random_string(4)}"
    password = "P@ssw0rd123"

    register = RegisterPage(driver)
    register.open()
    register.register(
        # Parabank is a single public demo instance shared by every QA learner in the
        # world - identical SSN/phone across runs risks tripping some duplicate-data
        # rejection on the shared server, so every field that isn't the account holder's
        # name is randomized per run, not just the username.
        first="QA", last="Portfolio", address="123 Test St", city="San Francisco",
        state="CA", zip_code="94107", phone=f"555{timestamp[-7:]}", ssn=timestamp[-9:].rjust(9, "1"),
        username=username, password=password,
    )

    assert "Log Out" in driver.page_source, (
        f"Registration for {username} did not land on the dashboard - Parabank's shared "
        f"demo instance may have rejected it. Page title was: {driver.title!r}"
    )
    return {"username": username, "password": password}
