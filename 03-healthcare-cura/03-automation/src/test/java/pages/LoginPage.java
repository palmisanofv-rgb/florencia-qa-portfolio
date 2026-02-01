package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {
    private final WebDriver driver;
    private final By username = By.id("txt-username");
    private final By password = By.id("txt-password");
    private final By loginButton = By.id("btn-login");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get("https://katalon-demo-cura.herokuapp.com/profile.php#login");
    }

    public void login(String user, String pass) {
        if (!user.isEmpty()) driver.findElement(username).sendKeys(user);
        if (!pass.isEmpty()) driver.findElement(password).sendKeys(pass);
        driver.findElement(loginButton).click();
    }
}
