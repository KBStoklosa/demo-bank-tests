import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'successful login with correct credentials',
    {
      tag: ['@login', '@smoke'],
      annotation: { type: 'Happy path', description: 'Basic happy path' },
    },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = loginData.userPassword;
      const expectedUserName = 'Jan Demobankowy';

      // Act
      await loginPage.login(userId, userPassword);
      // await loginPage.loginInput.fill(userId);
      // await loginPage.passwordInput.fill(userPassword);
      // await loginPage.loginButton.click();

      // Assert
      await expect(loginPage.userName).toHaveText(expectedUserName);
    },
  );

  test(
    'unsuccessful login with too short username',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const incorrectUserId = 'tester';
      const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

      // Act

      await loginPage.loginInput.fill(incorrectUserId);
      await loginPage.passwordInput.click();

      // Assert
      await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
    },
  );

  test(
    'unsuccessful login with too short password',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const incorrectPassword = '1234';
      const expectedErrorMessage = 'hasło ma min. 8 znaków';

      // Act

      await loginPage.loginInput.fill(userId);
      await loginPage.passwordInput.fill(incorrectPassword);
      await loginPage.passwordInput.blur();

      // Assert
      await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
    },
  );
});
