import {test, expect} from '@playwright/test';

test('test 1 tags practice',{tag:'@Smoke'}, async ({ page }) => {
 console.log('test 1 tags practice');

})
test('test 2 tags practice', async ({ page }) => {
 console.log('test 2 tags practice');

})
test('test 3 tags practice',{tag:['@Smoke','@Regression']},async ({ page }) => {
 console.log('test 3 tags practice');

})
test('test 4 tags practice',{tag:'@Smoke'} ,async ({ page }) => {
 console.log('test 4 tags practice');

})
