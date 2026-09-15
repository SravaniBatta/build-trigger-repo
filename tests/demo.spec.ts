import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
})

test('Dashboard', async ({ page }) => {
await page.locator("//span[text()='PIM']").click();
})

test('Add Employee', async ({ page }) => {     
    await page.locator("//span[text()='PIM']").click();
    
    await page.locator("//*[text()=' Add ']").click();
}
)
