import { test } from '@playwright/test';
import { readOrderEditData } from '../data/order-edit-data';
import { LoginPage } from '../pages/login.page';
import { OrdersPage } from '../pages/orders.page';

const orderEditData = readOrderEditData();

test.describe('Order Edit Functional Coverage', () => {
  for (const data of orderEditData) {
    test(`${data.testCaseId}: opens an eligible order and enters edit mode`, async ({ page }) => {
      const username = process.env.FLORIST_PORTAL_USERNAME;
      const password = process.env.FLORIST_PORTAL_PASSWORD;
      const baseUrl = data.baseUrl;
      const orderNumber = process.env.ELIGIBLE_ORDER_NUMBER || data.orderNumber;

      test.skip(
        !username || !password,
        'Set FLORIST_PORTAL_USERNAME and FLORIST_PORTAL_PASSWORD before running this test.',
      );
      test.skip(!orderNumber, 'Set an eligible orderNumber in the Excel data sheet.');
      test.skip(!baseUrl, 'Set baseUrl in the Excel data sheet.');

      await new LoginPage(page).signIn(baseUrl, username!, password!);
      const orderDetailsPage = await new OrdersPage(page).openOrder(baseUrl, orderNumber!);
      await orderDetailsPage.openEditMode();
      await orderDetailsPage.expectEditMode();
    });
  }
});