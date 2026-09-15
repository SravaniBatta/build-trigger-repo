import {test,expect} from '@playwright/test';

test('drop down section',async({page})=>{

    await page.goto('https://freelance-learn-automation.vercel.app/signup');

    await page.locator('#state').selectOption({label:'Andhra Pradesh'})
    await page.waitForTimeout(2000)

    await page.locator('#state').selectOption({value:'Arunachal Pradesh'})
    await page.waitForTimeout(2000)

    await page.locator('#state').selectOption({index:3})
    await page.waitForTimeout(2000)

 let ddstatus=false;
    let state=await page.$('#state')
    if (!state) {
        throw new Error('State dropdown was not found')
    }
    let allElemnets=await state.$$('option')

    for(let i=0;i<allElemnets.length;i++){

        let element=allElemnets[i]
        const text=await element.textContent()
        if(text?.includes('bihar')){
            ddstatus=true;
            break;
        }
        console.log("dd status is "+ddstatus)
        await expect(ddstatus).toBe(true)
    }

})

