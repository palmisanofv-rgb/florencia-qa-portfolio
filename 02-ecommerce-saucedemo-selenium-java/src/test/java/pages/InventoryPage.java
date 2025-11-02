package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

public class InventoryPage {
    private final WebDriver driver;
    private final By sortDropdown = By.className("product_sort_container");
    private final By itemNames = By.className("inventory_item_name");
    private final By itemPrices = By.className("inventory_item_price");
    private final By cartBadge = By.className("shopping_cart_badge");
    private final By cartLink = By.cssSelector("[data-test='shopping-cart-link']");

    public InventoryPage(WebDriver driver) {
        this.driver = driver;
    }

    public void sortBy(String value) {
        new org.openqa.selenium.support.ui.Select(driver.findElement(sortDropdown)).selectByValue(value);
    }

    public List<String> getItemNames() {
        return driver.findElements(itemNames).stream().map(WebElement::getText).collect(Collectors.toList());
    }

    public List<Double> getItemPrices() {
        return driver.findElements(itemPrices).stream()
                .map(e -> Double.parseDouble(e.getText().replace("$", "")))
                .collect(Collectors.toList());
    }

    public void addToCartByProductName(String productName) {
        // A saved failure screenshot + page source (captured by BaseTest's failure
        // diagnostics) showed the real, current markup: buttons carry
        // data-test="add-to-cart-<slug>", and the earlier text-based XPath attempt
        // failed for an unrelated reason - inventory_item_name's class attribute has
        // a trailing space ("inventory_item_name "), which breaks an exact
        // @class='...' match in XPath (By.className/CSS class selectors aren't
        // affected by this, only a hand-written exact-match XPath is).
        String slug = productName.toLowerCase().replace(" ", "-");
        driver.findElement(By.cssSelector("[data-test='add-to-cart-" + slug + "']")).click();
    }

    public int getCartBadgeCount() {
        return driver.findElements(cartBadge).isEmpty()
                ? 0
                : Integer.parseInt(driver.findElement(cartBadge).getText());
    }

    // React's state update after an add-to-cart click isn't guaranteed to have
    // painted the badge by the time the very next command runs - waiting for the
    // expected count directly avoids a flaky "expected 2 but found 1" on whichever
    // click happened to land right before a re-render.
    public void waitForCartBadgeCount(int expected) {
        new WebDriverWait(driver, Duration.ofSeconds(5)).until(d -> getCartBadgeCount() == expected);
    }

    public void goToCart() {
        // The cart link is an empty anchor whose visible icon comes from a sibling
        // SVG rather than its own content/dimensions - a native WebDriver click was
        // silently not registering as a real navigation. A JS-dispatched click
        // bypasses WebDriver's clickability/visibility-at-point checks entirely.
        WebElement link = driver.findElement(cartLink);
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", link);
    }
}
