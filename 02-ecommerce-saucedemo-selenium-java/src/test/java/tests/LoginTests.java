package tests;

import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import pages.LoginPage;

public class LoginTests extends BaseTest {

    @DataProvider(name = "seededAccounts")
    public Object[][] seededAccounts() {
        return new Object[][]{
                {"standard_user", true},
                {"problem_user", true},
                {"performance_glitch_user", true},
                {"error_user", true},
                {"visual_user", true},
                {"locked_out_user", false},
        };
    }

    @Test(dataProvider = "seededAccounts")
    public void loginOutcomeMatchesAccountType(String user, boolean expectedSuccess) {
        LoginPage login = new LoginPage(driver);
        login.open();
        login.login(user, "secret_sauce");

        if (expectedSuccess) {
            Assert.assertTrue(driver.getCurrentUrl().contains("inventory.html"),
                    user + " should reach the inventory page");
        } else {
            Assert.assertTrue(
                    login.getErrorMessage().contains("locked out"),
                    "locked_out_user should show the lockout error");
        }
    }
}
