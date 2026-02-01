package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ConfirmationPage {
    private final WebDriver driver;

    public ConfirmationPage(WebDriver driver) {
        this.driver = driver;
    }

    public String getConfirmedFacility() {
        return driver.findElement(By.xpath(
                "//table[contains(@class,'table')]//td[preceding-sibling::td[1][contains(text(),'Facility')]]"
        )).getText();
    }

    public boolean isConfirmationVisible() {
        return !driver.findElements(By.xpath("//h2[contains(text(),'Appointment Confirmation')]")).isEmpty();
    }
}
