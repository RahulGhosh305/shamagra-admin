export type AuthorsRes = {
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

export type AuthorsReq = {
    page: number,
    perPage: number,
}

export type AddAuthorReq = {
    data: {
        name: string,
        position: number,
        isDisabled: boolean,
        description: string,
        status: string,
    },
    action?: () => void,
}

export type AuthorRes = {
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

export type UpdateAuthorReq = {
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

export type DeleteAuthorReq = {
    _id: string,
    action?: () => void,
}