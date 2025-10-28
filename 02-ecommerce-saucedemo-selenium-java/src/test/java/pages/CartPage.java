package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class CartPage {
    private final WebDriver driver;
    private final By checkoutButton = By.id("checkout");
    private final By cartItems = By.className("cart_item");

    public CartPage(WebDriver driver) {
        this.driver = driver;
    }

    public int itemCount() {
        return driver.findElements(cartItems).size();
    }

    public void checkout() {
        driver.findElement(checkoutButton).click();
    }
}
