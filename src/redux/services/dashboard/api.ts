import { createApi } from "@reduxjs/toolkit/query/react";
import { Constants } from "@utils/constants";
import { baseQuery } from "@utils/auth";
import { LeadQuarterStatsRes, OrderStatsRes } from "@redux/services/dashboard/type";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        leadQuarterStats: builder.query<LeadQuarterStatsRes, string>({
            query: (organizationId) => `${Constants.DASHBOARD}/lead-quarter-stats?organization=${organizationId}`,
        }),
        salesOrderStats: builder.query<OrderStatsRes, void>({
            query: () => `${Constants.DASHBOARD}/sales-order-stats`,
        }),
    }),
});

export const { useLeadQuarterStatsQuery, useSalesOrderStatsQuery } = dashboardApi;
