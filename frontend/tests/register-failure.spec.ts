import { test, expect } from '@playwright/test';
test('submitting an incomplete register form warns the user (without email) ', async ({ page }) => {
  const username = `maria${Date.now()}`;
  const password = `password${Date.now()}`;
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Register' }).click();
  await expect.poll(() => dialogMessage).not.toBe('');
  expect(dialogMessage).toMatch(/Please, fill all the fields!/i);
});
