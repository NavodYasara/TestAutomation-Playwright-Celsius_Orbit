import { test, expect } from '@playwright/test';

test('Sign-in with valid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'test-user');
  await page.fill('#password', 'test-password');
  await page.click('#submit');
  await expect(page.locator('.welcome-message')).toContainText('Welcome');
});