package tests;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.AppointmentPage;
import pages.ConfirmationPage;
import pages.LoginPage;

public class BookingJourneyTests extends BaseTest {

    // Confirmed via a real CI failure screenshot: CURA validates against a real
    // seeded demo account, it does not accept "any non-empty credentials" as an
    // earlier, untested assumption had it - and the password has no trailing "1".
    private static final String DEMO_USERNAME = "John Doe";
    private static final String DEMO_PASSWORD = "ThisIsNotAPassword";

    @Test
    public void validLoginReachesAppointmentArea() {
        LoginPage login = new LoginPage(driver);
        login.open();
        captureEvidence("tc01-login-page");
        login.login(DEMO_USERNAME, DEMO_PASSWORD);
        captureEvidence("tc01-appointment-area");
        // The earlier assertion checked for "Make Appointment" text anywhere on the
        // page, which the *login* page's own copy ("Please login to make
        // appointment") also contains - a false pass even when login had actually
        // failed. Checking for the "Login failed!" error's *absence* plus a
        // login-form-only element being gone is the real signal.
        Assert.assertTrue(driver.findElements(By.id("txt-username")).isEmpty(),
                "Login form should no longer be present after a successful login");
    }

    @Test
    public void emptyCredentialsAreRejected() {
        LoginPage login = new LoginPage(driver);
        login.open();
        login.login("", "");
        captureEvidence("tc02-empty-credentials-rejected");
        Assert.assertFalse(driver.findElements(By.id("txt-username")).isEmpty(),
                "Login form should still be present - empty credentials must not log in");
    }

    @Test
    public void confirmationScreenMatchesSubmittedFacility() {
        LoginPage login = new LoginPage(driver);
        login.open();
        login.login(DEMO_USERNAME, DEMO_PASSWORD);

        String selectedFacility = "Tokyo CURA Healthcare Center";
        AppointmentPage appointment = new AppointmentPage(driver);
        captureEvidence("tc03-appointment-form-before-submit");
        appointment.bookAppointment(selectedFacility, "15/10/2026", "Automated booking - QA portfolio E2E test");

        ConfirmationPage confirmation = new ConfirmationPage(driver);
        captureEvidence("tc04-confirmation-screen");
        Assert.assertTrue(confirmation.isConfirmationVisible(), "Expected the appointment confirmation screen");
        Assert.assertEquals(confirmation.getConfirmedFacility(), selectedFacility,
                "Confirmation screen must echo back the exact facility submitted");
    }
}
