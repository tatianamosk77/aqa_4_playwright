/*  Разработайте смоук тест-сьют с тестами на REGISTER на странице 
https://anatoly-karpovich.github.io/demo-login-form/

  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, 
      запрещены префиксные/постфиксные пробелы, 
      как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, 
      необходима хотя бы одна буква в верхнем и нижнем регистрах, 
      пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное
*/
import test, { expect } from "@playwright/test";

interface ICredentials {
    username: string,
    password: string
}
const validCredentials: ICredentials = {
    username: 'TatianaM',
    password: 'Qwerty666'
}
enum NOTIFICATIONS {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    INVALID_PASSWORD = "Password should contain at least 8 characters",
    INVALID_USERNAME = "Username should contain at least 3 characters",
    EXISTING_USER = "Username is in use"
}

const invalidCredentials: readonly ICredentials[] = [
    {
        username: "Ta",
        password: validCredentials.password,
    },
    {
        username: validCredentials.username,
        password: "123",
    }
];

test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const registerLink = page.locator('#registerOnLogin');
    await page.goto(url);
    await registerLink.click();
});

test.describe("[SMOKE] [Registration Form]", () => {
    test("Registration with valid credentials", async ({ page }) => {
        const userNameInput = page.locator('#userNameOnRegister')
        const passwordInput = page.locator('#passwordOnRegister')
        const registerButton = page.locator(`#register`)
        const notification = page.locator(`#errorMessageOnRegister`)

        await userNameInput.fill(validCredentials.username)
        await passwordInput.fill(validCredentials.password)
        await registerButton.click()

        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS)
    })

    test("Existing user's registration", async ({ page }) => {
        const userNameInput = page.locator('#userNameOnRegister')
        const passwordInput = page.locator('#passwordOnRegister')
        const registerButton = page.locator(`#register`)
        const notification = page.locator(`#errorMessageOnRegister`)

        await userNameInput.fill(validCredentials.username)
        await passwordInput.fill(validCredentials.password)
        await registerButton.click()
        await registerButton.click()

        await expect(notification).toContainText(NOTIFICATIONS.EXISTING_USER)

    })

    test("Registration with invalid username", async ({ page }) => {
        const userNameInput = page.locator('#userNameOnRegister')
        const passwordInput = page.locator('#passwordOnRegister')
        const registerButton = page.locator(`#register`)
        const notification = page.locator(`#errorMessageOnRegister`)

        const { username, password } = invalidCredentials[0]!;

        await userNameInput.fill(username)
        await passwordInput.fill(password)
        await registerButton.click()

        await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME)
    })

    test("Registration with invalid password", async ({ page }) => {
        const userNameInput = page.locator('#userNameOnRegister')
        const passwordInput = page.locator('#passwordOnRegister')
        const registerButton = page.locator(`#register`)
        const notification = page.locator(`#errorMessageOnRegister`)

        const { username, password } = invalidCredentials[1]!;

        await userNameInput.fill(username)
        await passwordInput.fill(password)
        await registerButton.click()

        await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD)
    })

    test("An ability to return to Login form after registration", async ({ page }) => {
        const backButton = page.locator('#backOnRegister')
        const userNameInput = page.locator('#userNameOnRegister')
        const passwordInput = page.locator('#passwordOnRegister')
        const registerButton = page.locator(`#register`)
        const loginTitle = page.locator('#loginForm')
        const submitButton = page.locator('#submit')

        await userNameInput.fill(validCredentials.username)
        await passwordInput.fill(validCredentials.password)
        await registerButton.click()
        await backButton.click()

        await expect(loginTitle).toHaveText('Login')
        await expect(submitButton).toBeVisible()


    })

})
