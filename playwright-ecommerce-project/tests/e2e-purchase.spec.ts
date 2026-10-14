import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import testData from '../data/Users.json'; // Note: Match your exact file naming 'Users.json'

test.describe('E-Commerce End-to-End Test Suite', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
    });

    test('Success Scenario - User should be able to log in and add a product to the cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        // 1. Perform Login
        await loginPage.login(testData.validUser.username, testData.validUser.password);

        // 2. Verify Landed on Products Dashboard
        await inventoryPage.verifyHeader('Products');

        // 3. Interact with E-commerce elements
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');

        // 4. Assert changes in cart state
        await inventoryPage.verifyCartItemCount('2');
    });

    test('Failure Scenario - Locked out user should see an error message', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Try logging in with a locked user profile
        await loginPage.login(testData.lockedUser.username, testData.lockedUser.password);

        // Verify custom built-in error message is caught cleanly
        await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    });
});
