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
