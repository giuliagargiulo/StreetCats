import { test, expect } from '@playwright/test';

const username = 'maria70';

test('submitting an incomplete login form warns the user (without password)', async ({ page }) => {
  let dialogMessage = '';
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();  // await expect(page).toHaveURL(/login/i);
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill(username);
  dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.locator('#login-section').getByRole('button', { name: 'Login' }).click();
  await expect.poll(() => dialogMessage).not.toBe('');
  expect(dialogMessage).toMatch(/Please, fill all the fields!/i);
});
