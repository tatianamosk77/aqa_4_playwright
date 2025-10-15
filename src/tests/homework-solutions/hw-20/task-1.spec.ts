/*
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!
*/

import test, { expect } from "@playwright/test";

test("Dynamic controls test", async ({ page }) => {
  const url = "https://the-internet.herokuapp.com/";
  const dynamicControlsLink = page.locator(`//a[@href='/dynamic_controls']`);
  const removeButton = `//button[text() = 'Remove']`
  const title = page.getByRole('heading', {
    level: 4
  })
  const checkbox = page.locator(`#checkbox-example input`)
  const addButton = page.locator(`//button[text() = 'Add']`)
  const notification = page.locator(`#checkbox-example #message`)

  await page.goto(url);
  await dynamicControlsLink.click()

  await page.waitForSelector(removeButton, { state: 'visible' })
  await expect(title.nth(0)).toHaveText('Dynamic Controls')

  await checkbox.check()
  await page.locator(removeButton).click()
  await expect(checkbox).toBeHidden({ timeout: 10000 });
  await expect(addButton).toBeVisible({ timeout: 10000 });
  await expect(notification).toHaveText(`It's gone!`)
  await addButton.click()
  await expect(checkbox).toBeVisible({ timeout: 10000 })
  await expect(notification).toHaveText(`It's back!`)

}
)