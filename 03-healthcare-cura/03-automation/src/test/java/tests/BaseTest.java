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
        options.addArguments("--headless=new", "--window-size=1920,1080");
        driver = new ChromeDriver(options);
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

    // Called explicitly from test methods at meaningful checkpoints, so evidence
    // reflects real test-case coverage rather than just whatever happened to be
    // on screen when a test failed.
    protected void captureEvidence(String name) {
        try {
            Path dir = Path.of("..", "06-evidence");
            Files.createDirectories(dir);
            byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
            Files.write(dir.resolve(name + ".png"), screenshot);
        } catch (IOException e) {
            System.err.println("Could not save evidence screenshot " + name + ": " + e.getMessage());
        }
    }
}
