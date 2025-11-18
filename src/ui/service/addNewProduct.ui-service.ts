import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig.js";
import { generateProductData } from "data/salesPortal/products/generateProductData.js";
import { STATUS_CODES } from "data/statusCodes.js";
import { IProduct, IProductResponse } from "data/types/product.types.js";
import _ from "lodash";
import { AddNewProductPage, ProductsListPage } from "ui/pages/products/index.js";
import { BaseUIService } from "./base.ui-service.js";

export class AddNewProductUIService extends BaseUIService {

    private readonly addNewProductPage: AddNewProductPage = new AddNewProductPage(this.page);
    private readonly productsListPage: ProductsListPage = new ProductsListPage(this.page);


    async open() {
        await this.addNewProductPage.open("products/add");
        await this.addNewProductPage.waitForOpened();
    }

    async create(productData?: Partial<IProduct>) {
        const data = generateProductData(productData);
        await this.addNewProductPage.fillForm(data);
        const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
            apiConfig.endpoints.products,
            this.addNewProductPage.clickSave.bind(this.addNewProductPage),
        );
        expect(response.status).toBe(STATUS_CODES.CREATED);
        expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);

        await this.productsListPage.waitForOpened();
        return response.body.Product;
    }
}