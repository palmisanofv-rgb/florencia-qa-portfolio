package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.CartPage;
import pages.CheckoutPage;
import pages.InventoryPage;
import pages.LoginPage;

public class CheckoutTests extends BaseTest {

    @Test
    public void standardUserCompletesCheckout() {
        LoginPage login = new LoginPage(driver);
        login.open();
        login.login("standard_user", "secret_sauce");

        InventoryPage inventory = new InventoryPage(driver);
        inventory.addToCartByProductName("Sauce Labs Backpack");
        inventory.addToCartByProductName("Sauce Labs Bike Light");
        Assert.assertEquals(inventory.getCartBadgeCount(), 2);

        inventory.goToCart();
        CartPage cart = new CartPage(driver);
        Assert.assertEquals(cart.itemCount(), 2);
        cart.checkout();

        CheckoutPage checkout = new CheckoutPage(driver);
        checkout.fillInformation("Florencia", "Palmisano", "94107");
        Assert.assertTrue(checkout.getSummaryTotal().contains("Total"));
        checkout.finish();

        Assert.assertEquals(checkout.getCompleteHeader(), "Thank you for your order!");
    }

    @Test
    public void checkoutRejectsMissingLastName() {
        LoginPage login = new LoginPage(driver);
        login.open();
        login.login("standard_user", "secret_sauce");

        InventoryPage inventory = new InventoryPage(driver);
        inventory.addToCartByProductName("Sauce Labs Backpack");
        inventory.goToCart();

        CartPage cart = new CartPage(driver);
        cart.checkout();

        CheckoutPage checkout = new CheckoutPage(driver);
        checkout.fillInformation("Florencia", "", "94107");

        Assert.assertEquals(checkout.getErrorMessage(), "Error: Last Name is required");
    }
}
