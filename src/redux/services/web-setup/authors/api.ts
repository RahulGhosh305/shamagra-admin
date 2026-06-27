import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery, validateStatus } from "@utils/auth";
import { Constants } from "@utils/constants";
import {
    AddAuthorReq,
    DeleteAuthorReq,
    AuthorsReq,
    AuthorRes,
    AuthorsRes,
    UpdateAuthorReq
} from "@redux/services/web-setup/authors/type";
import { SimpleRes } from "@redux/services/utilities/type";

export const authorsApi = createApi({
    reducerPath: "authorsApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        authors: builder.query<AuthorsRes, AuthorsReq>({
            query: (args) => `${Constants.WEB_SETUP}/authors?page=${args.page}&perPage=${args.perPage}`,
        }),
        author: builder.query<AuthorRes, string>({
            query: (_id) => `${Constants.WEB_SETUP}/authors/${_id}`,
        }),
        addAuthor: builder.mutation<SimpleRes, AddAuthorReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/authors`,
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
        updateAuthor: builder.mutation<SimpleRes, UpdateAuthorReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/authors/${args.data._id}`,
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
        deleteAuthor: builder.mutation<SimpleRes, DeleteAuthorReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/authors/${args._id}`,
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
    useAuthorsQuery,
    useAuthorQuery,
    useAddAuthorMutation,
    useUpdateAuthorMutation,
    useDeleteAuthorMutation
} = authorsApi;