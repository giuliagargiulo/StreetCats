import { test, expect } from '@playwright/test';

test('navbar buttons route to login and register pages', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/login/i);

  await page.getByRole('navigation').getByRole('button', { name: 'Sign Up' }).click();
  await expect(page).toHaveURL(/register/i);

  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL(/register/i);
});
