import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    async verifyHeader(expectedTitle: string) {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText(expectedTitle);
    }

    async addItemToCart(itemName: string) {
        const productContainer = this.page.locator('.inventory_item', { hasText: itemName });
        const addToCartButton = productContainer.locator('button:has-text("Add to cart")');
        await addToCartButton.click();
    }

    async verifyCartItemCount(expectedCount: string) {
        await expect(this.shoppingCartBadge).toHaveText(expectedCount);
    }
}
