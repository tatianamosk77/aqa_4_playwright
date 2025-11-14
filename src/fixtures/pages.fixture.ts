import {
  test as base,
  expect,
  // Page
} from "@playwright/test";
import { HomePage } from "ui/pages/home.page.js";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page.js";
import { ProductsListPage } from "ui/pages/products/productsList.page.js";
import { LoginPage } from "ui/pages/sign-in.page.js";
import { AddNewProductUIService } from "ui/service/addNewProduct.ui-service.js";
import { EditProductUIService } from "ui/service/editProduct.ui-service.js";
import { HomeUIService } from "ui/service/home.ui-service.js";
import { LoginUIService } from "ui/service/login.ui-service.js";
import { ProductsListUIService } from "ui/service/productsList.ui-service.js";

export interface IPages {
  //pages
  loginPage: LoginPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
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
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },

  //ui-services
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },

  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },
  editUIService: async ({ page }, use) => {
    await use(new EditProductUIService(page));
  },

});

// export class Pages {
//   public homePage: HomePage;
//   public productsListPage: ProductsListPage;
//   public addNewProductPage: AddNewProductPage;

//   constructor(page: Page) {
//     this.homePage = new HomePage(page);
//     this.productsListPage = new ProductsListPage(page);
//     this.addNewProductPage = new AddNewProductPage(page);
//   }
// }

// interface IPages {
//   pages: Pages;
// }

// const test = base.extend<IPages>({
//   pages: async ({ page }, use) => {
//     await use(new Pages(page));
//   },
// });

export { expect };