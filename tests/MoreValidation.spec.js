const { test, expect } = require('@playwright/test');

test('Popup Validations', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // Validate textbox visible
  await expect(page.locator("#displayed-text")).toBeVisible();

  // Hide textbox
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();


  // =========================
  // Handle JavaScript Alert
  // =========================

  page.on("dialog", async dialog => {
    console.log(dialog.message());
    await dialog.accept();
  });

  await page.locator("#confirmbtn").click();


  // =========================
  // Mouse Hover
  // =========================

  await page.locator("#mousehover").hover();
  await page.locator("a:has-text('Top')").click();


  // =========================
  // Handle Frame
  // =========================

  const framePage = page.frameLocator("#courses-iframe");

  await framePage
    .locator("li a[href*='lifetime-access']")
    .first()
    .click();

  const textCheck = await framePage.locator(".text h2").textContent();
  console.log(textCheck);

  console.log(textCheck.split(" ")[1]);

});

test('Screenshot and Visual Comparison', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();

  await page.locator('#displayed-text').screenshot({ path: "element-screenshot.png" });
  await page.locator("#hide-textbox").click();

  await page.screenshot({ path: "screenshot.png", fullPage: true });
  await expect(page.locator("#displayed-text")).toBeHidden();




});

// Visulas testing 
test.only('Visual Comparison', async ({ page }) => {
  await page.goto("https://statelymen.com/");
  expect(await page.screenshot()).toMatchSnapshot("statelymen.png");

});




