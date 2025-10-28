import { credentials } from "config/env.js";
import { NOTIFICATIONS } from "data/sales-portal/notifications.js";
import { generateProductData } from "data/sales-portal/products/generateProductData.js";
import { expect, test } from "fixtures/pages.fixture.js";

test.describe("[Sales Portal] [Products]", () => {
    test("Delete product", async ({ signInPage, homePage, productsListPage, addNewProductPage }) => {

        await signInPage.open()
        await signInPage.fillSignInForm(credentials);
        await signInPage.clickLogin()

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
        await productsListPage.closeToastButton()
        await productsListPage.deleteButton(productData.name).click();
        const { confirmationModal } = productsListPage;
        await confirmationModal.waitForOpened();
        await confirmationModal.clickDelete()
        await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
        await productsListPage.closeToastButton()
        await expect(productsListPage.tableRowByName(productData.name),
            `${productData.name} doesn't exist in the table`).not.toBeVisible();

    });

});
