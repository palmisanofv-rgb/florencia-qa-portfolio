package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class ConfirmationPage {
    private final WebDriver driver;
    private final By confirmationHeading = By.xpath("//h2[contains(text(),'Appointment Confirmation')]");

    public ConfirmationPage(WebDriver driver) {
        this.driver = driver;
    }

    public String getConfirmedFacility() {
        // Confirmed from a real CI failure's captured HTML: this page isn't a
        // table at all, it's a <label for="facility">/<p id="facility"> pair -
        // the earlier xpath assumed a table structure that was never real here.
        return driver.findElement(By.id("facility")).getText();
    }

    public boolean isConfirmationVisible() {
        // Confirmed via a real CI failure screenshot: the confirmation h2 was
        // genuinely present in the DOM moments after this check ran - an
        // instant findElements() call raced Angular's route transition to this
        // page, the same "container renders before its content" pattern seen
        // throughout this portfolio's other Selenium/Angular-backed projects.
        try {
            new WebDriverWait(driver, Duration.ofSeconds(10))
                    .until(ExpectedConditions.presenceOfElementLocated(confirmationHeading));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
