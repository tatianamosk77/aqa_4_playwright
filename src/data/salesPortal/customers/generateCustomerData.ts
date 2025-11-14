import { faker } from "@faker-js/faker";
import { getRandomEnumValue } from "utils/enum.utils.js";
import { COUNTRIES } from "./countries.js";
import { ICustomer } from "data/types/customer.types.js";

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
    return {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        country: getRandomEnumValue(COUNTRIES),
        city: faker.location.city(),
        flat: faker.number.int({ min: 1, max: 1000 }),
        house: faker.number.int({ min: 1, max: 200 }),
        notes: faker.string.alphanumeric({ length: 250 }),
        phone: `+${faker.string.numeric(10)}`,
        street: faker.location.street(),
        ...params,
    };
}
