import { IMetricsResponse } from "data/types/metrics.types.js";

export class HomeMetricsTestBuilder {
    static createBaseMetrics(): IMetricsResponse {
        return {
            IsSuccess: true,
            Metrics: {
                orders: {
                    totalRevenue: 50000,
                    totalOrders: 150,
                    averageOrderValue: 333,
                    totalCanceledOrders: 10,
                    recentOrders: [],
                    ordersCountPerDay: []
                },
                customers: {
                    totalNewCustomers: 25,
                    topCustomers: [],
                    customerGrowth: Array.from({ length: 15 }, (_, i) => ({
                        date: {
                            year: 2025,
                            month: 10 + Math.floor(i / 30),
                            day: 30 + (i % 30)
                        },
                        count: 0
                    }))
                },
                products: {
                    topProducts: []
                }
            },
            ErrorMessage: null
        };
    }

    static forOrdersThisYear(value: number): IMetricsResponse {
        const metrics = this.createBaseMetrics();
        metrics.Metrics.orders.totalOrders = value;
        return metrics;
    }

    static forNewCustomers(value: number): IMetricsResponse {
        const metrics = this.createBaseMetrics();
        metrics.Metrics.customers.totalNewCustomers = value;
        return metrics;
    }

    static forCanceledOrders(value: number): IMetricsResponse {
        const metrics = this.createBaseMetrics();
        metrics.Metrics.orders.totalCanceledOrders = value;
        return metrics;
    }

    static forTotalRevenue(value: number): IMetricsResponse {
        const metrics = this.createBaseMetrics();
        metrics.Metrics.orders.totalRevenue = value;
        return metrics;
    }

    static forAvgOrderValue(value: number): IMetricsResponse {
        const metrics = this.createBaseMetrics();
        metrics.Metrics.orders.averageOrderValue = value;
        return metrics;
    }
}