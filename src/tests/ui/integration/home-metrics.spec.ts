import { test, expect } from "fixtures/business.fixture.js";
import { SALES_PORTAL_URL } from "config/env.js";
import numeral from "numeral";
import { HomeMetricsTestBuilder } from "utils/homeMetricsHelper.js";


test.describe("[Integration] [Sales Portal] [Home Metrics]", () => {

    test("Orders This Year metric", async ({ loginAsAdmin, homePage, page, mock }) => {
        const expectedOrdersThisYear = 150;
        const mockData = HomeMetricsTestBuilder.forOrdersThisYear(expectedOrdersThisYear);

        await mock.homePageMetrics(mockData);

        await loginAsAdmin();
        await page.goto(SALES_PORTAL_URL);
        await homePage.waitForOpened();

        const actualOrdersThisYear = await homePage.getOrdersThisYearMetric();
        expect(actualOrdersThisYear).toBe(expectedOrdersThisYear);
    });

    test("New Customers metric", async ({ loginAsAdmin, homePage, page, mock }) => {
        const expectedNewCustomers = 42;

        const mockData = HomeMetricsTestBuilder.forNewCustomers(expectedNewCustomers);

        await mock.homePageMetrics(mockData);

        await loginAsAdmin();
        await page.goto(SALES_PORTAL_URL);
        await homePage.waitForOpened();

        const actualNewCustomers = await homePage.getNewCustomersMetric();
        expect(actualNewCustomers).toBe(expectedNewCustomers);
    });

    test("Canceled Orders metric", async ({ loginAsAdmin, homePage, page, mock }) => {
        const expectedCanceledOrders = 8;

        const mockData = HomeMetricsTestBuilder.forCanceledOrders(expectedCanceledOrders);

        await mock.homePageMetrics(mockData);

        await loginAsAdmin();
        await page.goto(SALES_PORTAL_URL);
        await homePage.waitForOpened();

        const actualCanceledOrders = await homePage.getCanceledOrdersMetric();
        expect(actualCanceledOrders).toBe(expectedCanceledOrders);
    });


    test("Total Revenue metric", async ({ loginAsAdmin, homePage, page, mock }) => {
        const expectedTotalRevenue = 50000;

        const mockData = HomeMetricsTestBuilder.forTotalRevenue(expectedTotalRevenue);

        await mock.homePageMetrics(mockData);
        await loginAsAdmin();
        await page.goto(SALES_PORTAL_URL);
        await homePage.waitForOpened();

        const actualTotalRevenue = await homePage.getTotalRevenueMetric();
        const expectedFormatted = numeral(expectedTotalRevenue).format('0.0a');
        expect(actualTotalRevenue).toBe(`$${expectedFormatted}`);
    });

    test("Avg Order Value metric", async ({ loginAsAdmin, homePage, page, mock }) => {
        const expectedAvgOrderValue = 375;

        const mockData = HomeMetricsTestBuilder.forAvgOrderValue(expectedAvgOrderValue);

        await mock.homePageMetrics(mockData);

        await loginAsAdmin();
        await page.goto(SALES_PORTAL_URL);
        await homePage.waitForOpened();

        const actualAvgOrderValue = await homePage.getAvgOrderValueMetric();
        const expectedFormatted = numeral(expectedAvgOrderValue).format('0.0a');
        expect(actualAvgOrderValue).toBe(`$${expectedFormatted}`);
    });
});