import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../component/side-menu.component';

export class PulpitPage {
  transferReciver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  buttonSubmit: Locator;
  buttonClose: Locator;
  messages: Locator;
  topupReciver: Locator;
  topupAmount: Locator;
  topupAgreement: Locator;
  topupSumbitButton: Locator;
  moneyValueText: Locator;
  userNameText: Locator;

  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReciver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.buttonSubmit = this.page.getByRole('button', { name: 'wykonaj' });
    this.buttonClose = this.page.getByTestId('close-button');
    this.messages = this.page.locator('#show_messages');
    this.topupReciver = page.locator('#widget_1_topup_receiver');
    this.topupAmount = page.locator('#widget_1_topup_amount');
    this.topupAgreement = page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.topupSumbitButton = page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.moneyValueText = page.locator('#money_value');
    this.userNameText = this.page.getByTestId('user-name');
    this.sideMenuComponent = new SideMenuComponent(this.page);
  }
  async quickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReciver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.buttonSubmit.click();
    await this.buttonClose.click();
  }
  async mobilePayment(
    topUpReceiver: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.topupReciver.selectOption(topUpReceiver);
    await this.topupAmount.fill(topUpAmount);
    await this.topupAgreement.click();
    await this.topupSumbitButton.click();
    await this.buttonClose.click();
  }
}
