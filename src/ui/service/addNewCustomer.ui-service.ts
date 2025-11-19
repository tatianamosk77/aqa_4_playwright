import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig.js";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData.js";
import { STATUS_CODES } from "data/statusCodes.js";
import { ICustomer, ICustomerResponse } from "data/types/customer.types.js";
import _ from "lodash";
import { extname } from "path";
import { AddNewCustomerPage, CustomersListPage } from "ui/pages/customers/index.js";
import { BaseUIService } from "./base.ui-service.js";
import { logStep } from "utils/report/logStep.utils.js";

export class AddNewCustomerUIService extends BaseUIService {
    private readonly addNewCustomerPage: AddNewCustomerPage = new AddNewCustomerPage(this.page);
    private readonly customersListPage: CustomersListPage = new CustomersListPage(this.page);

    @logStep("Open Add customers page")
    async open() {
        await this.addNewCustomerPage.open("customers/add");
        await this.addNewCustomerPage.waitForOpened();
    }

    @logStep("Create a customer via UI")
    async create(customerData?: Partial<ICustomer>) {
        const data = generateCustomerData(customerData);
        await this.addNewCustomerPage.fillForm(data);
        const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
            apiConfig.endpoints.customers,
            this.addNewCustomerPage.clickSave.bind(this.addNewCustomerPage),
        );
        expect(response.status).toBe(STATUS_CODES.CREATED);
        expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual(data);

        await this.customersListPage.waitForOpened();
        return response.body.Customer;
    }
}