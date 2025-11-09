import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig.js";
import { credentials } from "config/env.js";
import { loginSchema } from "data/schemas/login/signIn.schema.js";
import { STATUS_CODES } from "data/statusCodes.js";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils.js";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {
    let token = "";

    test("Sign In", async ({ request }) => {

        const loginResponse = await request.post(baseURL + endpoints.login, {
            data: credentials,
            headers: {
                "content-type": "application/json",
            },
        });
        const loginBody = await loginResponse.json();
        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(loginBody.IsSuccess).toBe(true);
        expect.soft(loginBody.ErrorMessage).toBe(null);
        expect.soft(loginBody.User.username).toBe(credentials.username);

        const headers = loginResponse.headers();
        token = headers["authorization"]!;
        expect(token).toBeTruthy();
        console.log(token)

        await validateResponse(loginResponse, {
            status: STATUS_CODES.OK,
            schema: loginSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });
    });
});