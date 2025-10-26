
import { ICredentials } from "data/types/credentials.types";
import { SalesPortalPage } from "./sales-portal.page";

export class SignInPage extends SalesPortalPage {

    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator("button[type='submit']");

    readonly uniqueElement = this.emailInput;

    async fillSignInForm(credentials: Partial<ICredentials>) {
        if (credentials.username) await this.emailInput.fill(credentials.username);
        if (credentials.password) await this.passwordInput.fill(credentials.password);

    }

    async clickLogin() {
        await this.loginButton.click();
    }
}
