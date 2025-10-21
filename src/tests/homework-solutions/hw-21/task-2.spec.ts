/* Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например 
getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

Сайт: https://the-internet.herokuapp.com/tables
*/

import test, { expect, Page } from "@playwright/test";

async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
    const table = page.locator("#table2");

    const row = table.locator("tbody tr").filter({
        has: page.locator("td").filter({ hasText: email })
    });

    const headersLocators = await table.locator("th").all();
    headersLocators.pop();
    const headers = await Promise.all(headersLocators.map((el) => el.innerText()));

    const cellLocators = row.locator("td").filter({ hasNot: page.locator("a") });
    const cells = await cellLocators.allInnerTexts();

    return headers.reduce<Record<string, string>>((result, header, i) => {
        result[header] = cells[i] ?? "";
        return result;
    }, {});
}

test.describe("[Heroku App] Table", () => {
    const url = "https://the-internet.herokuapp.com/tables";
    test("Test getTableRow function returns correct row data", async ({ page }) => {
        await page.goto(url);

        const testEmails = [
            "jsmith@gmail.com",
            "fbach@yahoo.com",
            "jdoe@hotmail.com",
            "tconway@earthlink.net"
        ];

        for (const email of testEmails) {

            const rowData = await getTableRow(page, email);
            expect.soft(rowData.Email, `Email in row data should match searched email ${email}`).toBe(email);
            console.log(`Found row for ${email}:`, rowData);
        }
    });
});