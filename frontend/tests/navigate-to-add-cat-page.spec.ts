import { test, expect } from '@playwright/test';

test('not logged in user try to add a new cat and is redirected to login ', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('link', { name: 'Add Sighting' }).click();
  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.getByRole('link', { name: 'Add Sighting' }).click();
  await expect.poll(() => dialogMessage).not.toBe('');
  expect(dialogMessage).toMatch(/You have to login to add a sighting!/i);
  await expect(page).toHaveURL(/login/i);
});
