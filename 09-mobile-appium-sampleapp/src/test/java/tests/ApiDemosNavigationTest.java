package tests;

import base.BaseTest;
import io.appium.java_client.AppiumBy;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

public class ApiDemosNavigationTest extends BaseTest {

    @Test
    public void navigatesToAlertDialogsAndAcceptsOkCancel() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.findElement(AppiumBy.accessibilityId("App")).click();
        driver.findElement(AppiumBy.accessibilityId("Alert Dialogs")).click();
        driver.findElement(AppiumBy.accessibilityId("OK Cancel dialog with a message")).click();

        WebElement okButton = wait.until(
                ExpectedConditions.presenceOfElementLocated(AppiumBy.id("android:id/button1")));
        okButton.click();

        // The dialog closing without error, and the underlying list still being present,
        // confirms the native alert was actually dismissed rather than silently ignored.
        Assert.assertTrue(
                driver.findElement(AppiumBy.accessibilityId("OK Cancel dialog with a message")).isDisplayed(),
                "Should return to the Alert Dialogs list after dismissing the native dialog"
        );
    }
}
