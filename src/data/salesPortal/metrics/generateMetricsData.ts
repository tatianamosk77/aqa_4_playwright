import { IMetricsResponse } from "data/types/metrics.types.js";

export function generateMetricsData(overrides?: Partial<IMetricsResponse>): IMetricsResponse {
    const baseMetrics: IMetricsResponse = {
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

    return deepMerge(baseMetrics, overrides);
}

function deepMerge(target: any, source: any): any {
    if (typeof target !== 'object' || target === null) return source;
    if (typeof source !== 'object' || source === null) return target;

    const result = { ...target };
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }
    return result;
}