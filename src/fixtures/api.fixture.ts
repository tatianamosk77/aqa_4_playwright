import { test as base, expect } from "@playwright/test";
import { RequestApi } from "api/apiClients/requestApi.js";
import { ProductsApi } from "api/api/products.api.js";
import { LoginApi } from "api/api/login.api.js";
import { LoginService } from "api/service/login.service.js";
import { ProductsApiService } from "api/service/products.service.js";
import { CustomersApi } from "api/api/customers.api.js";
import { CustomersApiService } from "api/service/customers.service.js";

export interface IApi {
  // api
  productsApi: ProductsApi;
  loginApi: LoginApi;
  customersApi: CustomersApi;

  //services
  productsApiService: ProductsApiService;
  loginApiService: LoginService;
  customersApiService: CustomersApiService
}

const test = base.extend<IApi>({
  //api
  productsApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new ProductsApi(apiClient);
    await use(api);
  },

  customersApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new CustomersApi(apiClient);
    await use(api);
  },

  loginApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new LoginApi(apiClient);
    await use(api);
  },

  //services
  productsApiService: async ({ productsApi }, use) => {
    await use(new ProductsApiService(productsApi));
  },

  customersApiService: async ({ customersApi }, use) => {
    await use(new CustomersApiService(customersApi));
  },

  loginApiService: async ({ loginApi }, use) => {
    await use(new LoginService(loginApi));
  },
});

export { test, expect };