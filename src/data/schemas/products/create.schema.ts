import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema.js";
import { productSchema } from "./product.schema.js";

export const createProductSchema = {
  type: "object",
  properties: {
    Product: productSchema,
    ...obligatoryFieldsSchema,
  },
  required: ["Product", ...obligatoryRequredFields],
};
