import { CustomersApi } from "api/api/customers.api.js";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData.js";
import { createCustomerSchema } from "data/schemas/customers/create.schema.js";
import { STATUS_CODES } from "data/statusCodes.js";
import { ICustomer } from "data/types/customer.types.js";
import { validateResponse } from "utils/validation/validateResponse.utils.js";

export class CustomersApiService {
    constructor(private customersApi: CustomersApi) { }

    async create(token: string, customerData?: ICustomer) {
        const data = generateCustomerData(customerData);
        const response = await this.customersApi.create(data, token);
        validateResponse(response, {
            status: STATUS_CODES.CREATED,
            IsSuccess: true,
            ErrorMessage: null,
            schema: createCustomerSchema,
        });
        return response.body.Customer;
    }

    async delete(token: string, id: string) {
        const response = await this.customersApi.delete(id, token);
        validateResponse(response, {
            status: STATUS_CODES.DELETED,
        });
    }
}
