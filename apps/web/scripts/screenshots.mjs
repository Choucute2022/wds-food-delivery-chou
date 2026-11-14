import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(here, "../../../docs/screenshots");
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

async function waitForToastsToClear(page) {
  await page
    .waitForFunction(() => !document.querySelector("[data-sonner-toast]"), null, {
      timeout: 10000,
    })
    .catch(() => {});
}

async function capture(page, fileName, fullPage = true) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  await page.screenshot({
    path: path.join(outputDir, fileName),
    fullPage,
  });
  console.log(`saved ${fileName}`);
}

async function addFirstDish(page, restaurantId, times = 1) {
  await page.goto(`${baseURL}/restaurant/${restaurantId}`, {
    waitUntil: "networkidle",
  });
  const addButton = page.getByRole("button", { name: "Thêm vào giỏ" }).first();
  for (let index = 0; index < times; index += 1) {
    await addButton.click();
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: "vi-VN",
  });
  const page = await context.newPage();

  // Home
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await capture(page, "home.png");

  // Restaurant detail
  await page.goto(`${baseURL}/restaurant/bun-bo-co-ba`, {
    waitUntil: "networkidle",
  });
  await capture(page, "restaurant.png");

  // Mobile home (375px)
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    locale: "vi-VN",
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseURL, { waitUntil: "networkidle" });
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(250);
  await mobilePage.screenshot({
    path: path.join(outputDir, "home-mobile.png"),
    fullPage: true,
  });
  await mobileContext.close();
  console.log("saved home-mobile.png");

  // Build a multi-restaurant cart
  await addFirstDish(page, "bun-bo-co-ba", 2);
  await addFirstDish(page, "pizza-napoli", 1);
  await addFirstDish(page, "sushi-sakura", 1);
  await waitForToastsToClear(page);

  // Cart drawer
  const cartTrigger = page.getByRole("button", { name: /^Mở giỏ hàng/ });
  await cartTrigger.click();
  const sheet = page.locator('[data-slot="sheet-content"]');
  await sheet.waitFor({ state: "visible" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outputDir, "cart-drawer.png"),
    fullPage: false,
  });
  console.log("saved cart-drawer.png");
  // Checkout
  await page.getByRole("button", { name: "Thanh toán" }).click();
  await page.waitForURL("**/checkout", { timeout: 10000 });
  await page.locator("#fullName").waitFor({ state: "visible" });
  await capture(page, "checkout.png");

  // Submit the order
  await page.getByLabel("Họ và tên").fill("Nguyễn Văn A");
  await page.getByLabel("Số điện thoại").fill("0901234567");
  await page
    .getByLabel("Địa chỉ giao hàng")
    .fill("123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM");
  await page.getByLabel("Ghi chú (không bắt buộc)").fill("Ít cay, gọi trước khi giao");
  await page.getByRole("button", { name: "Đặt hàng" }).click();

  await page.waitForURL("**/checkout/success?codes=*", { timeout: 20000 });
  await page.getByRole("heading", { name: "Đặt hàng thành công" }).waitFor();
  await capture(page, "success.png");

  const codes = await page.locator("li .font-mono").allInnerTexts();
  console.log(`confirmation codes: ${codes.join(", ")}`);

  const badgeCount = await page
    .getByRole("button", { name: /^Mở giỏ hàng/ })
    .getAttribute("aria-label");
  console.log(`cart badge after order: ${badgeCount}`);

  await context.close();
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
