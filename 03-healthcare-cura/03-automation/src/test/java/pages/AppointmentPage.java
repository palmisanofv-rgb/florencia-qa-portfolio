package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
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
        // A follow-up failure screenshot showed the whole form reset back to
        // its defaults after clicking Book Appointment (unchecked box, default
        // radio, empty comment) - this is CURA's AngularJS form silently
        // failing its own validation and re-rendering blank, because setting
        // .value directly via JS updates the DOM but never touches Angular's
        // ng-model, which still saw the date field as empty. The field's
        // `readonly` attribute is what blocks real typing in the first place
        // (confirmed by the very first attempt: sendKeys alone left the field
        // empty) - removing that attribute lets real sendKeys fire the actual
        // focus/keydown/input events ng-model listens for, then Escape closes
        // whatever calendar popup that typing triggers.
        WebElement dateField = driver.findElement(visitDate);
        ((JavascriptExecutor) driver).executeScript("arguments[0].removeAttribute('readonly')", dateField);
        dateField.clear();
        dateField.sendKeys(visitDateValue);
        dateField.sendKeys(Keys.ESCAPE);
        driver.findElement(comment).sendKeys(commentText);
        driver.findElement(bookButton).click();
    }
}
