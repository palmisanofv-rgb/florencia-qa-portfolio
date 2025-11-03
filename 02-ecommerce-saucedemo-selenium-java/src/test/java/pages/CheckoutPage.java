package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

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

    public void fillInformation(String first, String last, String zip) {
        driver.findElement(firstName).sendKeys(first);
        driver.findElement(lastName).sendKeys(last);
        driver.findElement(postalCode).sendKeys(zip);
        // A JS-dispatched click was tried here preemptively (it fixed a real
        // navigation bug elsewhere - see CartPage.checkout()), but it fired the
        // click synchronously, before React had processed the sendKeys' onChange
        // events, submitting the form with all three fields still empty
        // ("First Name is required" even though "Florencia" was sent). This button
        // never actually had the click-doesn't-register problem, so a plain native
        // click - which does leave enough of a gap for React to catch up - is both
        // correct and simpler here.
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
