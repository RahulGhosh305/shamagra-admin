export type SubCategoriesRes = {
    data: {
        data: {
            _id: string,
            category: {
                _id: string,
                name: string,
            },
            name: string,
            color: string,
            photo: string,
            description: string,
            status: string,
        }[],
        page: number,
        perPage: number,
        total: number,
    },
    message: string
}

export type SubCategoriesReq = {
    page: number,
    perPage: number,
}

export type SubCategoryRes = {
    data: {
        _id: string,
        category: {
            _id: string,
            name: string,
        },
        name: string,
        color: string,
        photo: string,
        description: string,
        status: string,
    },
    message: string,
}

export type AddSubCategoryReq = {
    data: {
        categoryId: string,
        name: string,
        color: string,
        photo: string,
        description: string,
        status: string,
    },
    action?: () => void,
}

export type UpdateSubCategoryReq = {
    data: {
        _id: string,
        categoryId: string,
        name: string,
        color: string,
        photo: string,
        description: string,
        status: string,
    },
    action?: () => void,
}

export type DeleteSubCategoryReq = {
    _id: string,
    action?: () => void,
}