import { expect, type Page } from '@playwright/test';
import { OrderDetailsPage } from './order-details.page';

export class OrdersPage {
  private readonly page: Page;
  private readonly orderSearch: ReturnType<Page['getByPlaceholder']>;

  constructor(page: Page) {
    this.page = page;
    this.orderSearch = this.page.getByPlaceholder(
      'Search order number, last name, post code etc...',
    );
  }

  async openOrder(baseUrl: string, orderNumber: string): Promise<OrderDetailsPage> {
    await this.page.goto(new URL('/manage-orders', baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
    });

    const orderDisplayText = `S #${orderNumber}`;
    const orderText = this.page.getByText(orderDisplayText, { exact: true }).first();

    if (!(await orderText.isVisible().catch(() => false))) {
      await this.orderSearch.fill(orderNumber);
      await this.orderSearch.press('Enter');
    }

    await expect(orderText).toBeVisible();
    const orderLink = orderText.locator('xpath=ancestor::a[1]');

    if (await orderLink.count()) {
      await orderLink.click();
    } else {
      await orderText.click();
    }

    await this.page.waitForURL(
      new RegExp(`/manage-orders/order\\?id=${orderNumber}`),
    );

    return new OrderDetailsPage(this.page, orderNumber);
  }
}