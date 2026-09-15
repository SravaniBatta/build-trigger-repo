import { expect, type Page } from '@playwright/test';

export class OrderDetailsPage {
  constructor(
    private readonly page: Page,
    private readonly orderNumber: string,
  ) {}

  private get actionsMenu() {
    return this.page.locator('button[aria-haspopup="true"]:not(#filter-btn-handler)');
  }

  private get editMenuItem() {
    return this.page.getByRole('menuitem', { name: /edit/i });
  }

  async openEditMode(): Promise<void> {
    await expect(this.page.getByText('Order Number', { exact: true })).toBeVisible();
    await expect(this.page.getByText(this.orderNumber, { exact: true })).toBeVisible();
    await this.actionsMenu.click();
    await expect(this.editMenuItem).toBeVisible();
    await this.editMenuItem.click();
  }

  async expectEditMode(): Promise<void> {
    const editHeading = this.page.getByRole('heading', { name: /edit/i });
    const editDialog = this.page.getByRole('dialog').filter({ hasText: /edit/i });

    await expect(editHeading.or(editDialog)).toBeVisible();
  }
}