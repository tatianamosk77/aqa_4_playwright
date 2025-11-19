import { test, expect } from "fixtures/business.fixture.js";
import { generateProductResponseData } from "data/salesPortal/products/generateProductData.js";
import _ from "lodash";
import { convertToFullDateAndTime } from "utils/date.utils.js";
import { ProductsListPage } from "ui/pages/products/productsList.page.js";
import { TAGS } from "data/tags.js";

test.describe("[Integration] [Sales Portal] [Products]", () => {
    test("Product Details",
        {
            tag: [TAGS.VISUAL_REGRESSION, TAGS.PRODUCTS, TAGS.INTEGRATION],
        },
        async ({ loginAsAdmin, productsListPage, page, mock }) => {
            const productListPage = new ProductsListPage(page);

            const expectedProductResponse = generateProductResponseData();
            await mock.productsPage({
                Products: [expectedProductResponse],
                IsSuccess: true,
                ErrorMessage: null,
                total: 1,
                page: 1,
                limit: 10,
                search: "",
                manufacturer: [],
                sorting: {
                    sortField: "createdOn",
                    sortOrder: "desc",
                },
            });

            await mock.productDetailsModal({
                Product: expectedProductResponse,
                IsSuccess: true,
                ErrorMessage: null,
            });

            await loginAsAdmin();
            await productListPage.open();
            await productsListPage.waitForOpened();
            await productsListPage.clickAction(expectedProductResponse.name, "details");
            const { detailsModal } = productsListPage;
            await detailsModal.waitForOpened();
            const actual = await detailsModal.getData();
            expect(actual).toEqual({
                ..._.omit(expectedProductResponse, ["_id"]),
                createdOn: convertToFullDateAndTime(expectedProductResponse.createdOn),
            });
        });
});