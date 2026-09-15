import {test,expect} from '@playwright/test';
//test.describe.configure({ mode: 'serial' });

test.describe('parallel test', () => {  


    test('parallel test1', async ({ page }) => {
        console.log("parallel test1");
    })
   test('parallel test2', async ({ page }) => {
        console.log("parallel test2");
    })
       test('parallel test3', async ({ page }) => {
        console.log("parallel test3");
    })
       test('parallel test4', async ({ page }) => {
        console.log("parallel test4");
    })
       test('parallel test5', async ({ page }) => {
        console.log("parallel test5");
    })

})