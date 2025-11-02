package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CheckoutPage {
    private final WebDriver driver;
    private final By firstName = By.id("first-name");
    private final By lastName = By.id("last-name");
    private final By postalCode = By.id("postal-code");
    private final By continueButton = By.id("continue");
    private final By finishButton = By.id("finish");
    private final By errorMessage = By.cssSelector("[data-test='error']");
    private final By summaryTotal = By.className("summary_total_label");
    private final By completeHeader = By.className("complete-header");

    public CheckoutPage(WebDriver driver) {
        this.driver = driver;
    }

    // React-controlled inputs: sendKeys() can return before React has processed the
    // resulting onChange event and committed the value to its own state. Two earlier
    // CI rounds both got bitten by that race (a JS-dispatched click that fired before
    // React caught up, and - still, sometimes, with a plain click - fields showing up
    // empty on submission). Waiting for the field's own `value` attribute to actually
    // equal what was typed, before moving on, removes the race instead of guessing
    // at how much of a gap a given click strategy happens to leave.
    private void typeAndConfirm(By locator, String text) {
        WebElement field = driver.findElement(locator);
        if (text.isEmpty()) {
            return; // nothing to confirm for an intentionally-blank field
        }
        field.sendKeys(text);
        new WebDriverWait(driver, Duration.ofSeconds(8))
                .until(d -> text.equals(field.getDomProperty("value")));
    }

    public void fillInformation(String first, String last, String zip) {
        typeAndConfirm(firstName, first);
        typeAndConfirm(lastName, last);
        typeAndConfirm(postalCode, zip);
        driver.findElement(continueButton).click();
    }

    public String getErrorMessage() {
        return driver.findElement(errorMessage).getText();
    }

    public String getSummaryTotal() {
        return driver.findElement(summaryTotal).getText();
    }

    public void finish() {
        driver.findElement(finishButton).click();
    }

    public String getCompleteHeader() {
        return driver.findElement(completeHeader).getText();
    }
}
