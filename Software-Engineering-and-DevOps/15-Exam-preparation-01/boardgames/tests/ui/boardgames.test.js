const { test, expect } = require('@playwright/test');

test('Check boardgames page', async ({ page }) => {
    await page.goto('http://localhost:8080/collection');
    const list = await page.$('ul');
    expect(list).toBeTruthy();
  });
  