import { test, expect } from "fixtures/business.fixture.js";
import { NOTIFICATIONS } from "data/salesPortal/notifications.js";
import _ from "lodash";


test.describe("[Sales Portal] [Customers] [E2E Add]", async () => {
    let id = "";
    let token = "";

    test("Add customer with services", async ({
        loginUIService,
        addNewCustomerUIService,
        customersListPage,
    }) => {
        token = await loginUIService.loginAsAdmin();
        await addNewCustomerUIService.open();
        const createdCustomer = await addNewCustomerUIService.create();
        id = createdCustomer._id;
        await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
        await expect(customersListPage.tableRowByName(createdCustomer.name)).toBeVisible();
    });

    test.afterEach(async ({ customersApiService }) => {
        if (id) await customersApiService.delete(token, id);
        id = "";
    });
});