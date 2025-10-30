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
        // Two different guesses at the add-to-cart button's id/data-test attribute
        // both failed against the live site (confirmed via CI, not assumed) - the
        // product's visible display name is the one thing guaranteed not to have
        // drifted, so locate the button relative to that instead of a test hook.
        String xpath = String.format(
                "//div[@class='inventory_item_name' and text()='%s']"
                        + "/ancestor::div[@class='inventory_item']//button",
                productName);
        driver.findElement(By.xpath(xpath)).click();
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
