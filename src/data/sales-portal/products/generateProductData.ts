import { faker } from '@faker-js/faker';
import { MANUFACTURERS } from "./manufacturers";
import { getRandomEnumValue } from "utils/enum.utils";
import { IProduct } from "data/types/product.types";

export function generateProductData(params?: Partial<IProduct>): IProduct {
    return {
        name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
        manufacturer: getRandomEnumValue(MANUFACTURERS),
        price: faker.number.int({ min: 1, max: 9990 }),
        amount: faker.number.int({ min: 0, max: 999 }),
        notes: faker.string.alphanumeric({ length: 250 })
    };
}