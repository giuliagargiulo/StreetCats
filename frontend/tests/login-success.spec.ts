import { test, expect } from '@playwright/test';

const username = 'maria70';
const password = 'password2';

test('user can login, and is redirected to homepage', async ({ page }) => {
  let dialogMessage = '';
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();  // await expect(page).toHaveURL(/login/i);
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill(password);
  dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.locator('#login-section').getByRole('button', { name: 'Login' }).click();
  await expect.poll(() => dialogMessage).not.toBe('');
  expect(dialogMessage).toMatch(/Login completed successfully!/i);
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('navigation')).toContainText(new RegExp(`Welcome, ${username}`, 'i'));
});
