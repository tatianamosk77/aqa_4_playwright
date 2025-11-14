import { Page } from "@playwright/test";
import { HomeModuleButton, HomePage } from "ui/pages/home.page.js";
import { ProductsListPage } from "ui/pages/products/productsList.page.js";

export class HomeUIService {
    homePage: HomePage;
    productsListPage: ProductsListPage;
    constructor(private page: Page) {
        this.homePage = new HomePage(page);
        this.productsListPage = new ProductsListPage(page);
    }

    async openModule(moduleName: HomeModuleButton) {
        await this.homePage.clickOnViewModule(moduleName);

        if (moduleName === "Products") {
            await this.productsListPage.waitForOpened();
        }
    }
}