import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // navigate to the base URL before each test
  await page.goto("https://dev.gathernexus.com");
  // Expect the full URL to match exactly including trailing slash
  await expect(page).toHaveURL("https://dev.gathernexus.com/");
});

test.describe("tet-suite 1 :Sign-in", () => {
  test("Verify that the user is navigated to the correct URL on clicking Sign-in button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
    // Expect the URL to match exactly including trailing slash
    await expect(page).toHaveURL("https://dev.gathernexus.com/signin");
  });

  test("verify that the user is navigated to Sign-in page", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
  });

  test("Verify Email input is present", async ({ page }) => {
    // Navigate to the Sign In page where the Email input is expected
    await page.getByRole("button", { name: "Sign In" }).click();
    // Try multiple selector strategies to be robust against markup differences
    const strategies = [
      () => page.getByLabel("Email"),
      () => page.getByPlaceholder("Enter your Email"),
      () => page.getByRole("textbox", { name: /email/i }),
      () => page.locator('input[type="email"]'),
      () => page.locator('[name*="email"]'),
    ];

    let found = false;
    let lastError: any = null;
    for (const getLocator of strategies) {
      try {
        const locator = getLocator();
        // wait briefly for visibility; don't throw immediately so we can try other strategies
        await expect(locator).toBeVisible({ timeout: 2000 });
        found = true;
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!found) {
      // Re-throw the last caught error to include Playwright diagnostics in the test output
      throw new Error(
        "Email input not found using any strategy: " +
          (lastError?.message || lastError)
      );
    }
  });

  test("Verify Password input is present", async ({ page }) => {
    // Navigate to the Sign In page where the Password input is expected
    await page.getByRole("button", { name: "Sign In" }).click();
    // Try multiple selector strategies to be robust against markup differences
    const strategies = [
      () => page.getByPlaceholder("Enter your Password"),
      () => page.getByLabel("Password"),
      () => page.getByRole("textbox", { name: /password/i }),
      () => page.locator('input[type="password"]'),
      () => page.locator('[name*="password"]'),
    ];
    let found = false;
    let lastError: any = null;
    for (const getLocator of strategies) {
      try {
        const locator = getLocator();
        // wait briefly for visibility; don't throw immediately so we can try other strategies
        await expect(locator).toBeVisible({ timeout: 2000 });
        found = true;
        break;
      } catch (err) {
        lastError = err;
      }
    }
    if (!found) {
      // Re-throw the last caught error to include Playwright diagnostics in the test output
      throw new Error(
        "Password input not found using any strategy: " +
          (lastError?.message || lastError)
      );
    }
  });
});

test.describe("test-suite 2: Sign-in with valid credentials", () => {
  test("Verify that user is able to sign in with valid credentials", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator('input.gn-input[name="email"][type="email"]').click();
    await page
      .locator('input.gn-input[name="email"][type="email"]')
      .fill("alsfdj@gmail.com");
  });
});
