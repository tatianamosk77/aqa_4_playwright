import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema.js";

export const loginSchema = {
    type: "object",
    properties: {
        ...obligatoryFieldsSchema,
    },
    required: [...obligatoryRequredFields],
};
