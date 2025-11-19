import { expect } from "@playwright/test";
import { LoginApi } from "api/api/login.api.js";
import { credentials } from "config/env.js";
import { STATUS_CODES } from "data/statusCodes.js";
import { ICredentials } from "data/types/credentials.types.js";
import { validateResponse } from "utils/validation/validateResponse.utils.js";
import { logStep } from "utils/report/logStep.utils.js";


export class LoginService {
  constructor(private loginApi: LoginApi) { }

  @logStep("Login as Admin via API")
  async loginAsAdmin(customCredentials?: ICredentials) {
    const response = await this.loginApi.login(customCredentials ?? credentials);
    validateResponse(response, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const headers = response.headers;
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    return token;
  }
}
