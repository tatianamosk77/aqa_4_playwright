import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig.js";
import { generateProductData } from "data/salesPortal/products/generateProductData.js";
import { STATUS_CODES } from "data/statusCodes.js";
import { IProduct, IProductResponse } from "data/types/product.types.js";
import _ from "lodash";
import { EditProductPage, ProductsListPage } from "ui/pages/products/index.js";

export class EditProductUIService {
    productsListPage: ProductsListPage;
    editProductPage: EditProductPage;

    constructor(private page: Page) {
        this.editProductPage = new EditProductPage(page);
        this.productsListPage = new ProductsListPage(page);
    }

    async open(id: string) {
        await this.editProductPage.open(`products/${id}/edit`);
        await this.editProductPage.waitForOpened();
    }

    async edit(id: string) {
        const data = generateProductData();
        await this.editProductPage.fillForm(data);
        const response = await this.editProductPage.interceptResponse<IProductResponse, any>(
            apiConfig.endpoints.productById(id),
            this.editProductPage.clickSave.bind(this.editProductPage),
        );
        expect(response.status).toBe(STATUS_CODES.OK);
        expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);

        await this.productsListPage.waitForOpened();
        return response.body.Product;
    }
}