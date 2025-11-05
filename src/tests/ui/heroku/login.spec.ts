import { test, expect } from '@playwright/test';

interface ICredentials {
    username: string,
    password: string
}
const validCredentials: ICredentials = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
}
enum NOTIFICATIONS {
    LOGIN_SUCCESS = "You logged into a secure area!",
    LOGOUT_SUCCESS = "You logged out of the secure area!",
    INVALID_PASSWORD = "Your password is invalid!",
    INVALID_USERNAME = "Your username is invalid!",
}

const invalidCredentials: readonly ICredentials[] = [
    {
        username: "Vasia Pupkin",
        password: validCredentials.password,
    },
    {
        username: validCredentials.username,
        password: "sakdskadjksadjaksl",
    },
    {
        username: "",
        password: validCredentials.password,
    },
    {
        username: validCredentials.username,
        password: "",
    },
    {
        username: "",
        password: "",
    },
];


test.beforeEach(async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    const loginLink = page.locator('a[href="/login"]');
    await page.goto(url);
    await loginLink.click();
});

test.describe("[Heroku App] [Form Authentication]", () => {

    test("Should login with valid credentials", async ({ page }) => {

        const userNameInput = page.locator('#username')
        const passwordInput = page.locator('#password')
        const loginButton = page.locator(`//button[@type='submit']`)
        const notification = page.locator(`#flash`)
        const securePageTitle = page.locator(`h2`)

        await userNameInput.fill(validCredentials.username)
        await passwordInput.fill(validCredentials.password)
        await loginButton.click()
        await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS)
        await expect(securePageTitle).toHaveText("Secure Area")


    })

    test("Should logout", async ({ page }) => {

        const userNameInput = page.locator('#username')
        const passwordInput = page.locator('#password')
        const loginButton = page.locator(`//button[@type='submit']`)
        const notification = page.locator(`#flash`)
        const securePageTitle = page.locator(`h2`)
        const logoutButton = page.locator(`//a[@href='/logout']`)

        // pre-conditions
        await userNameInput.fill(validCredentials.username)
        await passwordInput.fill(validCredentials.password)
        await loginButton.click()
        await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS)
        await expect(securePageTitle).toHaveText("Secure Area")

        // act

        await logoutButton.click()
        await expect(notification).toContainText(NOTIFICATIONS.LOGOUT_SUCCESS)
        await expect(securePageTitle).toHaveText("Login Page")


    })

    test("Should NOT login with invalid username", async ({ page }) => {
        const usernameInput = page.locator("#username");
        const passwordInput = page.locator("#password");
        const loginButton = page.locator("//button[@type='submit']");
        const notification = page.locator("#flash");

        const { username, password } = invalidCredentials[0]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
    });

    test("Should NOT login with invalid password", async ({ page }) => {

        const usernameInput = page.locator("#username");
        const passwordInput = page.locator("#password");
        const loginButton = page.locator("//button[@type='submit']");
        const notification = page.locator("#flash");

        const { username, password } = invalidCredentials[1]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD);
    });

    test("Should NOT login with blank username", async ({ page }) => {

        const usernameInput = page.locator("#username");
        const passwordInput = page.locator("#password");
        const loginButton = page.locator("//button[@type='submit']");
        const notification = page.locator("#flash");

        const { username, password } = invalidCredentials[2]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
    });

    test("Should NOT login with blank password", async ({ page }) => {

        const usernameInput = page.locator("#username");
        const passwordInput = page.locator("#password");
        const loginButton = page.locator("//button[@type='submit']");
        const notification = page.locator("#flash");

        const { username, password } = invalidCredentials[3]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD);
    });

    test("Should NOT login with blank credentials", async ({ page }) => {

        const usernameInput = page.locator("#username");
        const passwordInput = page.locator("#password");
        const loginButton = page.locator("//button[@type='submit']");
        const notification = page.locator("#flash");


        const { username, password } = invalidCredentials[4]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
    });
})