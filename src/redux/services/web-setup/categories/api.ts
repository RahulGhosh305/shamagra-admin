import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQuery, validateStatus} from "@utils/auth";
import {Constants} from "@utils/constants";
import {
    AddCategoryReq,
    DeleteCategoryReq,
    CategoriesReq,
    CategoryRes,
    CategoriesRes,
    UpdateCategoryReq
} from "@redux/services/web-setup/categories/type";
import {SimpleRes} from "@redux/services/utilities/type";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        categories: builder.query<CategoriesRes, CategoriesReq>({
            query: (args) => `${Constants.WEB_SETUP}/categories?page=${args.page}&perPage=${args.perPage}`,
        }),
        category: builder.query<CategoryRes, string>({
            query: (_id) => `${Constants.WEB_SETUP}/categories/${_id}`,
        }),
        addCategory: builder.mutation<SimpleRes, AddCategoryReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/categories`,
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
        updateCategory: builder.mutation<SimpleRes, UpdateCategoryReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/categories/${args.data._id}`,
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
        deleteCategory: builder.mutation<SimpleRes, DeleteCategoryReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/categories/${args._id}`,
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
    useCategoriesQuery,
    useCategoryQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoriesApi;