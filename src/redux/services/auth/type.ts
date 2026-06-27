export type SignInReq = {
    data: {
        email: string,
        password: string,
    },
    action: () => void
};

export type SignInRes = {
    data: {
        scopes: string[],
        access: {
            expires: string,
            token: string
        },
        refresh: {
            expires: string,
            token: string
        },
        user: {
            _id: string,
            username: string,
            email: string,
            superAdmin: boolean,
            department: {_id: string, name: string},
            role: {_id: string, name: string},
            personal: {firstName: string, lastName: string, phone: string}
        }
    },
    message: string
}

export type LogOutRes = {
    data: null,
    message: string
}

export type ChangePasswordReq = {
    data: {
        _id: string,
        currentPassword: string,
        password: string
    },
    action: () => void
}