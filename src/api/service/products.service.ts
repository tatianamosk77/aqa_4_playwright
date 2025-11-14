import { ProductsApi } from "api/api/products.api.js";
import { generateProductData } from "data/salesPortal/products/generateProductData.js";
import { createProductSchema } from "data/schemas/products/create.schema.js";
import { STATUS_CODES } from "data/statusCodes.js";
import { IProduct } from "data/types/product.types.js";
import { validateResponse } from "utils/validation/validateResponse.utils.js";

export class ProductsApiService {
  constructor(private productsApi: ProductsApi) { }

  async create(token: string, productData?: IProduct) {
    const data = generateProductData(productData);
    const response = await this.productsApi.create(data, token);
    validateResponse(response, {
      status: STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema,
    });
    return response.body.Product;
  }

  async delete(token: string, id: string) {
    const response = await this.productsApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  }
}
