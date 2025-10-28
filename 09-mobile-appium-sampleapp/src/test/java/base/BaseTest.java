package base;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.net.URL;
import java.nio.file.Paths;

public abstract class BaseTest {
    protected AndroidDriver driver;

    @BeforeMethod
    public void setUp() throws Exception {
        UiAutomator2Options options = new UiAutomator2Options()
                .setDeviceName("Android Emulator")
                .setApp(Paths.get("apps", "ApiDemos-debug.apk").toAbsolutePath().toString())
                .setAutomationName("UiAutomator2")
                .setNoReset(false);

        driver = new AndroidDriver(new URL("http://127.0.0.1:4723"), options);
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
