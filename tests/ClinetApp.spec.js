const { test, expect } = require('@playwright/test');

test('Login test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill("amaantyagi007@gmail.com");
    await page.locator("#userPassword").fill("Mnbvcxz@23");

    await page.locator("[value='Login']").click();   // FIXED

    //await page.waitForLoadState('networkidle');
    //await page.locator(".card-body b").first().waitFor(); // ensure products loaded

    await page.locator(".card-body b").first().waitFor(); // ensure products loaded
    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});

test('UI Controls', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    //const passWord = page.locator("#userPassword");
    const signIn = page.locator("#signInBtn");

    const dropdown = page.locator("select.form-control");
    dropdown.selectOption("consult");
    await page.locator("radiotextsty").last().click();
    await page.locator("#okayBtn").click();

   await  expect(page.locator("#radiotextsty")).last().toBeChecked();

    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();


    // to be checekd: we have assertions for that, but we do not have to for unhcekced. 
    // await page.locator("#terms").uncheck();
    // await expect(page.locator("#terms")).not.toBeChecked();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //await page.pause();


});



test('WellVersed Purchase Flow', async ({ page }) => {

  // 1️⃣ Go to homepage
  await page.goto('https://store.wellversed.in/');

  // Click Best-Sellers
  const bestSellersLink = page.locator("a[href*='best-sellers']");
  await bestSellersLink.first().click();

  // Wait for collection page to load
  await expect(page).toHaveURL(/best-sellers/);

  // 2️⃣ Get all products
  const allProducts = page.locator('li.grid__item');
  await expect(allProducts.first()).toBeVisible();
  console.log('Product count:', await allProducts.count());

  // 3️⃣ Click specific product
  const productLink = page.locator("a[href*='shilajit-resin-10g']").first();
  await productLink.click();

  await expect(page).toHaveURL(/shilajit-resin-10g/);

  // 4️⃣ Add to Cart
  const addToCartBtn = page.locator("button[name='add']");
  await expect(addToCartBtn).toBeVisible();
  await addToCartBtn.click();

  // 5️⃣ Wait for Cart Drawer to appear (Shopify drawer)
  const checkoutBtn = page.locator('#CartDrawer-Checkout, a[href="/checkout"]').first();
  await expect(checkoutBtn).toBeVisible();

  // 6️⃣ Click Checkout
  await checkoutBtn.click();

  // 7️⃣ Validate checkout page loaded
  await expect(page).toHaveURL(/checkout/);

});

// test.only('child window handling', async ({ browser }) => {

//         const context = await browser.newContext();
//         const page = await context.newPage();
//         const userName = page.locator("#username");

//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const documentLink = page.locator("[href*='documents-request']");

//     const [newPage]= await Promise.all([
//         context.waitForEvent('page'),
//         documentLink.click(),
//     ])

//  const text = await newPage.locator(".red").textContent();
// console.log(text);
   
// });


test('child window handling', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ]);

  await newPage.waitForLoadState(); // ensure DOM is ready

  const text = await newPage.locator(".red").textContent();
  console.log(text);



// const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

// if (emailMatch) {
//   const email = emailMatch[0];
//   console.log("Extracted Email:", email);
// }

//const text = await newPage.locator(".red").textContent();

const email = text.split("at ")[1].split(" ")[0];
console.log("Extracted Email:", email);





});

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 });


 test.only('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');

   await page.locator(".card-body b").first().waitFor();

   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();

   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   // click on the checkout button which is available in the cart page
   await page.locator("text=Checkout").click();
 
  await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();


 
});
 
 
 
 





















