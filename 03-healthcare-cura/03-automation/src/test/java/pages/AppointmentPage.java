package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class AppointmentPage {
    private final WebDriver driver;
    private final By facilityDropdown = By.id("combo_facility");
    private final By readmissionCheckbox = By.id("chk_hospotal_readmission"); // sic - real typo in CURA's own markup
    private final By medicaidRadio = By.id("radio_program_medicaid");
    private final By comment = By.id("txt_comment");
    private final By bookButton = By.id("btn-book-appointment");
    // The field's own <div class="input-group date" data-provide="datepicker"> wraps
    // both #txt_visit_date and this icon addon - confirmed from a real failure
    // screenshot's captured page source.
    private final By datepickerIcon = By.cssSelector(".input-group-addon .glyphicon-calendar");
    private final By datepickerMonthYear = By.cssSelector("th.datepicker-switch");
    private final By datepickerNextMonth = By.cssSelector("th.next");

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

    // Six earlier approaches all failed against this real field, each confirmed via
    // its own CI failure screenshot: sendKeys() alone never lands a value (the field
    // is readonly); writing .value directly via JS, and later calling the datepicker
    // plugin's own jQuery API (even correctly targeted at its real parent container,
    // which did fix the date's *display* format) both visually showed the right date
    // but the checkbox, radio, and comment all still reset to blank on submit too -
    // not just the date. That's the real tell: this app resets the *entire* form
    // scope when Angular's own validation considers anything invalid, and no amount
    // of jQuery/JS manipulation of the date field ever satisfies that validation,
    // only a real, physically-driven UI interaction does. The one run that ever
    // produced a genuine, correct confirmation screen (checkbox, radio, date, and
    // comment all intact) was the one driving the actual calendar UI - clicking
    // through months, then clicking a day. That approach was dropped too early over
    // reliability concerns about *opening* the calendar; the real fix for that is
    // using the calendar's own dedicated icon (confirmed to exist from the same
    // failure screenshot) as the trigger, not the readonly text input, which was
    // never guaranteed to open anything on click at all.
    private void selectVisitDate(String visitDateValue) {
        String[] parts = visitDateValue.split("/");
        int targetDay = Integer.parseInt(parts[0]);
        int targetMonth = Integer.parseInt(parts[1]);
        int targetYear = Integer.parseInt(parts[2]);
        String targetLabel = Month.of(targetMonth).getDisplayName(TextStyle.FULL, Locale.ENGLISH) + " " + targetYear;

        driver.findElement(datepickerIcon).click();
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOfElementLocated(datepickerMonthYear));

        while (!driver.findElement(datepickerMonthYear).getText().trim().equals(targetLabel)) {
            driver.findElement(datepickerNextMonth).click();
        }
        driver.findElement(By.xpath(
                "//td[contains(@class,'day') and not(contains(@class,'old')) and not(contains(@class,'new')) and text()='"
                        + targetDay + "']")).click();
    }
}
