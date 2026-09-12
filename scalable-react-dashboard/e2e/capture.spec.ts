import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

const mediaDir = resolve("../../public/media/scalable-react-frontend");

test("capture verified dashboard", async ({ page }, testInfo) => {
  await mkdir(mediaDir, { recursive: true });
  await page.goto("/projects");
  await expect(page.getByText("Atlas Design System")).toBeVisible();

  const filename =
    testInfo.project.name === "mobile" ? "dashboard-mobile.png" : "dashboard-desktop.png";
  await page.screenshot({
    fullPage: true,
    path: resolve(mediaDir, filename),
  });
});
