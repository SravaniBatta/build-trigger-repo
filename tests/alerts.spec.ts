import {test,expect} from '@playwright/test';

test('alerts with Ok button', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //enabling dialog window handler

    page.on('dialog',async (dialog)=>{

        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('I am an alert box!');
        await dialog.accept();

    })

    await page.locator("//button[text()='Simple Alert']").click();
    await page.waitForTimeout(5000);
  
    });

    test('confirmation dialog with Ok and cancel button', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //enabling dialog window handler

    page.on('dialog',async (dialog)=>{

        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Press a button!');
        await dialog.accept();
       // await dialog.dismiss();

    })

    await page.click("//button[text()='Confirmation Alert']")
    await page.waitForTimeout(5000);
    await expect(page.locator('//p[text()="You pressed OK!"]')).toContainText('You pressed OK!');

  
    });
    test('prompt dialog with input field', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //enabling dialog window handler

    page.on('dialog',async (dialog)=>{

        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Please enter your name:');
        expect(dialog.defaultValue()).toContain('Harry Potter');
        await dialog.accept('Automation');
       // await dialog.dismiss();

    })

    await page.click("//button[text()='Prompt Alert']")
    await page.waitForTimeout(5000);
    await expect(page.locator('//p[text()="Hello Automation! How are you today?"]')).toContainText('Hello Automation! How are you today?');

  
    });