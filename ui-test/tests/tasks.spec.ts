import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    await test.step("⌨ Filling in the username ", async ()=>{
      await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    })
    
    await test.step("⌨ Filling in the password ", async ()=>{
      await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    })

    await test.step("🖱Clicking the Continue button", async() => {
       await page.getByRole('button', { name: 'Login' }).click();
    })

    await expect(page.getByRole('heading', { name: 'Todo List' }),"🧪The heading Todo List should be visible").toBeVisible();
  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await test.step("⌨ Filling in wrong username ", async ()=>{
      await page.getByRole('textbox', { name: 'Username' }).fill('adminss');
    })
    
    await test.step("⌨ Filling in wrong  password ", async ()=>{
      await page.getByRole('textbox', { name: 'Password' }).fill('adminss');
    })

    await test.step("🖱Clicking the Login button", async() => {
       await page.getByRole('button', { name: 'Login' }).click();
    })

    await test.step("⌛ waiting for content to load", async () =>{
        await page.waitForTimeout(1000);
    })

    await expect(page.getByRole('heading', { name: 'Todo List' }),"🧪The heading Todo List should not be visible").not.toBeVisible();
  });
});

test.describe('Task CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');

    await test.step("⌨ Filling in wrong username ", async ()=>{
      await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    })
    
    await test.step("⌨ Filling in wrong  password ", async ()=>{
      await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    })

    await test.step("🖱Clicking the Login button", async() => {
       await page.getByRole('button', { name: 'Login' }).click();
    })

    await test.step("⌛ waiting for content to load", async () =>{
        await page.waitForTimeout(1000);
    })
    
    await expect(page.getByRole('heading', { name: 'Todo List' }),"🧪The heading Todo List should be visible").toBeVisible();
  });

  test('Create a new Task', async ({ page }) => {
    
    await test.step("⌨ Filling in a new Task ", async ()=>{
      await page.getByRole('textbox', { name: 'New Todo' }).fill('reading');
    })
   
    await test.step("🖱Clicking the Add button", async() => {
        await page.getByRole('button', { name: 'Add' }).click();
    })

    await test.step("⌛ waiting for content to load", async () =>{
        await page.waitForTimeout(1000);
    })

    const value = await page.getByRole('listitem').getByRole('textbox').inputValue()

    expect.soft(value,`🧪The value should be ${value}`).toBe("reading")

    await test.step("🖱Clicking the Delete button", async() => {
       await page.getByRole('button', { name: 'Delete' }).click();
    })

  });

  test('Edit a Task', async ({ page }) => {
    
    await test.step("⌨ Filling in a new Task ", async ()=>{
      await page.getByRole('textbox', { name: 'New Todo' }).fill('writing');
    })

    await test.step("🖱Clicking the Add button", async() => {
        await page.getByRole('button', { name: 'Add' }).click();
    })

    await test.step("⌛ waiting for content to load", async () =>{
        await page.waitForTimeout(1000);
    })

    const value = await page.getByRole('listitem').getByRole('textbox').inputValue()

    expect.soft(value,`🧪The value should be ${value}`).toBe("writing")

    await test.step("⌨ Editing a new Task ", async ()=>{
       await page.getByRole('listitem').getByRole('textbox').fill("running")
    })

    const secondValue = await page.getByRole('listitem').getByRole('textbox').inputValue()

    expect.soft(secondValue,`🧪The value should be ${secondValue}`).toBe("running")

      await test.step("🖱Clicking the Delete button", async() => {
       await page.getByRole('button', { name: 'Delete' }).click();
    })


  });

  test.skip('Delete a Task', async ({ page }) => {
    
    await test.step("⌨ Filling in a new Task ", async ()=>{
      await page.getByRole('textbox', { name: 'New Todo' }).fill('reading');
    })

    await test.step("🖱Clicking the Add button", async() => {
        await page.getByRole('button', { name: 'Add' }).click();
    })

    await test.step("⌛ waiting for content to load", async () =>{
        await page.waitForTimeout(1000);
    })

    const value = await page.getByRole('listitem').getByRole('textbox').inputValue()

    expect.soft(value,`🧪The value should be ${value}`).toBe("reading")

    await test.step("🖱Clicking the Delete button", async() => {
       await page.getByRole('button', { name: 'Delete' }).click();
    })

     await test.step("⌛ waiting for content to load", async () =>{
        await page.waitForTimeout(1000);
    })

    expect.soft(page.getByRole('listitem').getByRole('textbox'),`🧪The value should not exist`).not.toBeVisible()

    await page.reload();

  });
});