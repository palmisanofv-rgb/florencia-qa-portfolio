package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

public class InventoryPage {
    private final WebDriver driver;
    private final By sortDropdown = By.className("product_sort_container");
    private final By itemNames = By.className("inventory_item_name");
    private final By itemPrices = By.className("inventory_item_price");
    private final By cartBadge = By.className("shopping_cart_badge");
    private final By cartLink = By.className("shopping_cart_link");

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

    public void goToCart() {
        driver.findElement(cartLink).click();
    }
}
