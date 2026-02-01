package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.AppointmentPage;
import pages.ConfirmationPage;
import pages.LoginPage;

public class BookingJourneyTests extends BaseTest {

    @Test
    public void validLoginReachesAppointmentArea() {
        LoginPage login = new LoginPage(driver);
        login.open();
        captureEvidence("tc01-login-page");
        login.login("John Doe", "ThisIsNotARealPassword1");
        captureEvidence("tc01-appointment-area");
        Assert.assertTrue(driver.getCurrentUrl().contains("appointment.php")
                        || driver.getPageSource().contains("Make Appointment"),
                "Expected to reach the appointment area after login");
    }

    @Test
    public void emptyCredentialsAreRejected() {
        LoginPage login = new LoginPage(driver);
        login.open();
        login.login("", "");
        captureEvidence("tc02-empty-credentials-rejected");
        Assert.assertFalse(driver.getCurrentUrl().contains("appointment.php"),
                "Empty credentials should not reach the appointment area");
    }

    @Test
    public void confirmationScreenMatchesSubmittedFacility() {
        LoginPage login = new LoginPage(driver);
        login.open();
        login.login("John Doe", "ThisIsNotARealPassword1");

        String selectedFacility = "Tokyo CURA Healthcare Center";
        AppointmentPage appointment = new AppointmentPage(driver);
        captureEvidence("tc03-appointment-form-before-submit");
        appointment.bookAppointment(selectedFacility, "10/15/2026", "Automated booking - QA portfolio E2E test");

        ConfirmationPage confirmation = new ConfirmationPage(driver);
        captureEvidence("tc04-confirmation-screen");
        Assert.assertTrue(confirmation.isConfirmationVisible(), "Expected the appointment confirmation screen");
        Assert.assertEquals(confirmation.getConfirmedFacility(), selectedFacility,
                "Confirmation screen must echo back the exact facility submitted");
    }
}
