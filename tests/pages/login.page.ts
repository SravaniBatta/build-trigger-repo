import { type Page } from '@playwright/test';

export class LoginPage {
  private readonly emailInput;
  private readonly continueButton;
  private readonly passwordInput;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel('Email address');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.passwordInput = page.locator('#password');
  }

  async signIn(baseUrl: string, username: string, password: string): Promise<void> {
    await this.page.goto(new URL(baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
    });

    if (/floristportal-tst\.interflorabeta\.co\.uk\/dashboard/.test(this.page.url())) {
      return;
    }

    await this.emailInput.waitFor({ state: 'visible', timeout: 30_000 });
    await this.emailInput.fill(username);
    await this.continueButton.click();

    await this.passwordInput.waitFor({ state: 'visible', timeout: 15_000 });
    await this.passwordInput.fill(password);
    await this.continueButton.click();

    await this.page.waitForURL(/floristportal-tst\.interflorabeta\.co\.uk\/dashboard/, {
      timeout: 30_000,
    });
  }
}