const { test, expect } = require('@playwright/test');

test('Services page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/services');
  await expect(page).toHaveTitle(/.*Hatim.*/i); // Adjust based on actual title if needed
});
