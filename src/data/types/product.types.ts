import { MANUFACTURERS } from "data/sales-portal/products/manufacturers";

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
