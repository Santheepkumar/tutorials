import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("filters projects and opens a detail route", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();

  await page.getByRole("searchbox").fill("platform");
  await page.getByRole("button", { name: "Apply filter" }).click();
  await expect(page).toHaveURL(/q=platform/);
  await page.getByRole("link", { name: "Atlas Design System" }).click();

  await expect(page).toHaveURL(/atlas-design-system/);
  await expect(page.getByRole("heading", { name: "Atlas Design System" })).toBeVisible();
});

test("has no serious accessibility violations", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByText("Atlas Design System")).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const serious = results.violations.filter((item) =>
    ["serious", "critical"].includes(item.impact ?? ""),
  );
  expect(serious).toEqual([]);
});
