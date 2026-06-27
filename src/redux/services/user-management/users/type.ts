export type SimpleRes = {
    data: any,
    message: string
}

export type UsersRes = {
    data: {
        data: {
            role?: any,
            vendor?: any,
            department?: any,
            team?: any,
            email: string,
            username: string,
            password: string,
            personal?: any,
            emergency?: any,
            office?: any,
            access?: any,
            superAdmin: boolean,
            status: string,
        }[],
        page: number,
        perPage: number,
        total: number,
    },
    message: string
}

export type UsersReq = {
    page: number,
    perPage: number,
}

export type UserRes = {
    data: {
        _id: string,
        firstName: string,
        lastName: string,
        phone: string,
        username: string,
        email: string,
        gender: string,
        role?: { _id: string, name: string },
        vendor?: { _id: string },
        department?: { _id: string, name: string },
        team?: { name: string },
        personal: {
            fathersName: string,
            fathersPhone: string,
            mothersName: string,
            mothersPhone: string,
            presentAddress: string,
            permanentAddress: string
        },
        superAdmin: boolean,
        status: string,
    },
    message: string
}

export type AddUserReq = {
    data: {
        _id: string,
        firstName: string,
        lastName: string,
        phone: string,
        username: string,
        email: string,
        gender: string,
        role?: { _id: string, name: string },
        department?: { _id: string, name: string },
        team?: { name: string },
        personal: {
            fathersName: string,
            fathersPhone: string,
            mothersName: string,
            mothersPhone: string,
            presentAddress: string,
            permanentAddress: string
        },
        superAdmin: boolean,
        status: string,
    },
    action?: () => void,
}

export type UpdateUserReq = {
    data: {
        _id: string,
        firstName: string,
        lastName: string,
        phone: string,
        username: string,
        email: string,
        fathersName?: string,
        fathersPhone?: string,
        mothersName?: string,
        mothersPhone?: string,
        presentAddress?: string,
        permanentAddress?: string,
        roleId: string,
        status: string,
        gender: string,
        superAdmin: boolean,
    },
    action?: () => void,
}

export type DeleteUserReq = {
    _id: string,
    action?: () => void,
}