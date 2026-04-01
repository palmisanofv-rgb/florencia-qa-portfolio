import os
import random
import string
import time

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from pages.register_page import RegisterPage

EVIDENCE_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "06-evidence")


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
def evidence(driver):
    """Saves a real screenshot to ../../06-evidence/<name>.png - call evidence('tc05-...') at a checkpoint."""
    os.makedirs(EVIDENCE_DIR, exist_ok=True)

    def _capture(name):
        driver.save_screenshot(os.path.join(EVIDENCE_DIR, f"{name}.png"))

    return _capture


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

    # An instant page_source check here is a race: the confirmation page can still be
    # settling (or, once, a Cloudflare "Just a moment..." interstitial in front of this
    # shared public demo) when the assertion runs. A real explicit wait - not the
    # driver's implicit wait, which page_source doesn't consult at all - covers both
    # a slow redirect and a self-resolving bot-check the same way.
    try:
        WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.LINK_TEXT, "Log Out")))
    except Exception as exc:
        raise AssertionError(
            f"Registration for {username} did not land on the dashboard within 15s - "
            f"Parabank's shared demo instance may have rejected it or hit a bot check. "
            f"Page title was: {driver.title!r}"
        ) from exc

    return {"username": username, "password": password}
