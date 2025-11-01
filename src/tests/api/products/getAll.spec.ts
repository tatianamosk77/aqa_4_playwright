import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig.js";
import { credentials } from "config/env.js";
import { generateProductData } from "data/sales-portal/products/generateProductData.js";
import { productsAllSchema } from "data/schemas/products/products-all.schema.js";
import { STATUS_CODES } from "data/statusCodes.js";
import { IProduct } from "data/types/product.types.js";
import { validateResponse } from "utils/validateResponse.utils.js";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {

    test("Check all products", async ({ request }) => {
        //login
        const loginResponse = await request.post(baseURL + endpoints.login, {
            data: credentials,
            headers: {
                "content-type": "application/json",
            },
        });
        const headers = loginResponse.headers();
        const token = headers["authorization"]!;

        //create a product


        const productData = generateProductData();
        const createProductResponse = await request.post(baseURL + endpoints.products, {
            data: productData,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        await validateResponse(createProductResponse, {
            status: STATUS_CODES.CREATED
        });

        // get all products
        const productsResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const allProductsBody = await productsResponse.json();
        const createdProductBody = await createProductResponse.json();

        const createdProductId = createdProductBody.Product._id
        console.log('Created product ID:', createdProductId);

        const products: IProduct[] = allProductsBody.Products

        console.log(`Found ${products.length} products`);

        console.log(productsResponse)

        await validateResponse(productsResponse, {
            status: STATUS_CODES.OK,
            schema: productsAllSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });

        const isExist = products.some(el => el._id === createdProductId)
        expect.soft(isExist).toBe(true);


    });
});
