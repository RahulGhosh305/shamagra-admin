export type LeadQuarterStatsRes = {
    data: {
        stats: {
            date: string,
            Pending: number,
            Approved: number,
            Declined: number,
        }[]
    },
    message: string,
    stats: any
}

export type OrderStatsRes = {
    data: {
        totalRevenue: number;
        todayRevenue: number;
        totalOrder: number;
        todayOrder: number;
        totalPendingOrder: number;
        todayPendingOrder: number;
        totalCompletedOrder: number;
        todayCompletedOrder: number;
    },
    message: string,
    status: number
}