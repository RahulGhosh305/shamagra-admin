import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQuery, validateStatus} from "@utils/auth";
import {Constants} from "@utils/constants";
import {
    AddRoleReq,
    DeleteRoleReq,
    RolesReq,
    RolesRes,
    RoleRes,
    UpdateRoleReq
} from "@redux/services/user-management/roles/type";
import {SimpleRes} from "@redux/services/utilities/type";

export const rolesApi = createApi({
    reducerPath: "rolesApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        roles: builder.query<RolesRes, RolesReq>({
            query: (args) => `${Constants.USER_MANAGEMENT}/roles?page=${args.page}&perPage=${args.perPage}`,
        }),
        role: builder.query<RoleRes, string>({
            query: (_id) => `${Constants.USER_MANAGEMENT}/roles/${_id}`,
        }),
        addRole: builder.mutation<SimpleRes, AddRoleReq>({
            query: (args) => ({
                url: `${Constants.USER_MANAGEMENT}/roles`,
                method: 'POST',
                body: args.data,
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    action: args.action,
                    alert: true
                })
            })
        }),
        updateRole: builder.mutation<SimpleRes, UpdateRoleReq>({
            query: (args) => ({
                url: `${Constants.USER_MANAGEMENT}/roles/${args.data._id}`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    action: args.action,
                    alert: true
                })
            })
        }),
        deleteRole: builder.mutation<SimpleRes, DeleteRoleReq>({
            query: (args) => ({
                url: `${Constants.USER_MANAGEMENT}/roles/${args._id}`,
                method: 'DELETE',
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    action: args.action,
                    alert: true
                })
            })
        }),
    }),
});

export const {
    useRolesQuery,
    useRoleQuery,
    useAddRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation
} = rolesApi;