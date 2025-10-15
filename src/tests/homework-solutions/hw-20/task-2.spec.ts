/*
Разработать тест со следующими шагами:
  - открыть https://anatoly-karpovich.github.io/demo-login-form/
  - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
  - Залогиниться с данными что вы вставили в localStorage
  - Завалидировать успешный логин

  Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
*/


import test, { expect } from "@playwright/test";

interface ICredentials {
  username: string,
  password: string
}

const validCredentials: ICredentials = {
  username: 'test@gmail.com',
  password: 'SecretPw123!@#'
}

test("LocalStorage test", async ({ page }) => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  const userNameInput = page.locator('#userName')
  const passwordInput = page.locator('#password')
  const submitButton = page.locator('#submit')
  const notification = page.locator('#successMessage')

  await page.goto(url)

  await page.evaluate(() => {
    const userData = {
      name: "test@gmail.com",
      password: "SecretPw123!@#"
    };

    localStorage.setItem('test@gmail.com', JSON.stringify(userData));
  });

  const storedData = await page.evaluate(() => {
    const data = localStorage.getItem('test@gmail.com');
    return data ? JSON.parse(data) : null;
  });

  expect(storedData.name).toBe('test@gmail.com');
  expect(storedData.password).toBe('SecretPw123!@#');


  await userNameInput.fill(validCredentials.username)
  await passwordInput.fill(validCredentials.password)
  await submitButton.click()

  await expect(notification).toHaveText(`Hello, ${storedData.name}!`)

})
