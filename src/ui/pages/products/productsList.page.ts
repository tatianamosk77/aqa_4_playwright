
import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "../sales-portal.page";

export class ProductsListPage extends SalesPortalPage {
    readonly productsPageTitle = this.page.locator("h2.fw-bold");
    readonly addNewProductButton = this.page.locator('[name="add-button"]');
    readonly tableRowByName = (productName: string) =>
        this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

    readonly uniqueElement = this.addNewProductButton;

    async parseTableRow(productName: string): Promise<Record<string, string>> {
        const table = this.page.locator("#table-products");
        const row = this.tableRowByName(productName)

        const headersLocators = await table.locator("thead th").all();
        headersLocators.pop();
        headersLocators.pop();

        const headers = await Promise.all(headersLocators.map((el) => el.innerText().then(text => text.toLowerCase())));

        const cellLocators = row.locator("td").filter({ hasNot: this.page.locator("a") });
        const cells = await cellLocators.allInnerTexts();
        cells.pop()

        const normalizedCells = cells.map((cell, index) => {
            const header = headers[index];
            if (header === 'price') {
                return cell.replace(/[$\s]/g, '').trim();
            }
            return cell.trim();
        });

        return headers.reduce<Record<string, string>>((result, header, i) => {
            result[header] = normalizedCells[i] ?? "";
            return result;
        }, {});
    }

    async compareProductFields(
        tableRow: Record<string, string>,
        product: IProduct
    ): Promise<boolean> {
        const expected: Record<string, string> = {
            name: product.name,
            manufacturer: product.manufacturer,
            price: product.price.toString()
        };

        return Object.keys(expected).every(key => {
            const actualValue = tableRow[key]?.trim();
            const expectedValue = expected[key]?.trim();
            const isEqual = actualValue === expectedValue;

            if (!isEqual) {
                console.log(`Mismatch in ${key}:`, {
                    expected: expectedValue,
                    actual: actualValue
                });
            }

            return isEqual;
        });
    }

    async clickAddNewProduct() {
        await this.addNewProductButton.click();
    }
}
