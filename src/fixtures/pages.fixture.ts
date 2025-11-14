import {
  test as base,
  expect,
  // Page
} from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomerPage.js";
import { CustomersListPage } from "ui/pages/customers/customerListPage.js";
import { HomePage } from "ui/pages/home.page.js";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page.js";
import { ProductsListPage } from "ui/pages/products/productsList.page.js";
import { LoginPage } from "ui/pages/sign-in.page.js";
import { AddNewCustomerUIService } from "ui/service/addNewCustomer.ui-service.js";
import { AddNewProductUIService } from "ui/service/addNewProduct.ui-service.js";
import { CustomersListUIService } from "ui/service/customersList.ui-service.js";
import { EditProductUIService } from "ui/service/editProduct.ui-service.js";
import { HomeUIService } from "ui/service/home.ui-service.js";
import { LoginUIService } from "ui/service/login.ui-service.js";
import { ProductsListUIService } from "ui/service/productsList.ui-service.js";

export interface IPages {
  //pages
  loginPage: LoginPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  customersListPage: CustomersListPage;
  addNewProductPage: AddNewProductPage;
  addNewCustomerPage: AddNewCustomerPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  customersListUIService: CustomersListUIService;
  addNewProductUIService: AddNewProductUIService;
  addNewCustomerUIService: AddNewCustomerUIService;
  loginUIService: LoginUIService;
  editUIService: EditProductUIService
}

export const test = base.extend<IPages>({
  //pages
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  customersListPage: async ({ page }, use) => {
    await use(new CustomersListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },

  //ui-services
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },
  customersListUIService: async ({ page }, use) => {
    await use(new CustomersListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },
  addNewCustomerUIService: async ({ page }, use) => {
    await use(new AddNewCustomerUIService(page));
  },
  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },
  editUIService: async ({ page }, use) => {
    await use(new EditProductUIService(page));
  },

});
export { expect };