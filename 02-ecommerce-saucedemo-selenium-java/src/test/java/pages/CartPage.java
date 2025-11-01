package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
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
        // A native click here wasn't reliably registering as real navigation in CI
        // (confirmed via a saved screenshot: still on the cart page afterward) even
        // though the button itself is a normal, correctly-located element - the same
        // JS-dispatched click that fixed the cart-icon navigation fixes this too.
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", driver.findElement(checkoutButton));
    }
}
