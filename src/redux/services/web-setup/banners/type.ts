export type BannersRes = {
    data: {
        data: {
            _id: string,
            name: string,
            photo: string,
            description: string,
            page: string,
            position: number,
            bannerPlace: string,
            dataId: string,
            status: string,
        }[],
        page: number,
        perPage: number,
        total: number,
    },
    message: string
}

export type BannerRes = {
    data: {
        _id: string,
        name: string,
        photo: string,
        description: string,
        page: string,
        position: number,
        bannerPlace: string,
        dataId: string,
        status: string,
    },
    message: string
}

export type BannersReq = {
    page: number,
    perPage: number,
}

export type AddBannerReq = {
    data: {
        name: string,
        photo: string,
        description: string,
        page: string,
        position: number,
        bannerPlace: string,
        dataId: string,
        status: string,
    },
    action?: () => void,
}

export type UpdateBannerReq = {
    data: {
        _id: string,
        name: string,
        photo: string,
        description: string,
        page: string,
        position: number,
        bannerPlace: string,
        dataId: string,
        status: string,
    },
    action?: () => void,
}

export type DeleteBannerReq = {
    _id: string,
    action?: () => void,
}