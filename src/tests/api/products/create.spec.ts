import { test, expect } from "fixtures/api.fixture.js";
import { generateProductData } from "data/salesPortal/products/generateProductData.js";
import { createProductSchema } from "data/schemas/products/create.schema.js";
import { STATUS_CODES } from "data/statusCodes.js";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils.js";
import { IProduct } from "data/types/product.types.js";
import { faker } from "@faker-js/faker";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Create Product with all fields [POSITIVE]", async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
  });


  test("Create product without notes [POSITIVE]", async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const productWithoutNotes = _.omit(productData, ["notes"])
    const createdProduct = await productsApi.create({
      ...productWithoutNotes as unknown as IProduct
    }, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productWithoutNotes);
  });



  test("NOT to create product with incorrect types of fields [NEGATIVE]", async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const createdProduct = await productsApi.create({
      ...productData,
      name: 123,
      manufacturer: 123,
      price: "123",
      amount: "234",
      notes: 345
    } as unknown as IProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: "Incorrect request body",
    });
  });

  test("NOT to create product without required fields [NEGATIVE]", async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const emptyProduct = _.omit(productData, ["name", "amount", "price", "manufacturer"])
    const createdProduct = await productsApi.create({
      ...emptyProduct
    } as unknown as IProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: "Incorrect request body",
    });
  });

  test("NOT to create product with invalid values [NEGATIVE]", async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const invalidProduct = {
      ...productData,
      name: "Bo",
      manufacturer: "KFC",
      price: 0,
      amount: 1000,
      notes: faker.string.alphanumeric({ length: 251 })
    } as unknown as IProduct
    const createdProduct = await productsApi.create(
      invalidProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: "Incorrect request body",
    });
  });

});
