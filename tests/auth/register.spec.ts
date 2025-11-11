import { test, expect } from "@playwright/test";
import {
  validUsers,
  invalidUsers,
  edgeCaseUsers,
} from "../testdata/testdata-sign-up";
import { url } from "inspector";

test.beforeEach(async ({ page }) => {
  await page.goto("https://dev.gathernexus.com");
  await expect(page).toHaveURL("https://dev.gathernexus.com/");
  await page.click("text=Sign up");
});

test.describe("test-suite 1: Sign-up", () => {
  test("Verify that the user is navigated to the correct URL on clicking Sign-up button", async ({
    page,
  }) => {
    await expect(page).toHaveURL("https://dev.gathernexus.com/signup");
  });

  test("Verify Email input is present on Sign-up page", async ({ page }) => {
    await expect(page.locator("input[name='email']")).toBeVisible();
  });

  test("Verify Password input is present on Sign-up page", async ({ page }) => {
    await expect(page.locator("input[name='password']")).toBeVisible();
  });

  test("Verify firstName input is present on Sign-up page", async ({
    page,
  }) => {
    await expect(page.locator("input[name='firstName']")).toBeVisible();
  });

  test("Verify lastName input is present on Sign-up page", async ({ page }) => {
    await expect(page.locator("input[name='lastName']")).toBeVisible();
  });

  test("Verify address input is present on Sign-up page", async ({ page }) => {
    await expect(page.locator("input[name='address']")).toBeVisible();
  });

  test("Verify city input is present on Sign-up page", async ({ page }) => {
    await expect(page.locator("input[name='city']")).toBeVisible();
  });

  test("Verify Confirm Password input is present on Sign-up page", async ({
    page,
  }) => {
    await expect(page.locator("input[name='confirmPassword']")).toBeVisible();
  });
});

test.describe("test-suite 2: Sign-up with valid credentials", () => {
  for (const user of validUsers) {
    test(`Verify successful registration for ${user.description}`, async ({
      page,
    }) => {
      // Fill all form fields in one object
      const formInputs = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: user.address || "",
        city: user.city || "",
        email: user.email,
        phoneNo: user.phoneNo || "",
        password: user.password,
        confirmPassword: user.password,
      };

      // Fill all form fields
      for (const [name, value] of Object.entries(formInputs)) {
        await page.fill(`input[name='${name}']`, value);
      }

      // Submit form and verify success
      await page.click("button[type='submit']");

      // Wait for success message and verify
      await expect(page.locator("#swal2-title")).toHaveText(
        "Registration Successful!"
      );

      // Click OK and verify redirect
      await page.getByRole("button", { name: "OK" }).click();
      await expect(page).toHaveURL("https://dev.gathernexus.com/signin");
    });
  }
});

test.describe("test-suite 3: Sign-up with invalid credentials", () => {
  for (const user of invalidUsers) {
    test(`Verify registration failure for ${user.description}`, async ({
      page,
    }) => {
      await page.fill("input[name='firstName']", user.firstName || "");
      await page.fill("input[name='lastName']", user.lastName || "");
      await page.fill("input[name='address']", user.address || "");
      await page.fill("input[name='city']", user.city || "");
      await page.fill("input[name='email']", user.email);
      await page.fill("input[name='password']", user.password);
      await page.fill("input[name='confirmPassword']", user.password);
      await page.click("button[type='submit']");
      await expect(
        page.locator(':text-is("All fields are required")')
      ).toBeVisible();
      await page.getByRole("button", { name: "OK" }).click();
    });
  }
});

test.describe("test-suite 4: Sign-up with edge cases", () => {
  for (const [key, user] of Object.entries(edgeCaseUsers)) {
    test(`Verify registration behavior for ${key}`, async ({ page }) => {
      await page.fill("input[name='firstName']", user.firstName || "");
      await page.fill("input[name='lastName']", user.lastName || "");
      await page.fill("input[name='email']", user.email);
      await page.fill("input[name='phoneNo']", user.phoneNo || "");
      await page.fill("input[name='address']", user.address || "");
      await page.fill("input[name='city']", user.city || "");
      await page.fill("input[name='password']", user.password);
      await page.fill("input[name='confirmPassword']", user.confirmPassword);
      await page.click("button[type='submit']");

      // Verify appropriate error messages based on edge case{
      await expect(page.locator(".swal2-title")).toHaveText(
        "All fields are required"
      );
    });
  }
});
