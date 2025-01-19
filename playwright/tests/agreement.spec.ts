import { expect, test } from "@playwright/test";

test("the homepage successfully loads", async ({ page }) => {
  const TEST_IDS = {
    CHECKBOX: "agreement-checkbox",
    HOME_PAGE: "home-page",
    SUBMIT: "agreement-submit",
  };

  await page.goto("http://localhost:3000");

  await expect(page.getByTestId(TEST_IDS.CHECKBOX)).not.toBeChecked();
  await expect(page.getByTestId(TEST_IDS.SUBMIT)).toBeDisabled();

  await page.getByTestId(TEST_IDS.CHECKBOX).click();
  await page.getByTestId(TEST_IDS.SUBMIT).click();

  await expect(page.getByTestId(TEST_IDS.HOME_PAGE)).toBeVisible({
    timeout: 10_000,
  });
});
