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
    username = f"qa_{int(time.time())}_{_random_string(4)}"
    password = "P@ssw0rd123"

    register = RegisterPage(driver)
    register.open()
    register.register(
        first="QA", last="Portfolio", address="123 Test St", city="San Francisco",
        state="CA", zip_code="94107", phone="5555555555", ssn="123456789",
        username=username, password=password,
    )
    return {"username": username, "password": password}
