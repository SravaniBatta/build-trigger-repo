import path from 'path';
import { test, expect } from '@playwright/test';

export const authFilePath = path.resolve(
  process.cwd(),
  'playwright/.auth/user.json',
);

test('authentication',async({page}  ) => {

await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();  

await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

await page.context().storageState({ path: authFilePath });

  }
)

