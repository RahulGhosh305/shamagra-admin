import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQuery, validateStatus} from "@utils/auth";
import {Constants} from "@utils/constants";
import {
    AddUserReq,
    DeleteUserReq,
    UpdateUserReq,
    UserRes,
    UsersReq,
    UsersRes
} from "@redux/services/user-management/users/type";
import {SimpleRes} from "@redux/services/utilities/type";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        users: builder.query<UsersRes, UsersReq>({
            query: (args) => `${Constants.USER_MANAGEMENT}/users?page=${args.page}&perPage=${args.perPage}`,
        }),
        user: builder.query<UserRes, string>({
            query: (_id) => `${Constants.USER_MANAGEMENT}/users/${_id}`,
        }),
        addUser: builder.mutation<SimpleRes, AddUserReq>({
            query: (args) => ({
                url: `${Constants.USER_MANAGEMENT}/users`,
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
        updateUser: builder.mutation<SimpleRes, UpdateUserReq>({
            query: (args) => ({
                url: `${Constants.USER_MANAGEMENT}/users/${args.data._id}`,
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
        deleteUser: builder.mutation<SimpleRes, DeleteUserReq>({
            query: (args) => ({
                url: `${Constants.USER_MANAGEMENT}/users/${args._id}`,
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
} = usersApi;