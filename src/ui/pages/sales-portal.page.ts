import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { SALES_PORTAL_URL } from "config/env";

export abstract class SalesPortalPage extends BasePage {
    readonly spinner = this.page.locator(".spinner-border");
    readonly toastMessage = this.page.locator(".toast-body");
    readonly toastButton = this.page.getByTitle("Close")
    abstract readonly uniqueElement: Locator;

    async waitForOpened() {
        await expect(this.uniqueElement).toBeVisible();
        await expect(this.spinner).toHaveCount(0);
    }

    async open() {
        await this.page.goto(SALES_PORTAL_URL);
    }
    async closeToastButton() {
        await this.toastButton.click()
    }
}