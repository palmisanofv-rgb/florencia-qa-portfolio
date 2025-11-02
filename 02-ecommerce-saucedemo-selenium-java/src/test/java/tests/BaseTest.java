package tests;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(15));
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        if (driver != null) {
            if (result.getStatus() == ITestResult.FAILURE) {
                saveFailureArtifacts(result.getName());
            }
            driver.quit();
        }
    }

    // A locator guess that's wrong produces a cryptic NoSuchElementException with no
    // clue what the page actually looked like - saving a screenshot + page source on
    // failure turns "guess again" into "look at what's really there".
    private void saveFailureArtifacts(String testName) {
        try {
            Path dir = Path.of("target", "failure-artifacts");
            Files.createDirectories(dir);
            byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
            Files.write(dir.resolve(testName + ".png"), screenshot);
            Files.writeString(dir.resolve(testName + ".html"), driver.getPageSource());
        } catch (IOException e) {
            System.err.println("Could not save failure artifacts for " + testName + ": " + e.getMessage());
        }
    }
}
