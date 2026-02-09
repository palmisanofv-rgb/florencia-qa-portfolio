package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class AppointmentPage {
    private final WebDriver driver;
    private final By facilityDropdown = By.id("combo_facility");
    private final By readmissionCheckbox = By.id("chk_hospotal_readmission"); // sic - real typo in CURA's own markup
    private final By medicaidRadio = By.id("radio_program_medicaid");
    private final By visitDate = By.id("txt_visit_date");
    private final By comment = By.id("txt_comment");
    private final By bookButton = By.id("btn-book-appointment");
    private final By datepickerMonthYear = By.cssSelector(".datepicker-switch");
    private final By datepickerNextMonth = By.cssSelector(".next");

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

    // Two earlier approaches both failed against this real field, confirmed via CI
    // failure screenshots each time: sendKeys() alone never lands a value (the field
    // is readonly); writing .value directly via JavaScript updates the DOM but never
    // touches AngularJS's ng-model, so the form still saw the date as empty and
    // silently reset itself on submit. This Bootstrap datepicker only updates that
    // model through its own calendar UI, so driving that UI - clicking "next month"
    // until the target month is showing, then clicking the target day - is the one
    // path guaranteed to update the app's real state, since it's the same path the
    // widget itself is built to use.
    private void selectVisitDate(String visitDateValue) {
        String[] parts = visitDateValue.split("/");
        int targetDay = Integer.parseInt(parts[0]);
        int targetMonth = Integer.parseInt(parts[1]);
        int targetYear = Integer.parseInt(parts[2]);
        String targetLabel = Month.of(targetMonth).getDisplayName(TextStyle.FULL, Locale.ENGLISH) + " " + targetYear;

        driver.findElement(visitDate).click();
        while (!driver.findElement(datepickerMonthYear).getText().trim().equals(targetLabel)) {
            driver.findElement(datepickerNextMonth).click();
        }
        driver.findElement(By.xpath(
                "//td[contains(@class,'day') and not(contains(@class,'old')) and not(contains(@class,'new')) and text()='"
                        + targetDay + "']")).click();
    }
}
