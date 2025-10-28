package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

public abstract class BaseTest {
    protected WebDriver driver;

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        // Headless by default so this suite runs unattended in CI; drop these two
        // lines locally if you want to watch the browser drive itself.
        options.addArguments("--headless=new", "--window-size=1920,1080");

        driver = new ChromeDriver(options); // Selenium Manager resolves the driver binary automatically (Selenium 4.6+)
        // Swag Labs is a React app - give it a beat to hydrate after each navigation
        // instead of racing document.readyState.
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
