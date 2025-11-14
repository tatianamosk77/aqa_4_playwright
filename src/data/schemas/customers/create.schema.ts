import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema.js";
import { customerSchema } from "./customer.schema.js";

export const createCustomerSchema = {
    type: "object",
    properties: {
        Customer: customerSchema,
        ...obligatoryFieldsSchema,
    },
    required: ["Customer", ...obligatoryRequredFields],
};
