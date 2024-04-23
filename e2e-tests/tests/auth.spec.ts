import { test, expect } from '@playwright/test';
const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button

  await page.getByRole("link" , {name: "Sign-In"}).click();
  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name = email]").fill("123@hoy.com");
  await page.locator("[name = password]").fill("123456789");

  await page.getByRole("button" , {name: "SignIn"}).click();
  
  await expect(page.getByRole("link" , {name : "My Booking"})).toBeVisible();
  await expect(page.getByRole("link", {name : "My Hotel"})).toBeVisible();
  await expect(page.getByRole("button", {name : "Sign Out"})).toBeVisible();

});

test('should allow the user to register' , async({page}) =>{
  await page.goto(UI_URL);

  // get the create account here

  await page.getByRole("link" ,{name: "Sign-In"}).click();
  await page.getByRole("link" , {name : "Create an account here"}).click();

  await expect(page.getByRole("heading" , {name: "Create an Account"})).toBeVisible();
  await page.locator("[name = FirstName]").fill("testFirstName");
  await page.locator("[name = LastName]").fill("testLastName");
  await page.locator("[name = Email]").fill("test123@test.com");
  await page.locator("[name = Password]").fill("123456789");
  await page.locator("[name = Confirm password]").fill("123456789");
  await page.getByRole("button" , {name: "Create account"}).click();

  await expect(page.getByRole("link" , {name : "My Booking"})).toBeVisible();
  await expect(page.getByRole("link", {name : "My Hotel"})).toBeVisible();
  await expect(page.getByRole("button", {name : "Sign Out"})).toBeVisible();


})


