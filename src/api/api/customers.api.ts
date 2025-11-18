import { IApiClient } from "api/apiClients/types.js";
import { apiConfig } from "config/apiConfig.js";
import { IRequestOptions } from "data/types/core.types.js";
import {
    IGetCustomersParams,
    ICustomer,
    ICustomerResponse,
    ICustomersResponse,
    ICustomersSortedResponse,
} from "data/types/customer.types.js";
import { convertRequestParams } from "utils/queryParams.utils.js";

export class CustomersApi {
    constructor(private apiClient: IApiClient) { }

    async create(customer: ICustomer, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL, //backend url
            url: apiConfig.endpoints.customers, //endpoint address
            method: "post",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: customer,
        };
        return await this.apiClient.send<ICustomerResponse>(options);
    }

    async update(id: string, newCustomer: ICustomer, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL,
            url: apiConfig.endpoints.customerById(id),
            method: "put",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: newCustomer,
        };

        return await this.apiClient.send<ICustomerResponse>(options);
    }

    async getById(id: string, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL,
            url: apiConfig.endpoints.customerById(id),
            method: "get",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        return await this.apiClient.send<ICustomerResponse>(options);
    }

    async getAll(token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL,
            url: apiConfig.endpoints.customersAll,
            method: "get",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        return await this.apiClient.send<ICustomersResponse>(options);
    }

    async getSorted(token: string, params?: Partial<IGetCustomersParams>) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL,
            url: apiConfig.endpoints.customers + (params ? convertRequestParams(params) : ""),
            method: "get",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        return await this.apiClient.send<ICustomersSortedResponse>(options);
    }

    async delete(id: string, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL,
            url: apiConfig.endpoints.customerById(id),
            method: "delete",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        return await this.apiClient.send<null>(options);
    }
}
