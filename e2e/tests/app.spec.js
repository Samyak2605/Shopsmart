const { test, expect } = require('@playwright/test');

test('displays ShopSmart on the homepage', async ({ page }) => {
    // Replace with the actual URL if the app starts on different port
    await page.goto('/');
    await expect(page.locator('body')).toContainText('ShopSmart');
});
