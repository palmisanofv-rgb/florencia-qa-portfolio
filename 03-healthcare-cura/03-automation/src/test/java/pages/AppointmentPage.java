package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
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
    private final By visitDate = By.id("txt_visit_date");
    private final By comment = By.id("txt_comment");
    private final By bookButton = By.id("btn-book-appointment");
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

    // Seven earlier approaches all failed against this real field. Every JS/jQuery
    // route (writing .value directly, and calling the datepicker plugin's own API -
    // even correctly targeted at its real parent container, which did fix the
    // date's *display* format) hit the same tell twice over: the checkbox, radio,
    // and comment all reset to blank on submit too, not just the date, meaning this
    // app resets its *entire* form scope whenever Angular's validation considers
    // anything invalid, and no JS-driven value ever satisfies that. The one run that
    // ever produced a genuine, fully-correct confirmation screen was the one
    // physically driving the calendar UI. Clicking the dedicated calendar icon
    // instead of the input, hoping for a more reliable trigger, timed out just the
    // same. So the click target was never really the issue - opening this specific
    // widget is just inherently flaky under CI (a real, load-dependent JS attach
    // race, not something either click target fixes). A patient retry - reclicking
    // the field itself every couple of seconds for up to half a minute - is what the
    // one successful run effectively got "for free" from favorable timing; making
    // that retry explicit is the actual fix.
    private void selectVisitDate(String visitDateValue) {
        String[] parts = visitDateValue.split("/");
        int targetDay = Integer.parseInt(parts[0]);
        int targetMonth = Integer.parseInt(parts[1]);
        int targetYear = Integer.parseInt(parts[2]);
        String targetLabel = Month.of(targetMonth).getDisplayName(TextStyle.FULL, Locale.ENGLISH) + " " + targetYear;

        WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(3));
        boolean calendarOpen = false;
        for (int attempt = 0; attempt < 10 && !calendarOpen; attempt++) {
            driver.findElement(visitDate).click();
            try {
                shortWait.until(ExpectedConditions.visibilityOfElementLocated(datepickerMonthYear));
                calendarOpen = true;
            } catch (TimeoutException retry) {
                // try again
            }
        }

        while (!driver.findElement(datepickerMonthYear).getText().trim().equals(targetLabel)) {
            driver.findElement(datepickerNextMonth).click();
        }
        driver.findElement(By.xpath(
                "//td[contains(@class,'day') and not(contains(@class,'old')) and not(contains(@class,'new')) and text()='"
                        + targetDay + "']")).click();
    }
}
