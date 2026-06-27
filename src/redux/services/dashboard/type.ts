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