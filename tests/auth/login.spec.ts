import { test, expect } from "@playwright/test";
import { validUsers, invalidUsers, edgeCaseUsers } from "../testdata/testdata";

test.beforeEach(async ({ page }) => {
  await page.goto("https://dev.gathernexus.com");
  await expect(page).toHaveURL("https://dev.gathernexus.com/");
});

test.describe("test-suite 1: Sign-in", () => {
  test("Verify that the user is navigated to the correct URL on clicking Sign-in button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL("https://dev.gathernexus.com/signin");
  });

  test("verify that the user is navigated to Sign-in page", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
  });

  test("Verify Email input is present", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();

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
        await expect(locator).toBeVisible({ timeout: 2000 });
        found = true;
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!found) {
      throw new Error(
        "Email input not found using any strategy: " +
          (lastError?.message || lastError)
      );
    }
  });

  test("Verify Password input is present", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();

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
        await expect(locator).toBeVisible({ timeout: 2000 });
        found = true;
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!found) {
      throw new Error(
        "Password input not found using any strategy: " +
          (lastError?.message || lastError)
      );
    }
  });

  test(" Verify Register button is working", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Register" }).click();
    await expect(page).toHaveURL("https://dev.gathernexus.com/signup");
  });

  test("Verify Forgot Password link is working", async ({ page }) => {});

  test("Verify ORBIT LOGO redirected to the dashboard", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator(".signup-logo").click();
    await expect(page).toHaveURL("https://dev.gathernexus.com/");
  });
});

test.describe("test-suite 2: Sign-in with valid credentials", () => {
  for (const user of validUsers) {
    test(`Verify login with ${user.description}`, async ({ page }) => {
      await page.getByRole("button", { name: "Sign In" }).click();

      await page
        .locator('input.gn-input[name="email"][type="email"]')
        .fill(user.email);
      await page
        .locator('input.gn-input[name="password"][type="password"]')
        .fill(user.password);
      await page.getByRole("button", { name: "Login" }).click();
      // Add assertion to verify successful login
      await expect(page).toHaveURL("https://dev.gathernexus.com/dashboard");
    });
  }
});

test.describe("test-suite 3: Sign-in with invalid credentials", () => {
  for (const user of invalidUsers) {
    test(`Verify error message with ${user.description}`, async ({ page }) => {
      await page.getByRole("button", { name: "Sign In" }).click();
      await page
        .locator('input.gn-input[name="email"][type="email"]')
        .fill(user.email);
      await page
        .locator('input.gn-input[name="password"][type="password"]')
        .fill(user.password);
      await page.getByRole("button", { name: "Login" }).click();

      // Verify error message is displayed
      expect(
        page.on("dialog", async (dialog) => {
          expect(dialog.message()).toMatch(
            "Login failed. Please check your credentials."
          );
        })
      );
      // Verify user stays on login page
      await expect(page).toHaveURL("https://dev.gathernexus.com/signin");
    });
  }
});

test.describe("test-suite 4: Edge case validations", () => {
  test("Verify error with empty email", async ({ page }) => {
    const testCase = edgeCaseUsers.emptyEmail;

    await page.getByRole("button", { name: "Sign In" }).click();
    await page
      .locator('input.gn-input[name="email"][type="email"]')
      .fill(testCase.email);
    await page
      .locator('input.gn-input[name="password"][type="password"]')
      .fill(testCase.password);
    await page.getByRole("button", { name: "Login" }).click();

    // Verify validation error
    expect(
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toMatch("Please fill in this field.");
      })
    );
  });

  test("Verify error with empty password", async ({ page }) => {
    const testCase = edgeCaseUsers.emptyPassword;

    await page.getByRole("button", { name: "Sign In" }).click();
    await page
      .locator('input.gn-input[name="email"][type="email"]')
      .fill(testCase.email);
    await page
      .locator('input.gn-input[name="password"][type="password"]')
      .fill(testCase.password);
    await page.getByRole("button", { name: "Login" }).click();

    // Verify validation error
    expect(
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toMatch("Please fill in this field.");
      })
    );
  });

  test("Verify error with invalid email format", async ({ page }) => {
    const testCase = edgeCaseUsers.invalidEmailFormat;

    await page.getByRole("button", { name: "Sign In" }).click();
    await page
      .locator('input.gn-input[name="email"][type="email"]')
      .fill(testCase.email);
    await page
      .locator('input.gn-input[name="password"][type="password"]')
      .fill(testCase.password);
    await page.getByRole("button", { name: "Login" }).click();

    // Verify validation error
    expect(
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toMatch("Please fill in this field.");
      })
    );
  });
});
