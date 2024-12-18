const { test, expect } = require('@playwright/test');
test('succesfully log in', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    // Symulacja kliknięcia na link z tekstem login, przejście do strony logowania
    await page.click("text=login");
    // Sprawdzenie, czy została otwarta strona ze ścieżką do formularza logowania
    expect(page).toHaveURL('http://localhost:3000/user/signin');
    // Sprawdzenie, czy na stronie logowania jest nagłówek z tekstem Login to App
    await expect(page.locator('h1')).toContainText('Sign in');

    await page.getByLabel('Email address').fill('admin@wsei.edu.pl');

    await page.getByLabel('Password').fill('admin12@');
    
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    await expect(page.getByText('admin')).toBeVisible();

    await page.click("text=Profile");

    await expect(page).toHaveURL('http://localhost:3000/user/profile');
  });
