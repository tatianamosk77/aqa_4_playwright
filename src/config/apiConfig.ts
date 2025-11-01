import { SALES_PORTAL_API_URL } from "./env.js";

export const apiConfig = {
  baseURL: SALES_PORTAL_API_URL,
  endpoints: {
    products: "/api/products",
    productById: (id: string) => `/api/products/${id}/`,
    productsAll: "/api/products/all",
    login: "/api/login",
  },
};
