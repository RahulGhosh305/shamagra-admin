export type RolesRes = {
    data: {
        data: {
            _id: string,
            name: string,
            description: string,
            status: string,
        }[],
        page: number,
        perPage: number,
        total: number,
    },
    message: string
}

export type RolesReq = {
    page: number,
    perPage: number,
}

export type RoleRes = {
    data: {
        _id: string,
        name: string,
        description: string,
        status: string,
    },
    message: string
}

export type AddRoleReq = {
    data: {
        name: string,
        description: string,
        status: string,
    },
    action?: () => void,
}

export type UpdateRoleReq = {
    data: {
        _id: string,
        name: string,
        description: string,
        status: string,
    },
    action?: () => void,
}

export type DeleteRoleReq = {
    _id: string,
    action?: () => void,
}