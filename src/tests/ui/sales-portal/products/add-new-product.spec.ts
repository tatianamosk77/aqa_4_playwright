import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/sales-portal/notifications";
import { generateProductData } from "data/sales-portal/products/generateProductData";
import { MANUFACTURERS } from "data/sales-portal/products/manufacturers";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { SignInPage } from "ui/pages/sign-in.page";

test.describe("[Sales Portal] [Products]", async () => {
    test("[E2E-test] Add new product", async ({ page }) => {
        const homePage = new HomePage(page);
        const productsListPage = new ProductsListPage(page);
        const addNewProductPage = new AddNewProductPage(page);
        const signInPage = new SignInPage(page)

        await signInPage.open();
        await signInPage.fillSignInForm(credentials)
        await signInPage.clickLogin()

        await homePage.waitForOpened();
        await homePage.clickOnViewModule("Products");

        await productsListPage.waitForOpened();
        await productsListPage.clickAddNewProduct();

        await addNewProductPage.waitForOpened();
        const productData = generateProductData();
        await addNewProductPage.fillForm(productData);
        await addNewProductPage.clickSave();

        await productsListPage.waitForOpened();
        await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
        await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

        const actualProductInTable = await productsListPage.parseTableRow(productData.name);

        expect(await productsListPage.compareProductFields(actualProductInTable, productData),
            `Product in a row data should be ${productData.name}`).toBe(true)
    });
});
