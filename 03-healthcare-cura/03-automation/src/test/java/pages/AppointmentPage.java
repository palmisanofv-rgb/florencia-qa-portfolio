package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

public class AppointmentPage {
    private final WebDriver driver;
    private final By facilityDropdown = By.id("combo_facility");
    private final By readmissionCheckbox = By.id("chk_hospotal_readmission"); // sic - real typo in CURA's own markup
    private final By medicaidRadio = By.id("radio_program_medicaid");
    private final By comment = By.id("txt_comment");
    private final By bookButton = By.id("btn-book-appointment");

    public AppointmentPage(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * @param visitDateValue dd/mm/yyyy, a real future date.
     */
    public void bookAppointment(String facility, String visitDateValue, String commentText) {
        new Select(driver.findElement(facilityDropdown)).selectByVisibleText(facility);
        driver.findElement(readmissionCheckbox).click();
        driver.findElement(medicaidRadio).click();
        selectVisitDate(visitDateValue);
        driver.findElement(comment).sendKeys(commentText);
        driver.findElement(bookButton).click();
    }

    // Five earlier approaches all failed against this real field, each confirmed via
    // its own CI failure screenshot: sendKeys() alone never lands a value (the field
    // is readonly); writing .value directly via JS updates the DOM but never touches
    // AngularJS's ng-model, so the form silently reset on submit; removing readonly
    // and using real sendKeys hit the exact same empty-field result, meaning the
    // widget's own JS blocks typed input outright, not just the readonly attribute;
    // driving the calendar's own UI (clicking through months, clicking a day) worked
    // once but proved unreliable across further runs; and calling the datepicker
    // plugin's own API on the #txt_visit_date input directly displayed the date in
    // the wrong format (mm/dd/yyyy instead of the page's configured dd/mm/yyyy) and
    // still reset the form on submit - the failure screenshot's raw HTML revealed why:
    // the plugin is declared via `data-provide="datepicker"` on the *parent*
    // `.input-group.date` element, not the input itself, so calling `.datepicker()`
    // on the input silently spun up a second, separately-configured instance instead
    // of driving the real one. Targeting that actual parent container is the fix.
    private void selectVisitDate(String visitDateValue) {
        String[] parts = visitDateValue.split("/");
        int targetDay = Integer.parseInt(parts[0]);
        int targetMonth = Integer.parseInt(parts[1]) - 1; // JS Date() months are 0-indexed
        int targetYear = Integer.parseInt(parts[2]);

        String script =
                "var container = $('#txt_visit_date').closest('.input-group.date');" +
                "container.datepicker('setDate', new Date(arguments[0], arguments[1], arguments[2]));" +
                "container.trigger('changeDate');";
        ((JavascriptExecutor) driver).executeScript(script, targetYear, targetMonth, targetDay);
    }
}
