import { IProductDetails } from "data/types/product.types.js";
import { SalesPortalPage } from "../sales-portal.page.js";
import { MANUFACTURERS } from "data/sales-portal/products/manufacturers.js";

export class ConfirmationModal extends SalesPortalPage {
    readonly uniqueElement = this.page.locator("[name='confirmation-modal']");

    readonly title = this.uniqueElement.locator("h5");
    readonly closeButton = this.uniqueElement.locator("button.btn-close");
    readonly deleteButton = this.uniqueElement.locator("button[type='submit']", { hasText: "Yes, Delete" });
    readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

    readonly productValue = this.uniqueElement.locator("p");

    async clickClose() {
        await this.closeButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickDelete() {
        await this.deleteButton.click();
    }
}
