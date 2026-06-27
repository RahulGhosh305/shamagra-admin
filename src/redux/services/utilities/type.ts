export type SimpleRes = {
    data: any[],
    message: string
}

export type SimpleReq = {
    _id?: any,
    data?: any,
    page?: number,
    perPage?: number,
    action?: (_id: string) => void,
}