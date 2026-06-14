import { test, expect } from '@playwright/test';

const username = 'maria70';
const password = 'password2';

test('a logged in user can log out and is redirected to login', async ({ page }) => {
  let dialogMessage = '';
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();
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
  await expect(page.getByRole('navigation')).toContainText(new RegExp(`Welcome, ${username}`, 'i'));

  // LOGOUT
  await page.getByRole('navigation').getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/login/i);
  await expect(page.getByRole('navigation').getByRole('button', { name: 'Login' })).toBeVisible();
});
