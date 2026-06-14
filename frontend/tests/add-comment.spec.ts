import { test, expect } from '@playwright/test';
const username = 'maria70';
const password = 'password2';

test('logged user add a new comment', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();  // await expect(page).toHaveURL(/login/i);
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill(password);
  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.locator('#login-section').getByRole('button', { name: 'Login' }).click();
  await expect.poll(() => dialogMessage).not.toBe('');
  expect(dialogMessage).toMatch(/Login completed successfully!/i);
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('navigation')).toContainText(new RegExp(`Welcome, ${username}`, 'i'));
  // ADD A COMMENT

  const uniqueComment = `${username}: Che carino! ${Date.now()}`;
  await page.getByRole('button', { name: 'Marker' }).first().click();
  await page.getByRole('button', { name: 'View details' }).click();
  await page.getByRole('textbox', { name: 'Add a comment...' }).click();
  await page.getByRole('textbox', { name: 'Add a comment...' }).fill(uniqueComment);
  await page.getByRole('button', { name: 'Add Comment' }).click();
  const ilMioCommento = page.locator('.comment').filter({ hasText: uniqueComment });
  await expect(ilMioCommento).toBeVisible();
});
