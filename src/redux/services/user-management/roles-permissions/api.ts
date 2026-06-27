import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQuery, validateStatus} from "@utils/auth";
import {Constants} from "@utils/constants";
import {PermissionsRes, savePermissionsReq, SimpleRes} from "@redux/services/user-management/roles-permissions/type";

export const permissionsApi = createApi({
    reducerPath: "permissionsApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        permissions: builder.query<PermissionsRes, string>({
            query: (roleId) => `${Constants.USER_MANAGEMENT}/roles-permissions/${roleId}`,
        }),
        savePermissions: builder.mutation<SimpleRes, savePermissionsReq>({
            query: (args) => ({
                url: `${Constants.USER_MANAGEMENT}/roles-permissions`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    action: args.action,
                    alert: true
                })
            }),
        }),
    }),
});

export const {
    usePermissionsQuery ,
    useSavePermissionsMutation
} = permissionsApi;