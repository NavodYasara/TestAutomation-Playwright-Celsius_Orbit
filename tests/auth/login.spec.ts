import { test, expect } from "@playwright/test";

test.describe("tet-suite 1 :Sign-in", () => {
  
  test("Sign-in with valid credentials", async ({ page }) => {
    await page.goto("https://dev.gathernexus.com/signin");
  });

  test("Sign-in with invalid credentials", async ({ page }) => {
    await page.goto("https://dev.gathernexus.com/signin");
  });

  test("Sign-in with empty fields", async ({ page }) => {
    await page.goto("https://dev.gathernexus.com/signin");
  });

});
