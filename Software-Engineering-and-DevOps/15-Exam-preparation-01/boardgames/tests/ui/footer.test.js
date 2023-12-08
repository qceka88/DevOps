const { test, expect } = require('@playwright/test');

test('Check footer', async ({ page }) => {
    await page.goto('http://localhost:8080');  
    const footer = await page.$('footer');
    const text = await footer.textContent();
    expect(text).toContain('© 2023 - Software Engineеring and DevOps exam preparation');
  });
  