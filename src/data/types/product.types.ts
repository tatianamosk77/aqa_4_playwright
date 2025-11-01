import { MANUFACTURERS } from "data/sales-portal/products/manufacturers.js";
import { ID, IResponseFields } from "./core.types.js";

export interface IProduct {
    name: string;
    manufacturer: MANUFACTURERS;
    price: number;
    amount: number;
    notes?: string;
}

export interface ICreatedOn {
    createdOn: string;
}

// export type IProductInTable = Pick<IProduct, "name" | "manufacturer" | "price"> & { createdOn: string };
export interface IProductInTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreatedOn { }

export interface IProductDetails extends Required<IProduct>, ICreatedOn { }

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID { }

export interface IProductResponse extends IResponseFields {
    Product: IProductFromResponse;
}
