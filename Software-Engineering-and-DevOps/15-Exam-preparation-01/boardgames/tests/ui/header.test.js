const { test, expect } = require('@playwright/test');

test('Check header', async ({ page }) => {
    await page.goto('http://localhost:8080');  // you can replace this URL with any page that includes the header
    const homeLink = await page.$('a[href="/"]');
    const text = await homeLink.textContent();
    expect(text).toBe('Boardgame Collection');
  });
  