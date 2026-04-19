import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId,userPassword); 
    pulpitPage = new PulpitPage(page);

  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    await pulpitPage.transferReciver.selectOption(receiverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.buttonSubmit.click();
    await pulpitPage.buttonClose.click();

    // Assert
    await expect(pulpitPage.messages).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
  

    // Act
    await pulpitPage.topupReciver.selectOption(topUpReceiver);
    await pulpitPage.topupAmount.fill(topUpAmount);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.topupSumbitButton.click();
    await pulpitPage.buttonClose.click();

    // Assert
    await expect(pulpitPage.messages).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
   
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    console.log(initialBalance);
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    console.log(expectedBalance);

    // Act

    await pulpitPage.topupReciver.selectOption(topUpReceiver);
    await pulpitPage.topupAmount.fill(topUpAmount);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.topupSumbitButton.click(); 
    await pulpitPage.buttonClose.click();

    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
