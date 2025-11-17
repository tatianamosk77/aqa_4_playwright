import { expect, Page } from "@playwright/test";
import { ICustomerDetails } from "data/types/customer.types.js";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomerPage.js";
import { CustomersListPage } from "ui/pages/customers/customerListPage.js";
import { convertToFullDateAndTime } from "utils/date.utils.js";

export class CustomersListUIService {
    customersListPage: CustomersListPage;
    addNewCustomerPage: AddNewCustomerPage;

    constructor(private page: Page) {
        this.customersListPage = new CustomersListPage(page);
        this.addNewCustomerPage = new AddNewCustomerPage(page);
    }

    async openAddNewProductPage() {
        await this.customersListPage.clickAddNewCustomer();
        await this.addNewCustomerPage.waitForOpened();
    }

    async openDetailsModal(customerEmail: string) {
        await this.customersListPage.detailsButton(customerEmail).click();
        await this.customersListPage.detailsModal.waitForOpened();
    }

    async openDeleteModal(customerEmail: string) {
        await this.customersListPage.clickAction(customerEmail, "delete");
        await this.customersListPage.deleteModal.waitForOpened();
    }

    async deleteProduct(customerEmail: string) {
        await this.customersListPage.clickAction(customerEmail, "delete");
        await this.customersListPage.deleteModal.waitForOpened();
        await this.customersListPage.deleteModal.clickConfirm();
        await this.customersListPage.deleteModal.waitForClosed();
    }

    async search(text: string) {
        await this.customersListPage.fillSearchInput(text);
        await this.customersListPage.clickSearch();
        await this.customersListPage.waitForOpened();
    }

    async open() {
        await this.customersListPage.open("customers");
        await this.customersListPage.waitForOpened();
    }

    assertDetailsData(actual: ICustomerDetails, expected: ICustomerDetails) {
        expect(actual).toEqual({
            ..._.omit(expected, ["_id"]),
            createdOn: convertToFullDateAndTime(expected.createdOn),
        });
    }

    async assertCustomerRowVisibleInTable(customerEmail: string, { visible }: { visible: boolean }) {
        await expect(this.customersListPage.tableRowByName(customerEmail)).toBeVisible({ visible });
    }
}