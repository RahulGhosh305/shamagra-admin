export type CategoriesRes = {
    data: {
        data: {
            _id: string,
            name: string,
            position: number,
            isDisabled: boolean,
            description: string,
            status: string,
        }[],
        page: number,
        perPage: number,
        total: number,
    },
    message: string
}

export type CategoriesReq = {
    page: number,
    perPage: number,
}

export type AddCategoryReq = {
    data: {
        name: string,
        position: number,
        isDisabled: boolean,
        description: string,
        status: string,
    },
    action?: () => void,
}

export type CategoryRes = {
    data: {
        _id: string,
        name: string,
        position: number,
        isDisabled: boolean,
        description: string,
        status: string,
    },
    message: string
}

export type UpdateCategoryReq = {
    data: {
        _id: string,
        name: string,
        photo: string,
        color: string,
        position: number,
        isDisabled: boolean,
        description: string,
        status: string,
    },
    action?: () => void,
}

export type DeleteCategoryReq = {
    _id: string,
    action?: () => void,
}