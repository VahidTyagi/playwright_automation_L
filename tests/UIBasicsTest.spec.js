const {test, expect} = require('@playwright/test');



test('Browser Context playwright test', async ({browser}) => 
{
    // chrome 
    const context =  await browser.newContext();
    const page = await context.newPage();
    // above 2 lines playwright automatically creates a new browser and a new page for us.
    // so If I comment out above 2 lines, then playwright will automatically create a new browser and a new page for us.
    // {browser, page} bas page likhna hoga. 

    await page.goto("http://rahulshettyacademy.com/loginpagePractise/");


    // (browsers: ficture called)
    // we did not give any name to the function, so it is an anonymous function. 
    // We can also give a name to the function, but it is not necessary.
    // function() : remove and only ()=> is used to define an anonymous function.
    // async function() : we need to use async because we are using await inside the function. 
    // If we do not use async, then we cannot use await and all the steps will run at the same time. 
    // So we need to use async to make sure that we can use await and control the order of the steps.

    // playwright code goes here. 
    // Step1, Step2, Step3: in Java Step1 run first, then Step2 and then Step3. But 
    // in javascript, all the steps will run at the same time. So we need to use async 
    // and await to make sure that the steps run in the correct order.
    // that is: Java is synchronous and JavaScript is asynchronous.

    // async if we did not put async, then we cannot use await. And if we cannot use await, 
    // then all the steps will run at the same time and we cannot control the order of the steps.

    // await is used to wait for the step to complete before moving on to the next step. 
    // So if we have Step1, Step2 and Step3, then we can use await to make sure that Step1 
    // runs first, then Step2 and then Step3.
});

// test('Page playwright test', async ({browser, page}) =>
// {
//     await page.goto("http://google.com ");

// }
// );

test.only('Login test', async ({browser, page}) =>
{

    // if we want to locators one more time we can add 
    const context =  await browser.newContext();
    //const page = await context.newPage();

    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");


    await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
    // get the title- assertion
    console.log(await page.title());
   // await expect(page).toHaveTitle("Stately");
   // playwright supports cssSelector, xpath, textSelector, idSelector, classSelector, etc.
    

   // type and fill --> type is depreacted now, so we will use fill instead of type.
   await userName.fill("rahulshetty");
   await passWord.fill("Learning@830$3mK21");
   await signInBtn.click();

   console.log(await page.locator("[style*='block']").textContent());

   await expect(page.locator("[style*='block']")).toContainText("Incorrect");

// type and fill

await userName.fill("");
await userName.fill("rahulshettyacademy");
await passWord.fill("Learning@830$3mK2");
await signInBtn.click();
console.log(await cardTitles.nth(0).textContent());
 console.log(await cardTitles.first().textContent());
// // issue first k baad last 
// console.log(await cardTitles.last().textContent());

//await expect(page.locator("[style*='block']")).toContainText("Incorrect");

// tomorrow there can be multiple products, so we can add some logics. 

const allTitles = await cardTitles.allTextContents();
console.log(allTitles);




}   




);




