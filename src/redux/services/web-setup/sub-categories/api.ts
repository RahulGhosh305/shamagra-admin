import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQuery, validateStatus} from "@utils/auth";
import {Constants} from "@utils/constants";
import {
    AddSubCategoryReq,
    DeleteSubCategoryReq,
    SubCategoriesReq,
    SubCategoriesRes,
    SubCategoryRes,
    UpdateSubCategoryReq
} from "@redux/services/web-setup/sub-categories/type";
import {SimpleRes} from "@redux/services/utilities/type";

export const subCategoriesApi = createApi({
    reducerPath: "subCategoriesApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        subCategories: builder.query<SubCategoriesRes, SubCategoriesReq>({
            query: (args) => `${Constants.WEB_SETUP}/sub-categories?page=${args.page}&perPage=${args.perPage}`,
        }),
        subCategory: builder.query<SubCategoryRes, string>({
            query: (_id) => `${Constants.WEB_SETUP}/sub-categories/${_id}`,
        }),
        addSubCategory: builder.mutation<SimpleRes, AddSubCategoryReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/sub-categories`,
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
        updateSubCategory: builder.mutation<SimpleRes, UpdateSubCategoryReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/sub-categories/${args.data._id}`,
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
        deleteSubCategory: builder.mutation<SimpleRes, DeleteSubCategoryReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/sub-categories/${args._id}`,
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
    useSubCategoriesQuery,
    useSubCategoryQuery,
    useAddSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation
} = subCategoriesApi;