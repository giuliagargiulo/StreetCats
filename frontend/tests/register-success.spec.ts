import { test, expect } from '@playwright/test';
test('user can register and is redirected to login', async ({ page }) => {
  const email = `maria_${Date.now()}@mail.com`;
  const username = `maria${Date.now()}`;
  const password = `password${Date.now()}`;
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Register' }).click();
  await expect.poll(() => dialogMessage).not.toBe('');
  expect(dialogMessage).toMatch(/Registration completed successfully!/i);
  await expect(page).toHaveURL(/login/i);
});
