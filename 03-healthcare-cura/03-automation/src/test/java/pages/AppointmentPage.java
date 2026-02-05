package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

public class AppointmentPage {
    private final WebDriver driver;
    private final By facilityDropdown = By.id("combo_facility");
    private final By readmissionCheckbox = By.id("chk_hospotal_readmission"); // sic - real typo in CURA's own markup
    private final By medicaidRadio = By.id("radio_program_medicaid");
    private final By visitDate = By.id("txt_visit_date");
    private final By comment = By.id("txt_comment");
    private final By bookButton = By.id("btn-book-appointment");

    public AppointmentPage(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * @param visitDateValue must be dd/mm/yyyy - confirmed from a real failure
     *                       screenshot showing the field's "dd/mm/yyyy" placeholder.
     */
    public void bookAppointment(String facility, String visitDateValue, String commentText) {
        new Select(driver.findElement(facilityDropdown)).selectByVisibleText(facility);
        driver.findElement(readmissionCheckbox).click();
        driver.findElement(medicaidRadio).click();
        // A follow-up failure screenshot showed the field still empty (still
        // showing its "dd/mm/yyyy" placeholder) with the calendar popup open -
        // this field is backed by a Bootstrap datepicker and doesn't accept
        // real typed input at all; sendKeys() only triggers the popup, then
        // Escape closes it again with nothing entered. Setting the value
        // directly avoids opening that popup in the first place.
        WebElement dateField = driver.findElement(visitDate);
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].value = arguments[1]; arguments[0].dispatchEvent(new Event('change', { bubbles: true }));",
                dateField, visitDateValue);
        driver.findElement(comment).sendKeys(commentText);
        driver.findElement(bookButton).click();
    }
}
