import { test, expect } from '@playwright/test';
import path from 'path';

const username = 'maria70';
const password = 'password2';

test('submitting an incomplete add-cat form warns the user (form without location)', async ({ page }) => {
  let dialogMessage = '';
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill(password);
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.locator('#login-section').getByRole('button', { name: 'Login' }).click();
  await expect.poll(() => dialogMessage).not.toBe('');
  expect(dialogMessage).toMatch(/Login completed successfully!/i);
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('navigation')).toContainText(new RegExp(`Welcome, ${username}`, 'i'));

  await page.getByRole('button', { name: 'Add a new cat' }).click();
  await page.getByText('📷 Click here to upload an').click();
  const imagePath = path.resolve(__dirname, '../src/assets/molly.jpg');
  await page.locator('input[type="file"]').setInputFiles(imagePath);
  await page.getByRole('textbox', { name: 'Title' }).fill('Cute gray cat');
  const quillEditor = page.locator('.ql-editor');
  await quillEditor.click();
  await quillEditor.clear();
  await quillEditor.pressSequentially('I saw this cute gray cat near the square.', { delay: 10 });

  dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect.poll(() => dialogMessage).not.toBe('');
  expect(dialogMessage).toMatch(/Please, fill all the fields./i);
});
