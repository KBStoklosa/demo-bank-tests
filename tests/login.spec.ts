import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
test('login with valid credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('tester');
  await page.getByTestId('login-input').press('CapsLock');
  await page.getByTestId('login-input').fill('testerLO');
  await page.getByTestId('login-input').press('CapsLock');
  await page.getByTestId('password-input').fill('karolcia');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
});
test('login with no valid login name', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').blur();

   await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
});

test('login with no valid password', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('tester');
  await page.getByTestId('login-input').press('CapsLock');
  await page.getByTestId('login-input').fill('testerLO');
  await page.getByTestId('login-input').press('CapsLock');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('1234');
  await page.getByTestId('password-input').click();
  await page.locator('div').filter({ hasText: 'identyfikator Wprowadź' }).nth(4).click();
  await page.getByTestId('error-login-password').click();

  await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
});
});
