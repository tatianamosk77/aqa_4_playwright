import { MANUFACTURERS } from "data/sales-portal/products/manufacturers";

export interface IProduct {
    name: string;
    manufacturer: MANUFACTURERS;
    price: number;
    amount: number;
    notes?: string;
}