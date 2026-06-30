import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery, validateStatus } from "@utils/auth";
import { Constants } from "@utils/constants";
import {
    AddUserReq,
    UserRes,
    UsersReq,
    UsersRes,
} from "@redux/services/clients/users/type";
import { SimpleRes } from "@redux/services/utilities/type";

export const clientsUsersApi = createApi({
    reducerPath: "clientsUsersApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        users: builder.query<UsersRes, UsersReq>({
            query: (args) => `${Constants.CLIENTS}/users?page=${args.page}&perPage=${args.perPage}&cityIds=${args.cityIds}&locationIds=${args.locationIds}&createdAtFrom=${args.createdAtFrom}&createdAtTo=${args.createdAtTo}&agentNumber=${args.agentNumber}`,
        }),
        user: builder.query<UserRes, string>({
            query: (_id) => `${Constants.CLIENTS}/users/${_id}`,
        }),
        addUser: builder.mutation<SimpleRes, AddUserReq>({
            query: (args) => ({
                url: `${Constants.CLIENTS}/users`,
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
        updateUser: builder.mutation<SimpleRes, any>({
            query: (args) => ({
                url: `${Constants.CLIENTS}/users/${args.data._id}`,
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
        deleteUser: builder.mutation<SimpleRes, any>({
            query: (args) => ({
                url: `${Constants.CLIENTS}/users/${args.data._id}`,
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
    useUsersQuery,
    useUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = clientsUsersApi;