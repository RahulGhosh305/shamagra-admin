import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQuery, validateStatus} from "@utils/auth";
import {Constants} from "@utils/constants";
import {
    AddProductReq,
    DeleteProductReq,
    ProductsReq,
    ProductsRes,
    ProductRes,
    UpdateProductReq
} from "@redux/services/workspace/products/type";
import {SimpleRes} from "@redux/services/utilities/type";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        products: builder.query<ProductsRes, ProductsReq>({
            query: (args) => `${Constants.WORKSPACE}/products?page=${args.page}&perPage=${args.perPage}`,
        }),
        product: builder.query<ProductRes, string>({
            query: (_id) => `${Constants.WORKSPACE}/products/${_id}`,
        }),
        addProduct: builder.mutation<SimpleRes, AddProductReq>({
            query: (args) => ({
                url: `${Constants.WORKSPACE}/products`,
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
        updateProduct: builder.mutation<SimpleRes, UpdateProductReq>({
            query: (args) => ({
                url: `${Constants.WORKSPACE}/products/${args.data._id}`,
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
        deleteProduct: builder.mutation<SimpleRes, DeleteProductReq>({
            query: (args) => ({
                url: `${Constants.WORKSPACE}/products/${args._id}`,
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
    useProductsQuery,
    useProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApi;