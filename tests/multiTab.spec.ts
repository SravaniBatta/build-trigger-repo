import {test,expect} from '@playwright/test';   


test('multi tab', async ({ browser }) => {

   const context= await browser.newContext();
   const page=await context.newPage();

   await page.goto('https://freelance-learn-automation.vercel.app/login');

    const [tab1page] = await Promise.all([
        context.waitForEvent('page'),
       await  page.locator("(//a[contains(@href,'twitter')])[1]").click(),
    ]);

    await expect(tab1page.locator("//a[text()='Continue with phone']")).toBeVisible();
    await context.close();

});