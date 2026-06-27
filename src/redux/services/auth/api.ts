import { createApi } from "@reduxjs/toolkit/query/react";
import {Constants} from "@utils/constants";
import {
    setLocalStorage,
    removeLocalStorage,
    validateStatus,
    baseQuery
} from "@utils/auth";
import {
    SignInReq,
    SignInRes,
    LogOutRes,
    ChangePasswordReq
} from "./type";
import {SimpleRes} from "@redux/services/utilities/type";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery({auth: Constants.AUTH_TYPE.basic}),
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInRes, SignInReq>({
            query: (args) => ({
                url: `${Constants.AUTH_ENDPOINT}/login`,
                method: 'POST',
                body: args.data,
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    action: args.action,
                    alert: true
                })
            }),
            transformResponse: async (res: SignInRes) => {
                await setLocalStorage(res);
                return res;
            }
        }),
    }),
});

export const logoutApi = createApi({
    reducerPath: "logoutApi",
    baseQuery: baseQuery({auth: Constants.AUTH_TYPE.bearer}),
    endpoints: (builder) => ({
        changePassword: builder.mutation<SimpleRes, ChangePasswordReq>({
            query: (args) => ({
                url: `${Constants.AUTH_ENDPOINT}/change-password`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    alert: true,
                    action: args.action
                })
            }),
        }),
        logOut: builder.mutation({
            query: (arg: {action: () => void}) => ({
                url: `${Constants.AUTH_ENDPOINT}/logout`,
                method: 'DELETE',
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    alert: true,
                    action: arg.action
                })
            }),
            transformResponse: async (res: LogOutRes) => {
                await setTimeout(async () => {
                    await removeLocalStorage(true);
                }, 250)
                return res;
            }
        }),
    }),
});

export const { useSignInMutation } = authApi;
export const { useLogOutMutation, useChangePasswordMutation } = logoutApi;
