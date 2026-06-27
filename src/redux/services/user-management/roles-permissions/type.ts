export type SimpleRes = {
    data: any,
    message: string
}

export type PermissionsRes = {
    data: {
        forEach(arg0: (permission: any) => any[]): unknown
        data: any[],
    },
    message: string
}

export type PermissionsReq = {
    roleId: string,
    action?: () => void,
}

export type savePermissionsReq = {
    data: {
        roleId: string,
        permissions: any[],
    },
    action?: () => void,
}