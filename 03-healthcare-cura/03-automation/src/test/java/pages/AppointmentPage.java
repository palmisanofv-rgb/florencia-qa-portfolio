package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
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
     *                       screenshot showing the field's "dd/mm/yyyy" placeholder
     *                       and an open (unclosed) date-picker popup after an
     *                       earlier mm/dd/yyyy value was silently rejected as an
     *                       invalid date (month "15" doesn't exist).
     */
    public void bookAppointment(String facility, String visitDateValue, String commentText) {
        new Select(driver.findElement(facilityDropdown)).selectByVisibleText(facility);
        driver.findElement(readmissionCheckbox).click();
        driver.findElement(medicaidRadio).click();
        driver.findElement(visitDate).clear();
        driver.findElement(visitDate).sendKeys(visitDateValue);
        // The date picker widget opens its calendar popup on focus/input and
        // doesn't close itself - Escape dismisses it so it can't intercept the
        // click on the Book Appointment button below it.
        driver.findElement(visitDate).sendKeys(Keys.ESCAPE);
        driver.findElement(comment).sendKeys(commentText);
        driver.findElement(bookButton).click();
    }
}
